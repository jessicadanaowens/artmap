class MarkersController < ApplicationController
  respond_to :json

  def create
    m = Marker.create(position: params[:position], name: params[:name], gallery: params[:gallery])

    if m.errors.any?
      render json: {errors: m.errors}, status: :unprocessable_entity
    else
      @success_message = {success_message: "You're gallery was successfully created"}
      render json: @success_message
    end
  end
end