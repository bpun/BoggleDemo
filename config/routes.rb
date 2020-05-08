Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/'  => 'boggle#index'
  get '/boggle/index'  => 'boggle#index'
  get '/history'  => 'boggle#history'

  get '/check' => 'word_check#check'
  get '/dashboard' => 'word_check#dashboard'
end
