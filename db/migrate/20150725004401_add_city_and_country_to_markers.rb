class AddCityAndCountryToMarkers < ActiveRecord::Migration
  def change
    add_column :markers, :city, :string
    add_column :markers, :country, :string
  end
end
