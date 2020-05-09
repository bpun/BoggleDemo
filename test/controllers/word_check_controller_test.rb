require 'test_helper'

class WordCheckControllerTest < ActionDispatch::IntegrationTest
  test "should get random dice" do
    get dashboard_url, xhr: true
    assert_response :success
   end
  
  test "get word definition with success response" do
    get check_path + '?word=test', xhr: true
    assert_response :success
  end
end
