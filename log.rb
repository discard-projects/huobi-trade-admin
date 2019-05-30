#!/usr/bin/env ruby
# -*- encoding: UTF-8 -*-
# gem install net-ssh
require 'net/ssh'
host = '39.104.121.122'
username = 'deploy'
# 连接服务器，执行 tail -f 指令
server_cmd1 = 'tail -f /mnt/www/moon/moon-api/shared/log/production.log'
# 连接到远程主机
Net::SSH.start(host, username) do |ssh|
  ssh.exec!(server_cmd1) do |ssh, type, data|
    puts data # 这里的data就是，每次写入staging.log的数据
  end
  puts result
end
