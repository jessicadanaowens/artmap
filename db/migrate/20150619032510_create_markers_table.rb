class CreateMarkersTable < ActiveRecord::Migration
  def change
    def change
      create_table :markers do |t|
        t.string :title
        t.integer :lat
        t.integer :lon
        t.string :address
        t.string :name
        t.string :type
        t.timestamps
      end
    end
  end
end
