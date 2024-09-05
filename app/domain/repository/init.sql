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

-- サンプルデータの挿入
INSERT INTO Tasks (title, priority, status) VALUES
('Task 1', 1, 0),
('Task 2', 2, 1),
('Task 3', 3, 0),
('Task 4', 4, 1),
('Task 5', 5, 0),
('Task 6', 1, 1),
('Task 7', 2, 0),
('Task 8', 3, 1),
('Task 9', 4, 0),
('Task 10', 5, 1),
('Task 11', 1, 0),
('Task 12', 2, 1),
('Task 13', 3, 0),
('Task 14', 4, 1),
('Task 15', 5, 0),
('Task 16', 1, 1),
('Task 17', 2, 0),
('Task 18', 3, 1),
('Task 19', 4, 0),
('Task 20', 5, 1);


-- Remindersテーブルの作成
CREATE TABLE IF NOT EXISTS Reminders (
    id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT(20) NOT NULL,
    reminder_date DATETIME,
    status_description VARCHAR(50) NOT NULL DEFAULT '未完了',
    date_number INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status INT NOT NULL DEFAULT 0,
    FOREIGN KEY (task_id) REFERENCES Tasks(id)
);


INSERT INTO cards(content) VALUES('third card');
INSERT INTO cards(content) VALUES('fourth card');

-- Tasksテーブルに追加のサンプルデータを挿入
INSERT INTO Reminders (task_id, reminder_date, status_description, date_number, status) VALUES
(1, '2023-9-04 10:00:00', '未完了', 1, 0),
(1, '2023-9-04 12:00:00', '完了', 2, 1),
(2, '2023-10-03 14:00:00', '未完了', 3, 0),
(2, '2023-10-04 16:00:00', '完了', 4, 1),
(3, '2023-10-05 18:00:00', '未完了', 5, 0),
(3, '2023-10-06 09:00:00', '完了', 6, 1),
(4, '2023-10-07 11:00:00', '未完了', 7, 0),
(4, '2023-10-08 13:00:00', '完了', 8, 1),
(5, '2023-10-09 15:00:00', '未完了', 9, 0),
(5, '2023-10-10 17:00:00', '完了', 10, 1),
(6, '2023-10-11 19:00:00', '未完了', 11, 0),
(6, '2023-10-12 21:00:00', '完了', 12, 1),
(7, '2023-10-13 08:00:00', '未完了', 13, 0),
(7, '2023-10-14 10:00:00', '完了', 14, 1),
(8, '2023-10-15 12:00:00', '未完了', 15, 0),
(8, '2023-10-16 14:00:00', '完了', 16, 1),
(9, '2023-10-17 16:00:00', '未完了', 17, 0),
(9, '2023-10-18 18:00:00', '完了', 18, 1),
(10, '2023-10-19 20:00:00', '未完了', 19, 0),
(10, '2023-10-20 22:00:00', '完了', 20, 1);


-- Remindersテーブルに追加のサンプルデータを挿入
-- ここでは、Tasksテーブルのidを参照しています。idが2と3のタスクに対するリマインダーを追加します。

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
                    'status',Reminders.status,
                    'date_number',Reminders.date_number,
                    'created_at',Reminders.created_at

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
                    'status',Reminders.status,
                    'date_number',Reminders.date_number,
                    'created_at',Reminders.created_at
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