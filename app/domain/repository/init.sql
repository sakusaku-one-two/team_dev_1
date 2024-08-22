CREATE DATABASE IF NOT EXISTS team_dev_db;
USE team_dev_db;

CREATE TABLE  IF NOT EXISTS cards(id INT AUTO_INCREMENT PRIMARY KEY,content TEXT);

-- Tasksテーブルの作成
CREATE TABLE IF NOT EXISTS Tasks (
    task_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    task_name VARCHAR(100) NOT NULL,
    priority INT NOT NULL DEFAULT 0,
    status INT NOT NULL DEFAULT 0,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Remindersテーブルの作成
CREATE TABLE IF NOT EXISTS Reminders (
    reminder_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT(20) NOT NULL,
    reminder_date DATETIME,
    forgetting_rate FLOAT NOT NULL DEFAULT 0,
    status VARCHAR(50) NOT NULL DEFAULT '未完了',
    round_count INT NOT NULL DEFAULT 0,
    FOREIGN KEY task_id REFERENCES Tasks(task_id)
);

-- ReminderSettingsテーブルの作成
CREATE TABLE IF NOT EXISTS ReminderSettings (
    setting_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    task_id BIGINT(20) NOT NULL,
    curve_intencity INT NOT NULL DEFAULT 0,
    recalcuration_time TIME NOT NULL DEFAULT '02:00',
    FOREIGN KEY task_id REFERENCES Tasks(task_id)
);

-- Notificationsテーブルの作成
CREATE TABLE IF NOT EXISTS Notifications (
    notification_id BIGINT(20) AUTO_INCREMENT PRIMARY KEY,
    reminder_id BIGINT(20) NOT NULL,
    email VARCHAR(100),
    subject VARCHAR(100),
    body TEXT,
    sent_at DATETIME,
    notification_time TIME NOT NULL DEFAULT '05:00',
    FOREIGN KEY reminder_id REFERENCES Reminders(reminder_id)
);