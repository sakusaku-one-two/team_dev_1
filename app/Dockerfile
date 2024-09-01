FROM ruby:3.0.2

WORKDIR /app

COPY Gemfile  ./
RUN bundle install

COPY . .
CMD [ "ruby","start_main.rb" ]


