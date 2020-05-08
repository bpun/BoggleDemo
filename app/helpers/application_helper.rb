module ApplicationHelper
    def get_address_address
        return request.remote_ip
    end

    def call_words_api(url)
        url = URI(url)

        http = Net::HTTP.new(url.host, url.port)
        http.use_ssl = true
        http.verify_mode = OpenSSL::SSL::VERIFY_NONE
        request = Net::HTTP::Get.new(url)
        
        response = http.request(request)
        case response
        when Net::HTTPSuccess then
          data =JSON.parse response.body
          @response = {status:100, msg:"Ok",data:data}
        else
            @response = {status:101, msg:"Invalid word",data:nil}
        end
        return @response
    end 
end
