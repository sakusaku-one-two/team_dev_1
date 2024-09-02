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
    end


    class GetTasks < BaseApi
        PATH = "/get_tasks"

        def GET(query_params)
            
        end
    end

    class TaskUpdate < BaseApi #　タスクの内容を更新するAPI 
        PATH = '/task_update'

        def UPDATE(request_data_json)
            begin

                id = request_data_json[:id]
                title = request_data_json[:title]
                description = request_data_json[:description]
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
            id = query_params[:id]
            begin
                DataQuery.new('UPDATE Tasks SET status=1 WHERE id=? VALUES(?)',[id]).execute
                return {success:true,id:id}.to_json
            rescue Error => e
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

end