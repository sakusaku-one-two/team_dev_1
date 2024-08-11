require 'mysql2'




def create_mysql_client
    retries = 5
    begin
        client = Mysql2::Client.new(
            host: 'db',
            username: 'team_user',
            password: 'user_password',
            database: 'team_dev_db',
            encoding: 'utf8mb4'
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

# クエリの実行例
Client = create_mysql_client

# Client.query("CREATE TABLE IF NOT EXISTS samples(id INT AUTO_INCREMENT PRIMARY KEY,data TEXT)");


module Store

    CLIENT = Client

end
