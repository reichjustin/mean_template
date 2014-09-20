/**
 * Created by sql on 9/20/14.
 */
angular.module('app').value('toast',toastr);

angular.module('app').factory('NotifierFactory', function(toast) {
    return {
        notify : function(success) {
            if (success) {
                toast.success('Logged In');
            } else {
                toast.error("Invalid Account");
            }
        }
    }
});