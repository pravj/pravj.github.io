# Harry
# =====
# a tiny plugin to have :smiley: in your jekyll blogs
# it uses the famous Emoji-Cheat-Sheet : 'http://www.emoji-cheat-sheet.com/'
#
# https://github.com/pravj/Harry

require 'net/http'

module Jekyll
  module Harry
    def harry(text)
      # matches all :smiley: style text in content
      text.to_str.gsub(/:([a-z0-9]+):/) do |match|

        # image source for smiley on remote server
        imgsrc = 'http://www.emoji-cheat-sheet.com/graphics/emojis/'+$1+'.png'
        # image tage
        img = '<img src="http://www.emoji-cheat-sheet.com/graphics/emojis/'+$1+'.png" title=":'+$1+':" height="20px" width="20px" style="display:inline;margin:0;vertical-align:middle"/>'
        
        # checks if image is available there or not
        uri = URI(imgsrc)
        res = Net::HTTP.get_response(uri)

        # return image tag if image available
        if res.code == '200'
          img
        # return :smiley: text as it is
        else
          match
        end

      end
    end
  end
end

# registers this custom filter globally
Liquid::Template.register_filter(Jekyll::Harry)