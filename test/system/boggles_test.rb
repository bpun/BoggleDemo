require "application_system_test_case"

class BogglesTest < ApplicationSystemTestCase

   test "visiting the index page" do
     visit index_url
     assert_selector "h2", text: "Hi, Wel Come!!!"
   end
end
