require_relative "base_endpoint"

module AutoRooting

    class Tasks < BaseApi
        PATH = "/tasks"

        def GET(query_params)
            begin
                # ストアドプロシージャを呼び出すクエリ
                tasks = DataQuery.new("SELECT * FROM fetch_tasks_json").execute
                
                parsed_tasks = tasks.map do |row|
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

    class Count < BaseApi

        PATH = '/count'

        def GET(query_params)
            sql = "SELECT * FROM tree_count"
            count = DataQuery.new(sql).execute.first['tree_count'].to_i
            {count: count}.to_json
        end

    end

end