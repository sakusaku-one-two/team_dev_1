current_directory = File.dirname(__FILE__)

Dir.glob(File.join(current_directory,'*.rb')).each do |file|
    next if file == __FILE__
    
    require_relative file
end

