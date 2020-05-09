require 'test_helper'

class PlayerHistoryTest < ActiveSupport::TestCase
  test "should not save history without word" do
    history = PlayerHistory.new
    assert_not history.save, "Saved the history without a word"
  end

  test "History should saved" do
    assert PlayerHistory.new(userIp: "::2", word:"test", isValid: true).save
  end
end
