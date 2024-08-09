require 'webrick'

# 正しい相対パスを指定
require_relative 'domain/views/init_view'


SERVER = WEBrick::HTTPServer.new(
    Port: 3000,
    BindAddress: '0.0.0.0'
    #BindAddress: '127.0.0.1' # ローカルホストにバインド

)


class Server < WEBrick::HTTPServlet::AbstractServlet
    def do_GET(req,res)
        res['Content-Type'] = "text/html"
        return_file_path = File.join(SERVER.config[:DocumentRoot],'index.html')
        res.body=File.read(return_file_path)
    end
end


#　module　views 内でBaseViewを継承したクラスを自動でルーティング
def init()
    ObjectSpace.each_object(Class) do |klass|
        if klass < RootingViews::BaseView && klass.name.start_with?(RootingViews.to_s)
            SERVER.mount(klass.my_path,klass)
            puts klass.my_path
        end
    end

    trap 'INT' do #ctl + c で強制終了するための設定
        SERVER.shutdown
    end
    
    SERVER.start

end

init()