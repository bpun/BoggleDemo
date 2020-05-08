class CreatePlayerHistories < ActiveRecord::Migration[6.0]
  def change
    create_table :player_histories do |t|
      t.string :userIp
      t.string :word
      t.boolean :isValid

      t.timestamps
    end
  end
end
