// This is automatically generated by bootstrap-js-compiler.ss
// Please don't hand-edit this file.

var permission_colon_location = function () { plt.Kernel.Struct.call(this, "make-permission:location", []); };
permission_colon_location.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name1 = permission_colon_location;
var make_dash_permission_colon_location = function () { return new permission_colon_location(); };


var permission_colon_location_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name1; };

var permission_colon_send_dash_sms = function () { plt.Kernel.Struct.call(this, "make-permission:send-sms", []); };
permission_colon_send_dash_sms.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name2 = permission_colon_send_dash_sms;
var make_dash_permission_colon_send_dash_sms = function () { return new permission_colon_send_dash_sms(); };


var permission_colon_send_dash_sms_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name2; };

var permission_colon_receive_dash_sms = function () { plt.Kernel.Struct.call(this, "make-permission:receive-sms", []); };
permission_colon_receive_dash_sms.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name3 = permission_colon_receive_dash_sms;
var make_dash_permission_colon_receive_dash_sms = function () { return new permission_colon_receive_dash_sms(); };


var permission_colon_receive_dash_sms_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name3; };

var permission_colon_tilt = function () { plt.Kernel.Struct.call(this, "make-permission:tilt", []); };
permission_colon_tilt.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name4 = permission_colon_tilt;
var make_dash_permission_colon_tilt = function () { return new permission_colon_tilt(); };


var permission_colon_tilt_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name4; };

var permission_colon_shake = function () { plt.Kernel.Struct.call(this, "make-permission:shake", []); };
permission_colon_shake.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name5 = permission_colon_shake;
var make_dash_permission_colon_shake = function () { return new permission_colon_shake(); };


var permission_colon_shake_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name5; };

var permission_colon_internet = function () { plt.Kernel.Struct.call(this, "make-permission:internet", []); };
permission_colon_internet.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name6 = permission_colon_internet;
var make_dash_permission_colon_internet = function () { return new permission_colon_internet(); };


var permission_colon_internet_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name6; };

var permission_colon_telephony = function () { plt.Kernel.Struct.call(this, "make-permission:telephony", []); };
permission_colon_telephony.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name7 = permission_colon_telephony;
var make_dash_permission_colon_telephony = function () { return new permission_colon_telephony(); };


var permission_colon_telephony_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name7; };

var permission_colon_wake_dash_lock = function () { plt.Kernel.Struct.call(this, "make-permission:wake-lock", []); };
permission_colon_wake_dash_lock.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name8 = permission_colon_wake_dash_lock;
var make_dash_permission_colon_wake_dash_lock = function () { return new permission_colon_wake_dash_lock(); };


var permission_colon_wake_dash_lock_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name8; };

var permission_colon_open_dash_image_dash_url = function (url) { plt.Kernel.Struct.call(this, "make-permission:open-image-url", [url]);this.url = url; };
permission_colon_open_dash_image_dash_url.prototype = new plt.Kernel.Struct();

var fresh_dash_struct_dash_name9 = permission_colon_open_dash_image_dash_url;
var make_dash_permission_colon_open_dash_image_dash_url = function (id0) { return new permission_colon_open_dash_image_dash_url(id0); };
var permission_colon_open_dash_image_dash_url_dash_url = function(obj) {
     if (permission_colon_open_dash_image_dash_url_question_ (obj)) {
        return obj.url;
     } else {
        throw new plt.Kernel.MobyRuntimeError(            plt.Kernel.format('permission_colon_open_dash_image_dash_url_dash_url: not a permission:open-image-url: ~s', [obj]));
     }
};

var set_dash_permission_colon_open_dash_image_dash_url_dash_url_bang_ = function(obj,newVal) {
	 if (permission_colon_open_dash_image_dash_url_question_ (obj)) {
		obj.url = newVal;
     } else {
        throw new plt.Kernel.MobyRuntimeError(            plt.Kernel.format('set_dash_permission_colon_open_dash_image_dash_url_dash_url_bang_: not a permission:open-image-url: ~s', [obj]));
     }
};

