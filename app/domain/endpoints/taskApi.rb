require_relative "base_endpoint"

module AutoRooting

    class Tasks < BaseApi#　タスクを取得するAPI
        PATH = "/tasks"

        def GET(query_params)
            begin
                # 
                tasks = DataQuery.new("SELECT * FROM fetch_tasks_json").execute
                
                parsed_tasks = tasks.map do |row| #DBから取得したデータをUTF-8に変換しJSONとして格納
                    task_details = row['task_details']
                    task_details.force_encoding('UTF-8') if task_details.is_a?(String)
                    JSON.parse(task_details)
                end
                return parsed_tasks.to_json
            rescue StandardError => e
                return {error: e.message}.to_json
            end
        end

        def DELETE(query_dict)
            id = query_dict["id"]

            begin 
                DataQuery.new("DELETE FROM Tasks WHERE id=?",[id]).execute
                DataQuery.new("DELETE FROM Reminders WHERE task_id = ?",[id]).execute
                return {success:true}.to_json
            rescue StandardError => e 
                return {success:false}.to_json
            end
        end

        def UPDATE(query_dict)
            id = query_dict["id"]
            title = query_dict["title"]
            reminders = query_dict["reminders"]
            priority = query_dict["priority"]

            sql = "UPDATE Tasks SET title = ?, priority = ? WHERE id = ?"
            params_array = [title,priority,id]

            begin   
                DataQuery.new(sql,params_array).execute
                return {success:true,message:"成功しました"}.to_json
            rescue StandardError => e 
                return {
                    success:false,message:e.message
                }.to_json
            end
        end
        
        
        def POST(query_dict)
            title = query_dict["title"]
            reminder_times = query_dict["reminders"]
            priority = query_dict["priority"]
            create_task_sql = "INSERT INTO Tasks (title, priority, status) VALUES(?,?,?)"
            task_paramas = [title,priority,0]

            puts title
            begin
                DataQuery.new(create_task_sql,task_paramas).execute #タスクを作成
                result = DataQuery.new("SELECT MAX(id) FROM Tasks").execute.first
                max_id = result.is_a?(Hash) ? result["id"].to_i : result[0].to_i

                
                create_reminder_sql = "INSERT INTO Reminders(task_id,reminder_date,status_description,date_number,status) VALUES(?,?,?,?,?)"
                reminder_dates = reminder_times_to_dates(reminder_times,max_id)#　数値の羅列から日付の配列へ変換　＝＞　リマインダーを作成するための値
                
                DataQuery.new(create_reminder_sql,reminder_dates).execute# リマインダーを作成
                
                return {
                    success:true,
                    id:max_id,
                }.to_json
            rescue StandardError => e
                return {success:false,error:e.message}.to_json
            end
        end
        
        private

        def reminder_times_to_dates(reminder_times_as_num_array,task_id)#-> [date,date,...]
            reminder_times_as_num_array.map.with_index do |time_number,index|
                [
                    task_id,
                    Time.now + (time_number * 24 * 60 * 60),
                    "未完了",
                    time_number,
                    0
                ]
            end
        end

    end


    class GetTasks < BaseApi
        PATH = "/get_tasks"

        def GET(query_params)
            puts ""
        end
    end

    class TaskUpdate < BaseApi #　タスクの内容を更新するAPI 
        PATH = '/task_update'

        def UPDATE(request_data_json)
            begin

                id = request_data_json[:id]
                title = request_data_json[:title]
                description = "none"
                status = request_data_json[:status]

                sql = "UPDATE Tasks SET title = ?,description = ?,status = ? WHERE id = ?"
                params_array = [title,description,status,id]

                DataQuery.new(sql,params_array).execute
                return {success:true,id:id}.to_json
            rescue StandardError => e 
                return {
                    success:false,
                    message: e.message
                }.to_json
            end
        end
    end

    class TaskChecked < BaseApi
        PATH = '/task_checked'
        def UPDATE(query_params)
            id = query_params['id']
            begin
                DataQuery.new('UPDATE Tasks SET status=1 WHERE id=?',[id]).execute
                return {success:true,id:id}.to_json
            rescue StandardError => e
                return {success: false,error:e.message,id:id}.to_json
            end
        end
    end


    class Count < BaseApi #タスクの完了と未完了の割合を取得するAPI
        PATH = '/count'

        def GET(query_params)
            sql = "SELECT * FROM tree_count" #VEIWとしてinit.sqlに定義済み
            count = DataQuery.new(sql).execute.first['tree_count'].to_i
            {count: count}.to_json
        end

    end

    class TodaySpeach < BaseApi
        PATH = "/today_speach"
        def GET(params_dict)

            today = Date.today.to_s
            sql = <<-SQL
                SELECT Tasks.*
                FROM Tasks
                JOIN Reminders ON Tasks.id = Reminders.task_id
                WHERE Reminders.reminder_date = ? AND Tasks.status = 0 
            SQL
            begin 
                reuslt = DataQuery.new(sql,[today]).execute.to_a

                speach_txt = to_text(reuslt)
                return {
                    text: speach_txt
                }.to_json
            rescue StandardError => e 
                return {text: e.message}.to_json
            end
        end

        private

        def to_text(tasks)
            return_txt = "本日取り組むべきタスクは、"
            return  return_txt << "ありません" if tasks.count == 0 
            tasks.map do |row|
                return_txt << row["title"]
                return_txt << " "
            end

            return_txt << "になります。"
        end
    end
end