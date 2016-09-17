$('body').on('click', function(e) {
	Notification.handleBodyClick(e.target);
});

window.NotificationService = (function(w, $){
	var instance, Service = (function() {
		function request(method, url, data) {
	        return new Promise(function (resolve, reject) {
	            var req = new XMLHttpRequest();
	            req.open(method, url);
	            req.onload = function () {
	                if (req.status == 200 || req.status == 304) {
	                    resolve(req.response);
	                } else {
	                    reject(Error(req.statusText));
	                }
	            };
	            req.onerror = function () {
	                reject(Error("Network Error"));
	            };
	            req.send();
	        });
	    }
		return {
			request: function() {
				return request('get','/notification.json').then(JSON.parse);
			},
			store: function(notifications) {
				localStorage.setItem('AK.Notification.list', JSON.stringify(notifications));
			},
			get: function() {
				return JSON.parse(localStorage.getItem('AK.Notification.list'));
			}
		}
	})();
	return {
		getInstance: function() {
			if (!instance) {
				instance = Service;
			}
			return instance;
		}
	}
})(window, $);

window.Notification = (function(w, $, s){
	var icon = $('a.icon.icon-bell-o')[0], iconBadge = $('.noti-badge')[0], popupBadge = $('.noti-badge')[1];
	var count = 0;
	var notifications = [];
	function handleBodyClick(target) {
		if (target == icon || target == iconBadge) {
			openPopOut();
			setTimeout(resetCount, 5000);
		} else closePopOut();
	}
	function openPopOut() {
		$('.popOut').fadeIn();
	}
	function closePopOut() {
		$('.popOut').hide();
	}
	function updateBadge() {
		$('.noti-badge').text(count);
		if (count > 0) {
			$('.noti-badge').show();
		} else {
			$('.noti-badge').hide();
		}
	}
	function updateList() {
		var list = "";
		$.each(notifications, function(index, n) {
			// if (index+5>notifications.length)
			var img = '<img src="' + n.img + '">';
			list = "<li>"+ img + '<span><b>' +n.name+"</b> "+ n.change+"</span></li>" + list;
		});
		$('#list').html(list);
	}
	function updateUI() {
		updateBadge();
		updateList();
	}
	function resetCount() {
		count = 0;
		updateBadge();
	}
	function getFromStorage() {
		notifications = s.get() || [];
		updateUI();
	}
	function update() {
		console.log('updating...');
		s.request().then(function(data) {
			notifications = $.merge(notifications || [], data.notifications);
			count += data.notifications.length;
			s.store(notifications);
			updateUI();
		})
	}
	function init() {
		console.log("notifications init");
		getFromStorage();
		update();
		setInterval(update, 15000);
	}
	return {
		handleBodyClick: handleBodyClick,
		init: init
	}
})(window, $, NotificationService.getInstance());

Notification.init();