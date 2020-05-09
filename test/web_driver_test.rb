require "selenium-webdriver"
  Selenium::WebDriver::Chrome.driver_path="C:/Users/bharat.pun/Downloads/chromedriver_win32/chromedriver.exe"
  driver = Selenium::WebDriver.for :chrome
  #driver.navigate.to "https://google.com"
  driver.get "https://google.com"
  element = driver.find_element(:name, 'q')
  element.send_keys "New York city Weather"
  element.submit
  #driver.quite