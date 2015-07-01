require 'rails_helper'

describe "homepage", :js => true do
  it "displays a search field" do
    visit "/"

    fill_in_typeahead 'Enter a city', :with => "De"
  end

  def fill_in_typeahead(*args)
    page.execute_script("$('input').unbind('blur')")
    fill_in args.first, *args[1..-1]
  end
end