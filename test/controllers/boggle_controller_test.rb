require 'test_helper'

class BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get boggle_index_url
    assert_response :success
  end
  
  test "should get success response of Player history " do
    get history_url
    assert_response :success
  end
end
