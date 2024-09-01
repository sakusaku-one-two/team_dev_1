CREATE DATABASE IF NOT EXISTS team_dev_db;
USE team_dev_db;

CREATE TABLE  IF NOT EXISTS cards(id INT AUTO_INCREMENT PRIMARY KEY,content TEXT);

INSERT INTO cards(content) values('first card');
INSERT INTO cards(content) values('second card');
-- Tasksテーブルの作成
CREATE TABLE IF NOT EXISTS Tasks (
    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    priority INT NOT NULL DEFAULT 0,
    status INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);




-- Remindersテーブルの作成
CREATE TABLE IF NOT EXISTS Reminders (
    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT(20) NOT NULL,
    reminder_date DATETIME,
    status_description VARCHAR(50) NOT NULL DEFAULT '未完了',
    status INT NOT NULL DEFAULT 0,
    FOREIGN KEY (task_id) REFERENCES Tasks(id)
);


INSERT INTO cards(content) VALUES('third card');
INSERT INTO cards(content) VALUES('fourth card');

-- Tasksテーブルに追加のサンプルデータを挿入
INSERT INTO Tasks(title, priority, status) VALUES('Second Task', 2, 1);
INSERT INTO Tasks(title, priority, status) VALUES('Third Task', 1, 0);
INSERT INTO Tasks(title, priority, status) VALUES('Fourth Task', 3, 1);

-- Remindersテーブルに追加のサンプルデータを挿入
-- ここでは、Tasksテーブルのidを参照しています。idが2と3のタスクに対するリマインダーを追加します。
INSERT INTO Reminders(task_id, reminder_date, status_description, status) VALUES(2, "2024-09-15", '未完了', 0);
INSERT INTO Reminders(task_id, reminder_date, status_description, status) VALUES(3, "2024-10-10", '完了', 1);
INSERT INTO Reminders(task_id, reminder_date, status_description, status) VALUES(2, "2024-12-20", '未完了', 0);

CREATE VIEW fetch_tasks_json AS
     SELECT JSON_OBJECT(
        'id',Tasks.id,
        'title',Tasks.title,
        'priority',Tasks.priority,
        'status',Tasks.status,
        'created_at',Tasks.created_at,
        'updated_at',Tasks.updated_at,
        'reminders',(
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id',Reminders.id,
                    'task_id',Reminders.task_id,
                    'reminder_date',Reminders.reminder_date,
                    'status_description',Reminders.status_description,
                    'status',Reminders.status
                )
            )
            FROM Reminders
            WHERE Reminders.task_id = Tasks.id
        )
    ) AS task_details
    FROM Tasks;


CREATE VIEW tree_count AS 
    SELECT
        (SUM(CASE WHEN status !=0 THEN 1 ELSE 0 END) / COUNT(*)) * 10.0 AS tree_count 
    FROM Tasks;



DELIMITER //

CREATE PROCEDURE GetTasks()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- エラーが発生した場合にロールバック
        ROLLBACK;
    END;

    -- トランザクションの開始
    START TRANSACTION;

    -- メインのクエリ
    SELECT JSON_OBJECT(
        'id',Tasks.id,
        'title',Tasks.title,
        'priority',Tasks.priority,
        'status',Tasks.status,
        'created_at',Tasks.created_at,
        'updated_at',Tasks.updated_at,
        'reminders',(
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id',Reminders.id,
                    'task_id',Reminders.task_id,
                    'reminder_date',Reminders.reminder_date,
                    'status_description',Reminders.status_description,
                    'status',Reminders.status
                )
            )
            FROM Reminders
            WHERE Reminders.task_id = Tasks.id
        )
    ) AS task_details
    FROM Tasks;

    -- トランザクションのコミット
    COMMIT;
END //

DELIMITER ;