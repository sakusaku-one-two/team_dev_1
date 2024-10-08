require 'webrick'
require 'erb'
require 'json'

require_relative '../repository/BaseRepository'

include Store

module AutoRooting

    DataQuery = Store::DbQuery
    
    class BaseEndPoint < WEBrick::HTTPServlet::AbstractServlet
        SQL = $client
        PATH = nil
        
        def do_OPTIONS(req,res)
            res['Access-Control-Allow-Origin'] ='*' #許可するオリジンを指定してください。
            res['Access-Control-Allow-Methods'] = "GET,POST,OPTIONS"
            res['Access-Control-Allow-Headers'] = "Content-Type"
            res.status = 200
        end

        def self.my_path
            if self::PATH.nil? then 
                "/#{name.split('::').last.downcase}"
            else
                self::PATH
            end
        end

        def querys(req)
            query = req.query
            return {} if query.empty?
            new_query = query.map { |key,value|
                puts key,value
                [key.gsub('\\','') , value.gsub('\\','')]
        }.to_h

        end

    end


    class RootEndPoint  < BaseEndPoint

        PATH = '/RootView'

        def set_value_for_html(target_html_path,locals={})
            template_html_file = File.read(target_html_path)
            ERB.new(template_html_file).result_with_hash(locals)
        end

        def do_GET(req,res)
            res['Content-Type'] = "text/html"
            return_file_path = File.join(File.dirname(__FILE__), '../../statics/index.html')
            res.body=set_value_for_html(return_file_path,{name:'saku'})
        
            req.query.each do |key,value| 
                puts "key-> #{key} value->#{value}"
            end
        end

    end







    class BaseApi < BaseEndPoint
        PATH = '/'

        def POST(request_data_json)
            puts request_data_json
            {message: 'ポストされました。'}
        end

        def GET(query_params)
            puts 'get api data'
            {message: 'invoked get method!'}.to_json
        end

        def DELETE(query_params)
            puts 'delete api data'
            {message: 'invoked delete method!'}.to_json
        end
    
        def UPDATE(request_data_json)
            puts 'update api data'
            {message: 'invoked update method!'}.to_json
        end



        def do_GET(req,res)
            puts 'called do_get'
            res['Content-Type'] = 'application/json'
            res.body = GET(querys(req))
        end

        def do_POST(req,res)
            begin 
                puts req.body
                data = JSON.parse(req.body)
                res['Content-Type'] = 'application/json'
                response_json = POST(data)
                if response_json.nil? then
                    res.body= {}.to_json
                else
                    res.body = response_json
                end
            rescue JSON::ParserError => e 
                res.status = 400
                res['Content-Type'] = 'application/json'
                res.body = {error: 'Invalid JSON format'}.to_json
            end
        end

        def do_PUT(req,res)
            data = JSON.parse(req.body)
            res['Content-Type'] = 'application/json'
            response_json = UPDATE(data)
            if response_json.nil?
                res.body = {}.to_json
            else
                res.body = response_json
            end
        end

        def do_DELETE(req,res)
            res['Content-Type'] = 'application/json'
            res.body = DELETE(querys(req))
        end
    end
end
