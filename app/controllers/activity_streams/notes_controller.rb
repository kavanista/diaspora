class ActivityStreams::NotesController < BaseController

  respond_to :json 
  def create
    @note = ActivityStreams::Note.from_activity(params[:activity])
    @note.author = current_user.person
    @note.public = true

    if @note.save
      Rails.logger.info("event=create type=activitystreams_photo")

      current_user.add_to_streams(@note, current_user.aspects)
      current_user.dispatch_post(@note, :url => post_url(@note))

      render :nothing => true, :status => 201
    else
      render :nothing => true, :status => 422
    end
  end

end
