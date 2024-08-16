require_relative 'base_endpoint'


module AutoRooting



    class SampleApi < BaseApi
        PATH = '/sample' #　api/sampleで呼び出せます。



        def DELETE(query)
            {
                message: 'DELETE',
                query: query.to_s
            }.to_json
        end

        

        def GET(query)
            
            sql = 'SELECT content FROM cards'
            params = []

            # queryが空でない場合、WHERE句を追加
            unless query.empty?
                sql += " WHERE content LIKE ?"
                params << "%#{query["serch"]}%"
            end

            # クエリを実行
            statement = CLIENT.prepare(sql)
            datas = statement.execute(*params)
            {
                message: datas.to_a,
                query: "%#{query}%"
            }.to_json
        end



        def UPDATE(request_data_json)
            {message: 'UPDATE'}.to_json
        end



        def POST(request_data_json)
          
            CLIENT.prepare(
            'INSERT INTO cards(content) VALUES(?)'
            ).execute(request_data_json['text'])
            {message: 'POST'}.to_json
        end 
    end

end 



