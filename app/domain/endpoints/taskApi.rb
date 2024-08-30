require_relative "base_endpoint"



module AutoRooting

    class Tasks < BaseApi
        PATH = "/tasks"

        def GET(query_params)
            begin
                results= self.class::SQL.query("CALL GetTasks();")
                results.map(&:to_h).to_json
            rescue StandardError => e
                return {error: e.message}.to_json
            end
        end
    end

end