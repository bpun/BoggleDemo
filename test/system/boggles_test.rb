require "application_system_test_case"


class BogglesTest < ApplicationSystemTestCase
   test "visiting the index" do
     visit boggle_url
     driver.get "http://localhost:3000/"
    
     assert_selector "h2", text: "Users"
   end
  
end
