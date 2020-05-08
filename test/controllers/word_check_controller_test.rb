require 'test_helper'

class WordCheckControllerTest < ActionDispatch::IntegrationTest
  test "should get random dice" do
    get dashboard_url

    #assert_equal "application/x-www-form-urlencoded", @request.media_type
    #assert_match "", @response.body
    assert_response :success
    end
end