var permission_colon_open_dash_image_dash_url_question_ = function(obj) { 
              return obj != null && obj != undefined && obj instanceof fresh_dash_struct_dash_name9; };

var permission_question_ = function(datum) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_location_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_send_dash_sms_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_receive_dash_sms_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_tilt_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_shake_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_internet_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_telephony_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_wake_dash_lock_question_(datum))||(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_question_(datum))); };
var PERMISSION_colon_LOCATION; 
var PERMISSION_colon_SEND_dash_SMS; 
var PERMISSION_colon_RECEIVE_dash_SMS; 
var PERMISSION_colon_TILT; 
var PERMISSION_colon_SHAKE; 
var PERMISSION_colon_INTERNET; 
var PERMISSION_colon_TELEPHONY; 
var PERMISSION_colon_WAKE_dash_LOCK; 
var permission_dash__greaterthan_string = function(a_dash_permission) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_location_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:LOCATION")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_send_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:SEND-SMS")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_receive_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:RECEIVE-SMS")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_tilt_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:TILT")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_shake_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:SHAKE")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_internet_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:INTERNET")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_telephony_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:TELEPHONY")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_wake_dash_lock_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("PERMISSION:WAKE-LOCK")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.format((plt.types.String.makeInstance("PERMISSION:OPEN-IMAGE-URL ~a")), [(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_dash_url(a_dash_permission))])) :
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.error((plt.types.Symbol.makeInstance("cond")),(plt.types.String.makeInstance("cond: fell out of cond around \"offset=0 line=0 span=0 id=\\\"\\\"\""))))))))))))); };
var string_dash__greaterthan_permission = function(a_dash_ref) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:LOCATION")), [])) ?
 PERMISSION_colon_LOCATION :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:SEND-SMS")), [])) ?
 PERMISSION_colon_SEND_dash_SMS :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:RECEIVE-SMS")), [])) ?
 PERMISSION_colon_RECEIVE_dash_SMS :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:TILT")), [])) ?
 PERMISSION_colon_TILT :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:SHAKE")), [])) ?
 PERMISSION_colon_SHAKE :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:INTERNET")), [])) ?
 PERMISSION_colon_INTERNET :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:TELEPHONY")), [])) ?
 PERMISSION_colon_TELEPHONY :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_(a_dash_ref,(plt.types.String.makeInstance("PERMISSION:WAKE-LOCK")), [])) ?
 PERMISSION_colon_WAKE_dash_LOCK :
 (((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel._greaterthan_((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.string_dash_length(a_dash_ref)),(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.string_dash_length((plt.types.String.makeInstance("PERMISSION:OPEN-IMAGE-URL")))), []))&&(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.string_equal__question_((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.substring(a_dash_ref,(plt.types.Rational.makeInstance(0, 1)),(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.string_dash_length((plt.types.String.makeInstance("PERMISSION:OPEN-IMAGE-URL")))))),(plt.types.String.makeInstance("PERMISSION:OPEN-IMAGE-URL")), []))) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_open_dash_image_dash_url((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.substring(a_dash_ref,(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.add1((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.string_dash_length((plt.types.String.makeInstance("PERMISSION:OPEN-IMAGE-URL")))))),(plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.string_dash_length(a_dash_ref)))))) :
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.error((plt.types.Symbol.makeInstance("cond")),(plt.types.String.makeInstance("cond: fell out of cond around \"offset=0 line=0 span=0 id=\\\"\\\"\""))))))))))))); };
var permission_dash__greaterthan_android_dash_permissions = function(a_dash_permission) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_location_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([(plt.types.String.makeInstance("android.permission.ACCESS_COARSE_LOCATION")),(plt.types.String.makeInstance("android.permission.ACCESS_FINE_LOCATION"))])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_send_dash_sms_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([(plt.types.String.makeInstance("android.permission.SEND_SMS"))])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_receive_dash_sms_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([(plt.types.String.makeInstance("android.permission.RECEIVE_SMS"))])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_tilt_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_shake_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_internet_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([(plt.types.String.makeInstance("android.permission.INTERNET"))])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_telephony_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([(plt.types.String.makeInstance("android.permission.ACCESS_COARSE_UPDATES"))])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_wake_dash_lock_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([(plt.types.String.makeInstance("android.permission.WAKE_LOCK"))])) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_question_(a_dash_permission)) ?
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"") && plt.Kernel.list([])) :
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.error((plt.types.Symbol.makeInstance("cond")),(plt.types.String.makeInstance("cond: fell out of cond around \"offset=0 line=0 span=0 id=\\\"\\\"\""))))))))))))); };
var permission_dash__greaterthan_on_dash_start_dash_code = function(a_dash_permission) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_location_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("plt.platform.Platform.getInstance().getLocationService().startService();\n      plt.platform.Platform.getInstance().getLocationService().addLocationChangeListener(listener);")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_send_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_receive_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_tilt_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("plt.platform.Platform.getInstance().getTiltService().startService();\n      plt.platform.Platform.getInstance().getTiltService().addOrientationChangeListener(listener);\n      plt.platform.Platform.getInstance().getTiltService().addAccelerationChangeListener(listener);\n      plt.platform.Platform.getInstance().getTiltService().addShakeListener(listener);")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_shake_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_internet_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_telephony_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_wake_dash_lock_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.error((plt.types.Symbol.makeInstance("cond")),(plt.types.String.makeInstance("cond: fell out of cond around \"offset=0 line=0 span=0 id=\\\"\\\"\""))))))))))))); };
var permission_dash__greaterthan_on_dash_pause_dash_code = function(a_dash_permission) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_location_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("plt.platform.Platform.getInstance().getLocationService().shutdownService();")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_send_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_receive_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_tilt_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("plt.platform.Platform.getInstance().getTiltService().shutdownService();")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_shake_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_internet_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_telephony_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_wake_dash_lock_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.error((plt.types.Symbol.makeInstance("cond")),(plt.types.String.makeInstance("cond: fell out of cond around \"offset=0 line=0 span=0 id=\\\"\\\"\""))))))))))))); };
var permission_dash__greaterthan_on_dash_destroy_dash_code = function(a_dash_permission) { return ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_location_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("plt.platform.Platform.getInstance().getLocationService().shutdownService();")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_send_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_receive_dash_sms_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_tilt_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("plt.platform.Platform.getInstance().getTiltService().shutdownService();")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_shake_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_internet_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_telephony_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_wake_dash_lock_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 ((plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && permission_colon_open_dash_image_dash_url_question_(a_dash_permission)) ?
 (plt.types.String.makeInstance("")) :
 (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && plt.Kernel.error((plt.types.Symbol.makeInstance("cond")),(plt.types.String.makeInstance("cond: fell out of cond around \"offset=0 line=0 span=0 id=\\\"\\\"\""))))))))))))); };
(function() { 
  ((function (toplevel_dash_expression_dash_show0) { 










PERMISSION_colon_LOCATION = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_location());
PERMISSION_colon_SEND_dash_SMS = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_send_dash_sms());
PERMISSION_colon_RECEIVE_dash_SMS = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_send_dash_sms());
PERMISSION_colon_TILT = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_tilt());
PERMISSION_colon_SHAKE = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_shake());
PERMISSION_colon_INTERNET = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_internet());
PERMISSION_colon_TELEPHONY = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_telephony());
PERMISSION_colon_WAKE_dash_LOCK = (plt.Kernel.setLastLoc("offset=0 line=0 span=0 id=\"\"")   && make_dash_permission_colon_wake_dash_lock());





 })  )(arguments[0] || plt.Kernel.identity);
})();