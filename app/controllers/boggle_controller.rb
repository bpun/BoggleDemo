class BoggleController < ApplicationController
    def index
       
    end

    def history
        @history = PlayerHistory.where(:userIp => get_address_address()).order('created_at DESC')
    end

end
