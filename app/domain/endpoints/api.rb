require_relative 'base_endpoint'


module AutoRooting



    class SampleApi < BaseApi
        PATH = '/sample' #　api/sampleで呼び出せます.



        def DELETE(request_data_json)
            {
                message: 'DELETE',
                query: request_data_json.to_s
            }.to_json
        end

        

        def GET(query_params)
            puts query_params.to_s
            sql = 'SELECT content FROM cards'
            params = []
            begin
                # queryが空でない場合、WHERE句を追加
                unless query_params.empty?
                    sql += " WHERE content LIKE ?"
                    params << "%#{query_params["search"]}%"
                    statement = self.class::SQL.prepare(sql)
                    datas = statement.query(*params)
                   
                else
                    datas = self.class::SQL.query(sql)
                end
                # クエリを実行
            rescue => e 
                return {
                    message: e.message
            }.to_json
            end    
            return  {
                    message: datas.to_a,
                    query: "%#{query_params["search"]}%"
                }.to_json
        end



        def UPDATE(request_data_json)
            {message: 'UPDATE'}.to_json
        end



        def POST(request_data_json)
          
            self.class::SQL.prepare(
            'INSERT INTO cards(content) VALUES(?)'
            ).execute(request_data_json['text'])
            {message: 'POST'}.to_json
        end 
    end

end 