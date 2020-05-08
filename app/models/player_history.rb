class PlayerHistory < ApplicationRecord
    validates :word, presence: true
    validates_length_of :word, :minimum => 2, :too_short => "please enter at least %d character"
end
