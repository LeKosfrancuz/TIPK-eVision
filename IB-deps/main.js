(function($) {
	'use strict';
	
	$(document).ready(function() {
		// ==== Mobile Menu ====
		// Add button to toggle
		$('.main-menu').prepend('<button class="c-hamburger c-hamburger--htx"><span></span></button>');
		
		// Add icon for parent menu
		if ($(window).width() <= 992) {
			$('.main-menu ul > li.haschild > a').after('<i class="fa fa-angle-down"></i>');
		}
		$(window).on('resize', function () {
			if ($(window).width() <= 992) {
				$('.main-menu ul > li.haschild > a').after('<i class="fa fa-angle-down"></i>');
			}
		});
		
		// Toggle Menu Mobile
		var toggles = document.querySelectorAll('.c-hamburger');
		for (var i = toggles.length - 1; i >= 0; i--) {
			var toggle = toggles[i];
			toggleHandler(toggle);
		};
		function toggleHandler(toggle) {
		    toggle.addEventListener('click', function(e) {
		    	e.preventDefault();
		    	(this.classList.contains('is-active') === true) ? this.classList.remove('is-active') : this.classList.add('is-active');
		    });
		}
		$('.c-hamburger').on('click', function(e) {
			e.preventDefault();
            $(this).parents('.main-menu').toggleClass('open');
            $('body').toggleClass('menu-open');
        });
        $('html').on('click', function(e) {
            if ($(e.target).closest('.main-menu.open').length == 0) {
				$('.main-menu').removeClass('open');
                $('body').removeClass('menu-open');
                $('.c-hamburger').removeClass('is-active');
            }
        });
		
		// Open child menu
		$('.main-menu ul li.haschild  i').on('click', function() {
			$(this).closest('li').find('.sub-menu').slideToggle();
		});
		
		// ==== Form Search ====
		$('.search-icon a').on('click', function (e){
	    	e.preventDefault();
			$( this ).parent().find('.form-search').fadeToggle();
			$( this ).parent().find('.form-inline').fadeToggle();
		});
		
		$('.form-search').on('click', function (e){
	    	e.preventDefault();
			$( this ).fadeToggle();
			$( this ).parent().find('.form-inline').fadeToggle();
		});
		
		$(".raised > span").each(function() {
			$(this)
				.data("origWidth", $(this).width())
				.width(0)
				.animate({
					width: $(this).data("origWidth")
				}, 1200);
		});

		// ====== Init google map ======
		function initialize(latitude, longitude, address, zoom) {
			var latlng = new google.maps.LatLng(latitude,longitude);

			var myOptions = {
				zoom: zoom,
				center: latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				mapTypeControl: false
			};
			var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

			var marker = new google.maps.Marker({
				position: latlng, 
				map: map, 
				title: "location : " + address
			});
		}
		
		// ====== Map ====== 
		var address = $('.contact-address').html();
		var width 	= '100%';
		var height 	= '560px';
		var zoom 	= 16;
		
		// ====== Create map html ======	
		if (address) {
			$('.map').html('<div id="map_canvas" style="width:' + width + '; height:' + height + '"></div>');
			
			var geocoder = new google.maps.Geocoder();

			geocoder.geocode({'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var latitude = results[0].geometry.location.lat();
					var longitude = results[0].geometry.location.lng();
					initialize(latitude, longitude, address, zoom);
				}
			});
		}
		
		// ====== Back Top ======
		$('.back-top').on('click', function (e) {
	        e.preventDefault();
	        $('html,body').animate({
	            scrollTop: 0
	        }, 700);
	    });
		
		// ====== Add Class in page Contact ======
		if ($('.map').length) {
			$('body').addClass('contact-us');
		}
		
		// ====== FAQ ======
        $('.faq-desc').hide();
        $('.list-faq li a').on('click', function(e){
        	e.preventDefault();
            $('.list-faq li a').not(this).next().slideUp().parent().removeClass('open');
            $(this).next().slideToggle().parent().toggleClass('open');
        });
		
		
		function thumbImage(input) {
			var contain = $(input).closest('.upload-bg');
			
			if (input.files && input.files[0]) {
				var reader = new FileReader();
				reader.onload = function (e) {
					contain.find('.thumb-image').attr('src', e.target.result);
				}
				reader.readAsDataURL(input.files[0]);
			} else {
				contain.find('.thumb-image').attr('src', input.value);
			}
			
			contain.find('.thumb-image').show();
			contain.find('.remove-image').show();
			contain.find('.upload-image').hide();
		}
		
		// ===== Form Validation =====
		$('.form-validate').validate({
			rules: {
				money: {
					number: true
				},
				duration: {
					number: true
				},
				amount: {
					number: true
				},
				email: {
					email: true
				},
				paypal: {
					email: true
				},
				price_1: { number: true }, price_2: { number: true }, price_3: { number: true }, price_4: { number: true }, price_5: { number: true }, price_6: { number: true }, price_7: { number: true }, price_8: { number: true }, price_9: { number: true }, price_10: { number: true }, price_11: { number: true }, price_12: { number: true }, price_13: { number: true }, price_14: { number: true }, price_15: { number: true }, price_16: { number: true }, price_17: { number: true }, price_18: { number: true }, price_19: { number: true }, price_20: { number: true },
				limit_1: { number: true }, limit_2: { number: true }, limit_3: { number: true }, limit_4: { number: true }, limit_5: { number: true }, limit_6: { number: true }, limit_7: { number: true }, limit_8: { number: true }, limit_9: { number: true }, limit_10: { number: true }, limit_11: { number: true }, limit_12: { number: true }, limit_13: { number: true }, limit_14: { number: true }, limit_15: { number: true }, limit_16: { number: true }, limit_17: { number: true }, limit_18: { number: true }, limit_19: { number: true }, limit_20: { number: true }, 
			}
		});
		
		// ===== Upload File =====
		
		// Click button [Upload Image]
		$('.upload-image').click(function () {
			$(this).closest('.upload-bg').find('.image-file').click();
		});
		
		// Update image to thumb
		$('.image-file').change(function () {
			thumbImage(this);
		});
		
		// Remove image
		$('.remove-image').click(function () {
			var contain = $(this).closest('.upload-bg');
			
			contain.find('.thumb-image').attr('src', '').hide();
			contain.find('.remove-image').hide();
			contain.find('.upload-image').show();
			
			contain.find('.image-value').val('');
		});
		
		// Campaign Time
		$('.datepicker').datepicker({
			format: 'dd-mm-yyyy',
			autoclose: true,
		});
		$('.time-chosen input').change(function() {
			if ($(this).val() == 'end_date') {
				$('.duration').prop('disabled', true);
				$('.end-date').prop('disabled', false);
			} else {
				$('.duration').prop('disabled', false);
				$('.end-date').prop('disabled', true);
			}
		});
		
		// ===== Reward =====
		var count = 1;
		
		if ($('.rewards-container .reward-item').length) {
			var id = $('.rewards-container .reward-item').last().attr('id').split('item-');
			if (id[1]) {
				count = parseInt(id[1]) + 1;
			}
		}
		
		$('#add-reward').click(function () {
			if (count <= 20) {
				$('.rewards-container').append('<div class="reward-item" id="item-' + count + '">'
													+ '<span class="ion-close-round" onclick="this.closest(\'.reward-item\').remove()"></span>'
													+ '<input type="text" name="title_' + count + '" placeholder="' + $('#title-label').val() + ' *" required>'
													+ '<div>'
														+ '<div class="align-left"><input type="text" name="price_' + count + '" placeholder="' + $('#price-label').val() + ' *" required></div>'
														+ '<div class="align-right"><input type="text" name="limit_' + count + '" placeholder="' + $('#limit-label').val() + '"></div>'
													+ '</div>'
													+ '<textarea rows="4" name="description_' + count + '" placeholder="' + $('#description-label').val() + ' *" required></textarea>'
												+ '</div>');
				count++;
			}
		});
		
		// ===== Campaigns List =====
		$('.campaigns-action #category').change(function() {
			$('#filter-campaigns').submit();
		});
		$('.campaigns-action #recent').click(function(e) {
			e.preventDefault();
			if ($(this).closest('li').attr('class') != 'active') {
				$('#filter-campaigns #filter-sort').val('recent');
				$('#filter-campaigns').submit();
			}
		});
		$('.campaigns-action #most').click(function(e) {
			e.preventDefault();
			if ($(this).closest('li').attr('class') != 'active') {
				$('#filter-campaigns #filter-sort').val('most');
				$('#filter-campaigns').submit();
			}
		});
		
		// ===== Campaigns Detail =====
		$("#owl-campaign").owlCarousel({
	        navigation: true,
	        navigationText: ['<span class="ion-ios-arrow-back"></span>', '<span class="ion-ios-arrow-forward"></span>'],
	        loop:true,
			autoplay:true,
			autoplayTimeout:3000,
   			autoplayHoverPause:true,
	        singleItem: true,
	        afterInit: makePages,
	        afterUpdate: makePages
	    });
	    function makePages() {
	        $.each(this.owl.userItems, function(i) {
	            $('.owl-controls .owl-page').eq(i)
	                .css({
	                    'background': 'url(' + $(this).find('img').attr('src') + ')',
	                    'background-size': 'cover',
	                })
	        });
	    };
		
		// ===== Campaigns Detail =====
		$('.tabs-controls li').on('click', function (e){
	    	e.preventDefault();
			var tab_id = $(this).attr('data-tab');
			$('.tabs-controls li').removeClass('active');
			$('.campaign-content .tabs').removeClass('active');
			$(this).addClass('active');
			$("#"+tab_id).addClass('active');
		});
		
		// ===== Campaigns Pledge =====
		$('.reward-chosen').change(function() {
			$('.amount').val($(this).closest('.reward-item').find('.reward-value').val());
		});
		
		// ===== Page Loader ======
		setTimeout(function() {
			$('.preloading').fadeOut();
		}, 1000);
		
	});	
})(jQuery);