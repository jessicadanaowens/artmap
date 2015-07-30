class AddLatAndLngToMarkers < ActiveRecord::Migration
  def change
    add_column :markers, :lat, :integer
    add_column :markers, :lon, :integer
    remove_column :markers, :position
  end
end
