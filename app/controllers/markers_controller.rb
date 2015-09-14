class MarkersController < ApplicationController
  respond_to :json

  def index
    @markers = Marker.all
    render json: @markers
  end

  def create
    m = Marker.create(lat: params[:lat], lon: params[:lon], name: params[:name], gallery: params[:gallery])

    if m.errors.any?
      render json: {errors: m.errors}, status: :unprocessable_entity
    else
      @success_message = {success_message: "Your gallery was successfully created"}
      render json: @success_message
    end
  end
end