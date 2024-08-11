require 'mail'

require_relative '../repository/BaseRepository'

include Store


options = {
    address:              'smtp.gmail.com',
    port:                 587,
    domain:               'your.domain.com',
    user_name:            'your_email@gmail.com',
    password:             'your_password',
    authentication:       'plain',
    enable_starttls_auto: true
}

Mail.defaults do 
    delivery_method:smtp,options
end 

def Send(subject_text,body_text)
    mail = Mail.new do 
        from     'your_email@gmail.com'
        to       'recipient@example.com'
        subject  subject_text
        body     body_text
    end
    mail.deliver!
end 