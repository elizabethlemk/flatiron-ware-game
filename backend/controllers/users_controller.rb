class UsersController < ApplicationController

  def show
    @user = User.fine(params[:id])
  end

  def create
    @user = User.create(user_params)
    render json: @user
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    render json: @user
  end

  def delete
    @user = User.find(params[:id])
    @user.destroy
  end

  private

  def user_params
    params.permit(:name)
  end
end
