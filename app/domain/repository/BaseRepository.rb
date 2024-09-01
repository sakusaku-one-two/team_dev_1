require 'mysql2'




def create_mysql_client
    retries = 5
    begin
        client = Mysql2::Client.new(
            host: 'db',
            username: 'team_user',
            password: 'user_password',
            database: 'team_dev_db',
            encoding: 'utf8mb4',
            reconnect: true, #再接続を有効にする
            flags: Mysql2::Client::MULTI_STATEMENTS #複数のステートメントを有効にする。
        )
    rescue Mysql2::Error::ConnectionError => e 
        if (retries -= 1) > 0
            puts '接続失敗しました'
            sleep 5
            retry
        else
            raise e 
        end
    end
    client
end

$client = create_mysql_client #　＄をつけることでグローバル変数として機能する。　

# Client.query("CREATE TABLE IF NOT EXISTS samples(id INT AUTO_INCREMENT PRIMARY KEY,data TEXT)");


module Store

    CLIENT = $client

    class DbQuery
        
        def initialize(query, params_array = nil)
            @query = query
            @params = params_array
        end

        def execute()
            client = create_mysql_client #同じデータベース接続を複数のFiber(軽量スレッド)で同時に使用しようとするとエラーがでるので都度コネクションを貼り直す。
            retries = 3
            results = nil
            begin
                client.query('START TRANSACTION')
                if @params.nil?
                    results = client.query(@query)
                else
                    statement = client.prepare(@query)
                    results = statement.execute(*@params)
                end
                client.query('COMMIT')
            rescue Mysql2::Error => e
                client.query('ROLLBACK') 
                if (retries -= 1) > 0
                    puts '再接続を試みます'
                    client = create_mysql_client
                    retry
                else
                    raise e
                end
            end
            results
        end

    end




end
