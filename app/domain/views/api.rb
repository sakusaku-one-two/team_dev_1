require_relative 'base_views'
require_relative '../repository/BaseRepository'

include Store

module RootingViews

    class SampleApi < RootingViews::BaseApiView
        PATH = '/sample'
        def DELETE(query)
            {message: 'DELETE'}.to_json
        end

        def GET(query)
            puts query
            datas = CLIENT.query('SELECT data FROM samples')
            {message: datas.to_a}.to_json
        end

        def UPDATE(request_data_json)
            {message: 'UPDATE'}.to_json
        end

        def POST(request_data_json)
          
            CLIENT.prepare(
            'INSERT INTO samples(data) VALUES(?)'
            ).execute(request_data_json['text'])
            {message: 'POST'}.to_json
        end 
    end

end 



