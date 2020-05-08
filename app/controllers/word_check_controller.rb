require 'uri'
require 'net/http'

class WordCheckController < ApplicationController  
    def dashboard
        alph = [*'A'..'Z']
        @diceArr = Array.new(16){alph.sample}

        render json: @diceArr, status: :ok
    end

    def check
        word = get_param()
        url ="https://www.wordsapi.com/mashape/words/#{word}/definitions?when=2020-05-06T17:01:27.769Z&encrypted=8cfdb18ae722969bea9707bee858beb8aeb22a0937f99eb8"
        @result = call_words_api(url)

        save_history(@result, word)

        render json: @result, status: :ok
    end

    private 

    def get_param
        params[:word]
    end

    def save_history(res, word)
        ip = get_address_address()
        status = res['status']
        isvalid = false
        puts res
        if res[:status] == 100 then isvalid =true end
       
        @log = PlayerHistory.new(userIp: ip, word: word, isValid: isvalid)
        @log.save
     end
     
=begin #To Clear all the data
     def clear_history
        @hstList = PlayerHistory.all
        @hstList.each do|h|
            @hist = PlayerHistory.find(h[:id])
            @hist.destroy
        end
     end
=end
end
