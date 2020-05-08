require 'test_helper'

class BoggleControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get boggle_index_url
    assert_response :success
  end
  
  test "should get Player history" do
    get: boggle_history_url
    assert_response :redirect
  end
  
end
