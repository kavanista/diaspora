module NotifierHelper
  def post_message(post, opts={})
    if post.respond_to? :formatted_message
      message = truncate(post.formatted_message(:plain_text => true), :length => 200)
      message = process_newlines(message) if opts[:process_newlines]
      message
    else
      I18n.translate 'notifier.a_post_you_shared'
    end
  end
end
