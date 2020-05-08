require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  #Selenium::WebDriver::Chrome.driver_path = "C:\Users\bharat.pun\Downloads\chromedriver_win32"
  driven_by :selenium,
   using: :chrome, screen_size: [1400, 1400]
end
