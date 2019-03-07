class User < ApplicationRecord
  has_many :scores, dependent: :destroy 
end
