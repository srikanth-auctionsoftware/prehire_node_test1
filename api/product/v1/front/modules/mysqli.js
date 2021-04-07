const mysqliq = []
module.exports.default = class mysqli {
    static mysqli(data, row) {
        return new Promise((resolve) => {
            let k = mysqliq[row]
            const obj = Object.entries(data)
            if (obj.length > 0) {
                obj.forEach(([key, value]) => {
                    k = k.replace(new RegExp(`{{${key}}}`, 'g'), value)
                })
                resolve(k)
            } else {
                resolve(k)
            }
        })
    }
}

mysqliq.select_users = 'SELECT * FROM users'
// register
mysqliq.okta_im_2 = 'select u.id,u.first_name,u.last_name from users as u where u.email = ? limit 1'
mysqliq.im_1a =
    'insert into users (email, ip, first_name, last_name, password_hash, password_salt, created_at, created_by, username, companyname, address1, phone, country, state, zip, city, language, status, admin, isemp, user_type, interestIn, reg_type) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"AS")'

// Registration
mysqliq.im_35 =
    'insert into user_notification (user_id,email,sms) values(?, "{{email}}", "{{sms}}")'
mysqliq.insert_users = 'insert into users ({{keys}}) values ({{values}})'
mysqliq.insert_custom_users = 'insert into {{table_name}} ({{keys}}) values ({{values}})'
mysqliq.update_custom_cart =
    'update cart_temp set qty = ?,amount=? where project_id = ? and user_id = ? and paid=0'
mysqliq.insert_custom_cart =
    'insert into cart_temp (cart_id,project_id,date_added,qty,paid,user_id,amount) values (NULL,?,?,?,?,?,?)'

// post listing
mysqliq.insert_tables = 'insert into {{tables}} ({{keys}}) values ({{values}})'
mysqliq.update_tables = 'update {{tables}} set {{keys}} where {{values}}'
mysqliq.delete_tables = 'delete from {{tables}} where {{values}}'
mysqliq.select_tables =
    'select {{keys}} from {{tables}} where {{values}} {{group_by}} {{order_by}} {{limit_by}}'

mysqliq.get_single_auctions =
    'select a.id,a.avatar,a.avatar as file_name,a.title, a.description, a.date_added, a.market_status,a.date_closed, a.ending_enable, a.ending_items, a.ending_mins, GROUP_CONCAT(p.id) as auction_lots from auctionlot as a left join projects as p on p.auctionid = a.id where a.id = ? limit 1'
mysqliq.update_all_auct_closedate =
    'update projects set date_added = ?,date_closed = ? where auctionid = ?'

mysqliq.getAllSubLots =
    'select * from projects where auctionid = ? and market_status != "removed" order by created_at asc'
mysqliq.updatelotnew = 'UPDATE projects set date_closed=? where id=?'

// Update Profile
mysqliq.update_user_profile = 'update users set {{keys}} where id = "{{user_id}}" limit 1'
mysqliq.update_custom_user_profile =
    'update {{table_name}} set {{keys}} where user_id = "{{user_id}}" limit 1'
mysqliq.get_user_address_details = 'select * from {{addressTable}} where user_id = {{userID}}'
mysqliq.get_user_card_details = 'select * from user_card_details where user_id = {{userID}}'

// login
mysqliq.im_2 =
    'select u.id,u.password_salt,u.google_id,u.facebook_id,u.password_hash,u.status from users as u where (u.email = "{{username}}") limit 1'
mysqliq.im_3 = 'update users set last_login = ?,redis_key = ? where id = ? limit 1'
mysqliq.im_4 = 'insert into user_logins (user_id,created_at,useragent,ip) values(?,?,?,?)'

// token
mysqliq.im_token = 'select {{columns}} from users as u {{customTableJoin}} where u.id = ? limit 1'

mysqliq.im_user_prefer =
    'select AVG(bid_amount) as averageBidAmount from user_bid_prefer as ubp where ubp.user_id = ? limit 1'
mysqliq.im_user_category_prefer = `SELECT categoryTypeId, COUNT(*) AS categoryTypeCount from user_bid_prefer as ubp where ubp.user_id = ? GROUP BY categoryTypeId order by categoryTypeCount desc`
mysqliq.im_user_condition_prefer = `SELECT conditionTypeId, COUNT(*) AS conditionTypeCount from user_bid_prefer as ubp where ubp.user_id = ? GROUP BY conditionTypeId order by conditionTypeCount desc`

// search
mysqliq.ig_571 =
    // 'select count(p.id) as totalactive,{{selectQuery}} from projects AS p inner join items as it on it.id = p.item_id where p.id > 0 and p.ended_early = 0 {{where}}'
    `select count(p.id) as totalactive,{{selectQuery}} from projects AS p inner join {{customProject}} as {{customProjectAlis}} on {{customProjectJoin}} {{locationJoin}}
    where p.id > 0 and p.ended_early = 0 {{where}}`

// product view page
mysqliq.im_26 =
    'select project_id, url, file_name, image_json, type from attachments where is_delete = 0 and project_id = ? and type != "3" order by type,orderby asc'
mysqliq.im_818 =
    'select user_id,proposed_amount,currentbid_increment,proposal from bids where project_id =  ? and declined = 0 ORDER BY proposed_amount DESC limit 1'
mysqliq.get_proxy_details_api =
    'SELECT pb.project_id,pb.user_id,pb.maxamount as amount,u.username,(SELECT bid_position FROM bids b WHERE pb.project_id = b.project_id AND pb.user_id = b.user_id LIMIT 1) as user_pos FROM proxybid as pb left join users as u on pb.user_id = u.id WHERE pb.project_id = ? and pb.status = 1 ORDER BY pb.maxamount desc,pb.date_added asc LIMIT ?,1'
mysqliq.im_822 =
    'SELECT b.project_id,(select hu.username as second_highest_uname from users as hu where hu.id = b.user_id limit 1) as second_highest_uname FROM bids as b where b.project_id = ? and b.user_id not in (?) order by b.proposed_amount desc, b.id asc limit 0,1'
mysqliq.im_823 =
    'select id from bids where project_id = ? and user_id IN (?) and awarded = 1 limit 1'
mysqliq.im_824 =
    'select maxamount,prev_maxamount from proxybid where project_id = ? and user_id IN (?) and status = 1 ORDER BY maxamount DESC limit 1'
mysqliq.get_proxy_details =
    'SELECT *,(SELECT bid_position FROM bids b WHERE pb.project_id = b.project_id AND pb.user_id = b.user_id LIMIT 1) as user_pos FROM proxybid as pb WHERE pb.project_id = ? and pb.status = 1 ORDER BY pb.maxamount desc,pb.date_added asc LIMIT ?,1'
mysqliq.im_821 =
    'select b.user_id,b.proposed_amount,b.proposal from bids as b where b.project_id = ? and b.user_id IN (?) and b.declined = 0 ORDER BY b.proposed_amount DESC limit 1'

// Bid history

mysqliq.im_44 =
    'select b.id as bidid,b.user_id,b.project_id, u.first_name, u.last_name, u.username,u.email,b.proposed_amount,b.proposal,b.currentbid_increment,u.state,b.created_at from bids AS b left join users as u on u.id = b.user_id where b.project_id =  ? and b.declined = 0 GROUP BY b.user_id,b.project_id,b.proposed_amount,b.proposal,b.id order by b.proposed_amount desc, field(b.proposal,"proxy_leads","bid_as_proxy","hard_bid","tie_bid","sealed","live"), b.id asc'
mysqliq.im_45 =
    'select count(b.user_id) as bid from bids AS b left join users as u on u.id = b.user_id where b.project_id =  ? and b.declined = 0 order by proposed_amount desc'

mysqliq.get_all_bid_history =
    'select b.id as bidid,b.user_id,b.project_id, u.first_name, u.last_name, u.username,u.email,b.proposed_amount,b.proposal,b.currentbid_increment,u.state,b.created_at from bids AS b left join users as u on u.id = b.user_id where b.project_id =  ? and b.declined = 0 GROUP BY b.user_id,b.project_id,b.proposed_amount,b.proposal,b.id order by b.proposed_amount desc, field(b.proposal,"proxy_leads","bid_as_proxy","hard_bid","tie_bid","sealed","live"), b.id asc {{limit}}'
mysqliq.get_all_bid_history_limit =
    'select b.id from bids AS b where b.project_id = ? and b.declined = 0 GROUP BY b.user_id,b.project_id,b.proposed_amount,b.proposal,b.id order by b.proposed_amount desc, field(b.proposal,"proxy_leads","bid_as_proxy","hard_bid","tie_bid","sealed","live"), b.id asc'
// common
mysqliq.sitesettings = 'SELECT * FROM configurations WHERE enabled = 1'
mysqliq.get_all_bid_increment = 'SELECT * FROM bid_increment where type="range"'
mysqliq.get_bid_inc_default =
    'SELECT * FROM bid_increment where type="default" ORDER BY id DESC LIMIT 1'

mysqliq.get_all_tableentries = 'SELECT * FROM {{tableUsed}} WHERE 1'
// Bidding
mysqliq.im_64 = 'select {{columns}} from projects as p {{customTableJoin}} where p.id = ? limit 1'
mysqliq.update_closedate_extension = 'UPDATE projects SET date_closed = ? WHERE id = ? limit 1'
mysqliq.update_autobidcount_extension =
    'UPDATE projects SET autobid_count = autobid_count + 1 WHERE id = ? limit 1'
mysqliq.user_in_proxybid =
    'SELECT * FROM proxybid WHERE project_id = ? AND user_id = ? and status = 1'
mysqliq.get_proxy_details =
    'SELECT *,(SELECT bid_position FROM bids b WHERE pb.project_id = b.project_id AND pb.user_id = b.user_id LIMIT 1) as user_pos FROM proxybid as pb WHERE pb.project_id = ? and pb.status = 1 ORDER BY pb.maxamount desc,pb.date_added asc LIMIT ?,1'
mysqliq.update_proxybid =
    'UPDATE proxybid SET maxamount = ?,date_added = ?,status = 1  WHERE project_id = ? AND user_id = ?'
mysqliq.update_proxybid_withprev =
    'UPDATE proxybid SET maxamount = ?,prev_maxamount=?,date_added = ?,status = 1  WHERE project_id = ? AND user_id = ?'
mysqliq.insert_proxybid =
    'INSERT INTO proxybid (project_id,user_id,maxamount,date_added,status) VALUES (?,?,?,?,1)'
mysqliq.insert_proxybid_withprev =
    'INSERT INTO proxybid (project_id,user_id,maxamount,prev_maxamount,date_added,status) VALUES (?,?,?,?,?,1)'
// Proxy Bidding
mysqliq.get_last_bidamount =
    'SELECT * FROM bids WHERE project_id = ? and declined = 0 and proposal != "tie_bid" ORDER BY proposed_amount desc, id asc LIMIT 1'
mysqliq.insert_bid_as_proxy =
    'INSERT INTO bids (project_id,user_id,proposed_amount,created_at,proposal) VALUES (?,?,?,?,?)'
mysqliq.add_extra_bid =
    'insert into bids  (project_id,user_id,created_at,proposed_amount,proposal,tied_bidder,currentbid_increment) values (?,?,?,?,?,?,?)'
mysqliq.im_68 = 'update projects set wprice = ? where id =  ? limit 1'
mysqliq.im_69 =
    'insert into bids  (project_id,user_id,created_at,proposed_amount,proposal) values (?,?,?,?,?)'
mysqliq.im_70 =
    'insert into bids  (project_id,user_id,created_at,proposed_amount,proposal) values (?,?,?,?,?)'
mysqliq.im_71 =
    'select a.id,a.user_id from bids as a where a.project_id = ? and a.proposed_amount = ? and (a.id != (select b.id from bids as b where b.project_id = a.project_id and b.proposed_amount = a.proposed_amount and b.proposal = "tie_bid" order by b.id asc limit 1) and a.id != (select c.id from bids as c where c.project_id = a.project_id and c.proposed_amount = a.proposed_amount and c.proposal = "proxy_leads" order by c.id asc limit 1))'
mysqliq.im_72 = 'delete from bids where id = ? limit 1'
mysqliq.im_73 = 'insert into bids_duplicate (date_added,user_id,amount,project_id) values(?,?,?,?)'
mysqliq.im_74 =
    'update proxybid set maxamount = ?,status = 1 where project_id = ? and user_id = ? limit 1'
mysqliq.im_75 = 'update proxybid set status = 0 where project_id = ? and user_id = ? limit 1'
mysqliq.im_76 =
    'select count(dt.id) as bdcnt from bids as dt where dt.project_id = ? and dt.declined = 0'
mysqliq.im_79 =
    'select b.proposed_amount,b.user_id from bids as b inner join users as u on b.user_id = u.id where b.project_id = ? and b.declined = 0 and b.proposal != "tie_bid" order by b.proposed_amount desc, field(b.proposal,"proxy_leads","bid_as_proxy","hard_bid","tie_bid","sealed","live"), b.id asc limit 1'
mysqliq.im_80 =
    'select b.user_id,b.proposed_amount,b.proposal,(select maxamount as maxeprox from proxybid as p where p.project_id = b.project_id and p.user_id = b.user_id and p.status = 1 limit 1) as maxeprox from bids as b where b.project_id =  ? and b.user_id = ? and b.declined = 0 ORDER BY b.proposed_amount DESC limit 1'
mysqliq.im_81 =
    'SELECT pb.*,u.username,u.first_name,u.last_name,u.email,u.language as user_language,u.phone,(SELECT bid_position FROM bids b WHERE pb.project_id = b.project_id AND pb.user_id = b.user_id LIMIT 1) as user_pos  FROM proxybid as pb left join users as u on u.id = pb.user_id {{where}}'
mysqliq.im_84 = 'insert into bid_time_logs (date_added,pid,uid,ms) values(?,?,?,?)'

mysqliq.im_insertbid_prefer =
    'insert into user_bid_prefer (user_id,project_id,categoryTypeId,conditionTypeId,bid_amount,current_bid,type,created_at) values(?,?,?,?,?,?,?,?)'

mysqliq.im_updatebid_project =
    'update projects as p set p.score_proj = ?, p.score_price = ? where p.id = ? limit 1'
/// dashboard and search items

mysqliq.ingram_13 = `select {{columns}}, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active, (select count(b.id) as bid_count from bids as b where b.project_id = p.id and b.declined = 0) as bid_count, p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice
{{columns2}} from projects AS p {{customTableJoin}} left join buynow as b on (b.project_id = p.id) left join proxybid as pb on pb.project_id = p.id left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0
{{customTableJoin2}}
{{locationJoin}}
where p.id > 0 and p.ended_early = 0 {{where}} group by p.id {{order}} {{limitf}}`
mysqliq.dash_auction_item =
    'select {{columns}} , watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice from projects AS p {{customTableJoin}} inner join bids as bb on bb.project_id = p.id and bb.user_id = "{{userid}}" left join buynow as b on b.project_id = p.id left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and p.ended_early = 0 {{where}} group by p.id {{order}}  {{limitf}}'
mysqliq.dash_watchlist_item =
    'select {{columns}} , watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,(CASE WHEN p.date_added > "{{dateNow}}" THEN "future" WHEN p.date_closed < "{{dateNow}}" THEN "past" WHEN "{{dateNow}}" BETWEEN p.date_added AND p.date_closed THEN "current" ELSE "" END) as lot_type,p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice from projects AS p {{customTableJoin}} inner join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 left join buynow as b on (b.project_id = p.id) where p.id > 0 and p.ended_early = 0 {{where}} group by p.id {{order}}  {{limitf}}'

mysqliq.dash_won_item =
    'select {{columns}}, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,p.avatar as file_name, IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice from {{mainTable}} {{customTableJoin}} left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and b.user_id = "{{userid}}" and b.buynow_autype != "buynow" and p.ended_early = 0 {{where}} {{order}} {{limitf}}'
mysqliq.dash_buynow_item =
    'select {{columns}}, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice from {{mainTable}} {{customTableJoin}} left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and b.user_id = "{{userid}}" and b.buynow_autype = "buynow" and p.ended_early = 0 {{where}} {{order}}  {{limitf}}'

mysqliq.ingram_13a =
    'select  count(p.id) as totallength from projects AS p {{customTableJoin}} {{locationJoin}} where p.id > 0 and p.ended_early = 0 {{where}}'
mysqliq.dash_auction_item_count =
    'select count(DISTINCT p.id) as totallength from projects AS p {{customTableJoin}} inner join bids as bb on bb.project_id = p.id and bb.user_id = "{{userid}}" where p.id > 0 and p.ended_early = 0 {{where}} '
mysqliq.dash_watchlist_item_count =
    'select count(DISTINCT p.id) as totallength from projects AS p {{customTableJoin}} inner join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0  where p.id > 0 and p.ended_early = 0 {{where}}'
mysqliq.dash_won_item_count =
    'select count(DISTINCT p.id) as totallength from {{mainTable}} {{customTableJoin}} where p.id > 0 and b.user_id = "{{userid}}" and b.buynow_autype != "buynow" and p.ended_early = 0 {{where}} group by p.id {{order}}  {{limitf}}'
mysqliq.dash_buynow_item_count =
    'select count(DISTINCT p.id) as totallength from {{mainTable}} {{customTableJoin}} where p.id > 0 and b.user_id = "{{userid}}" and b.buynow_autype = "buynow" and p.ended_early = 0 {{where}} group by p.id {{order}}  {{limitf}}'
// Auction Bidding details
mysqliq.my_bidding_items =
    'select ac.*,{{columns}},(CASE WHEN ac.date_added > "{{dateNow}}" THEN "future" WHEN ac.date_closed < "{{dateNow}}" THEN "past" WHEN "{{dateNow}}" BETWEEN ac.date_added AND ac.date_closed THEN "current" ELSE "" END) as lot_type from auctionlot as ac join (select DISTINCT p.auctionid from bids as b join projects as p on (p.id = b.project_id) where b.user_id = "{{userid}}") as bid on bid.auctionid = ac.id {{customTableJoin}} where ac.id > 0 {{where}} {{order}} {{limitf}}'
mysqliq.my_bidding_items_count =
    'select count(DISTINCT ac.id) as totallength from auctionlot as ac join (select DISTINCT p.auctionid from bids as b join projects as p on (p.id = b.project_id) where b.user_id = "{{userid}}") as bid on bid.auctionid = ac.id where ac.id > 0 {{where}}'

// invoice items

mysqliq.invoice_item =
    'SELECT pc.*,b.common_invoice FROM product_cart as pc left join buynow as b on b.cart_id = pc.id WHERE pc.id > 0 and pc.cart_checkout = 1 and pc.user_id = {{userid}} {{where}} group by pc.id {{order}} {{limitf}}'
mysqliq.invoice_item_count =
    'select count(DISTINCT pc.id) as totallength FROM product_cart AS pc WHERE pc.id > 0 and pc.cart_checkout = 1 and pc.user_id = {{userid}} {{where}} {{order}}'

// return items

mysqliq.return_item =
    'SELECT rc.*,b.return_invoice FROM return_cart as rc left join buynow as b on b.returncart_id = rc.id WHERE rc.id > 0 and rc.checkout = 1 and rc.user_id = {{userid}} {{where}} group by rc.id {{order}} {{limitf}}'
mysqliq.return_item_count =
    'select count(DISTINCT rc.id) as totallength FROM return_cart AS rc WHERE rc.id > 0 and rc.checkout = 1 and rc.user_id = {{userid}} {{where}} {{order}}'

// cart
mysqliq.cart_all_item =
    'select {{columns}} from buynow AS b {{customTableJoin}}  where b.user_id = "{{userid}}" and p.ended_early = 0 and b.paid = "0" {{where}} {{order}}'
mysqliq.cart_all_cartid =
    'select b.cart_group as id from buynow AS b where  b.paid = "0" and b.partial = "0" and b.user_id = ? {{where}} group by cart_group {{order}}'
mysqliq.check_cart_user =
    'select b.id from buynow as b inner join projects as p on p.id = b.project_id where b.user_id = ? and b.project_id = ? limit 1'
mysqliq.add_cart_to_user =
    'update buynow as b set b.in_cart = ? where b.user_id = ? and b.id = ? limit 1'

mysqliq.check_buynow_unpaid_exists =
    'SELECT b.id, p.location_id FROM buynow as b inner join projects as p on p.id = b.project_id where b.paid = 0 and b.user_id = ? and b.cart_id = 0 order by b.id desc limit 1'

mysqliq.check_cart_user_exists =
    'SELECT pc.id FROM product_cart as pc  where pc.user_id = ? and pc.cartlocation_id = ? and pc.cart_checkout = 0 order by pc.id desc limit 1 '
mysqliq.get_cart_location_data =
    'SELECT loc.* FROM product_cart as pc left join locations as loc on loc.id = pc.cartlocation_id where pc.id = ? limit 1'
mysqliq.get_cart_all_data = 'SELECT pc.* FROM product_cart as pc where pc.id = ? limit 1 '
mysqliq.insert_new_cart_user =
    'INSERT INTO `product_cart`(user_id, bill_first_name, bill_last_name, bill_address1, bill_address2, bill_city, bill_state, bill_zipcode, cartlocation_id, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)'
mysqliq.update_cart_details = 'update product_cart set {{keys}} where id = "{{cart_id}}" limit 1'

mysqliq.update_cart_detailsnew =
    'update cart_temp set {{keys}} where project_id = "{{pro_id}}" and user_id = "{{u_id}}" and paid = 0 limit 1'
mysqliq.update_cart_detailsuser =
    'update cart_temp set {{keys}} where user_id = "{{u_id}}" and paid = 0 '

mysqliq.get_all_available_appointments =
    'select a.id, a.appointmentTime from appointments AS a where a.id > 0 and a.appointmentTime > ? and a.appointmentTime <= ? and a.userId = ? {{where}} {{order}}'

// cart count
mysqliq.get_all_pending_carts =
    'SELECT GROUP_CONCAT(pc.id) as pendingCart FROM product_cart as pc  where pc.user_id = ? and pc.cart_checkout = 0'
mysqliq.get_all_count_pending_cart =
    'select {{field}} {{extraField}} from {{mainTableJoin}} where {{field}} > 0 {{where}}'
// Payment
mysqliq.update_payment_success_cart =
    'update product_cart set cart_checkout = 1, cart_paid = ?, cart_payment = ?, cart_paiddate = ? where id = ?'
mysqliq.update_payment_success_buynow =
    'update buynow set paid = ?, common_invoice = ?, paid_date = ? where cart_id = ?'
mysqliq.update_appointment_success_buynow =
    'update product_cart set appointment_id = ? where id = ?'

mysqliq.insert_appointments_table =
    'INSERT INTO appointments (appointmentTime, userId, locationId, createdAt, appointmentStatusTypeId) VALUES (?,?,?,?,?)'

mysqliq.insert_payment_request_log =
    'INSERT INTO payment_logs(cart_id, user_id, gateway, pay_type) VALUES (?,?,?,?)'

// Invoice
mysqliq.single_invoice_item =
    'select {{columns}}, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,b.cart_id,b.returned,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice from {{mainTable}} {{customTableJoin}} left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and b.user_id = "{{userid}}"  and p.ended_early = 0 {{where}} {{order}}  {{limitf}}'

mysqliq.invoice_all_item =
    'select {{columns}},COUNT(DISTINCT b.id) as total_items, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,b.cart_id,b.returned,IFNULL(b.paid,0) as buynowpaid,IFNULL(b.common_invoice,0) as common_invoice from {{mainTable}} {{customTableJoin}} left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and b.user_id = "{{userid}}"  and p.ended_early = 0 {{where}} group by b.common_invoice  {{order}}  {{limitf}}'
mysqliq.invoice_all_item_cnt =
    'select b.id from {{mainTable}} {{customTableJoin}} left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and b.user_id = "{{userid}}"  and p.ended_early = 0 {{where}} group by b.common_invoice  {{order}}  {{limitf}}'

mysqliq.get_cart_invoice_all_data =
    'SELECT pc.*,b.common_invoice FROM product_cart as pc inner join buynow as b on b.cart_id = pc.id where pc.id = ? limit 1 '
mysqliq.update_payment_log = 'update payment_logs set {{keys}} where id = "{{log_id}}" limit 1'
mysqliq.insert_pay_record =
    'INSERT INTO pay_records(cart_id, user_id, trans_id, created_at, payment_method, no_of_cards, mk_card_number, amount, card_type) VALUES (?,?,?,?,?,?,?,?,?)'
mysqliq.get_minimum_invoiceid =
    'SELECT b.common_invoice FROM buynow as b WHERE cart_id = ? order by b.common_invoice desc limit 1'
mysqliq.get_cart_details = 'SELECT pc.* FROM product_cart as pc WHERE pc.id = ? limit 1 '
mysqliq.get_cart_invoice_transactions_data =
    'SELECT pr.* FROM pay_records as pr where pr.cart_id = ?'
mysqliq.get_cart_invoice_appointment_data =
    'SELECT a.* FROM product_cart as pc inner join appointments as a on a.id = pc.appointment_id WHERE pc.id = ?'
mysqliq.get_cart_invoice_location_data =
    'SELECT l.* FROM product_cart as pc inner join locations as l on l.id = pc.cartlocation_id WHERE pc.id = ?'

mysqliq.depositinsert =
    'insert into user_credits (date_added,user_id,amount,credit_notes,employee_name,withdraw,trans_id) values(?,?,?,?,?,?,?,?)'
mysqliq.depositusersinsert =
    'update users set deposit_amount = deposit_amount+?, updated_at = ? where id = ? limit 1'
mysqliq.depositusersremove =
    'update users set deposit_amount = deposit_amount-?, updated_at = ? where id = ? limit 1'

// Watchlist

mysqliq.check_watchlist_exist =
    'select id from watchlists where user_id = ? and project_id = ? limit 1'
mysqliq.update_existing_watchlist =
    'update watchlists set is_delete = 0 where project_id = ? and user_id = ? and is_delete = 1 limit 1'
mysqliq.insert_new_watchlist =
    'INSERT INTO watchlists (project_id,user_id,date_added) VALUES (?, ?, ?)'
mysqliq.delete_from_watchlist =
    'update watchlists set is_delete = 1 where project_id = ? and user_id = ? limit 1'

// Saved Search
mysqliq.check_saved_search_exist =
    'select id from saved_search where user_id = ? and search_text = ? limit 1'
mysqliq.delete_from_saved_search = 'delete from saved_search where id = ? and user_id = ? limit 1'

// Auction Watchlist
mysqliq.check_auction_watchlist_exist =
    'select id from auction_watchlists where user_id = ? and auctionlot_id = ? limit 1'
mysqliq.update_existing_auction_watchlist =
    'update auction_watchlists set is_delete = 0 where auctionlot_id = ? and user_id = ? and is_delete = 1 limit 1'
mysqliq.insert_new_auction_watchlist =
    'INSERT INTO auction_watchlists (auctionlot_id,user_id,date_added) VALUES (?, ?, ?)'
mysqliq.delete_from_auction_watchlist =
    'update auction_watchlists set is_delete = 1 where auctionlot_id = ? and user_id = ? limit 1'
mysqliq.auction_watchlist_item_count =
    'select COUNT(DISTINCT ac.id) as totallength from auctionlot AS ac {{customTableJoin}} inner join auction_watchlists as watc on ac.id = watc.auctionlot_id and watc.user_id = "{{userid}}" and watc.is_delete = 0  where ac.id > 0 {{where}}'
mysqliq.auction_watchlist_item =
    'select {{columns}} , watc.id as watchlistid,(CASE WHEN ac.date_added > "{{dateNow}}" THEN "future" WHEN ac.date_closed < "{{dateNow}}" THEN "past" WHEN "{{dateNow}}" BETWEEN ac.date_added AND ac.date_closed THEN "current" ELSE "" END) as auction_type,ac.avatar as file_name from auctionlot AS ac {{customTableJoin}} inner join auction_watchlists as watc on ac.id = watc.auctionlot_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where ac.id > 0 {{where}} group by ac.id {{order}}  {{limitf}}'
mysqliq.get_auctions_watch_list =
    'select CASE WHEN id IS NOT NULL THEN 1 ELSE 0 END as following_auction from auction_watchlists WHERE auctionlot_id = ? AND user_id = ?  AND is_delete = 0 LIMIT 1'

// Forgot Password
mysqliq.check_forgot_password_user =
    'select id,email,first_name,last_name,username from users  where email = ? order by id desc'
mysqliq.insert_forgot_password_token =
    'INSERT INTO forgot_pass_token (user_id,user_email,token,created_at) VALUES (?,?,?,?)'
mysqliq.get_forgot_password_token =
    'select u.id,u.email,u.first_name,u.last_name,u.username,u.password_salt from forgot_pass_token as fpt inner join users as u on fpt.user_id = u.id where fpt.user_email=? and fpt.token = ?'
mysqliq.reset_forgot_password =
    'update users set password_hash = ?, password_salt = ? where id = ? limit 1'
mysqliq.update_forgot_password_token =
    'update forgot_pass_token set used_at = ?, used = 1 where user_id = ? and used = 0'

/// Auction Search change
mysqliq.get_all_auction_search_limit =
    // 'select a.*, {{columns}}, a.avatar as file_name from auctionlot AS a left join projects as p on p.auctionid = a.id and p.market_status = "open" {{customTableJoin}} where a.id > 0 {{where}} group by a.id  {{order}} {{limitf}}'
    'select (CASE WHEN ac.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active, {{columns}} from auctionlot AS ac left join projects as p on p.auctionid = ac.id and p.market_status = "open" {{customTableJoin}} {{locationJoin}} where ac.id > 0 {{where}} group by ac.id {{order}} {{limitf}}'

mysqliq.get_all_auction_search =
    'select  ac.id from auctionlot AS ac left join projects as p on  p.auctionid = ac.id and p.market_status = "open" {{customTableJoin}} {{locationJoin}} where ac.id > 0 {{where}} group by ac.id {{order}}'

mysqliq.get_project_auctions_details =
    'select id, avatar, title, market_status, (CASE WHEN date_added > "{{dateNow}}" THEN "future" WHEN date_closed < "{{dateNow}}" THEN "past" WHEN "{{dateNow}}" BETWEEN date_added AND date_closed THEN "current" ELSE "" END) as lot_type from projects where auctionid = ? AND id > 0 {{where}} order by id ASC'

// Phone Verification
mysqliq.insert_phone_verify_token =
    'INSERT INTO phone_verification (phone,code,ip_address,created_at,expires_at) VALUES (?,?,?,?,?)'
mysqliq.check_phone_verify_token =
    'SELECT id, expires_at, code from phone_verification where phone = ? and verified = 0 ORDER BY id DESC LIMIT 1'
mysqliq.update_verified_phone_token =
    'update phone_verification set verified = 1, verified_at = ? where id = ?'
mysqliq.update_expiry_phone_verify = 'update phone_verification set expires_at = ? where id = ?'

// Static Page
mysqliq.get_static_page = 'select * from static_pages where id = ? or name = ?'

// Email Verify
mysqliq.insert_register_verify_token =
    'INSERT INTO register_verify_token (user_id,user_email,token,created_at) VALUES (?,?,?,?)'
mysqliq.get_register_verify_token =
    'select u.id,u.email,u.first_name,u.last_name,u.username,u.password_salt from register_verify_token as fpt inner join users as u on fpt.user_id = u.id where fpt.user_email=? and fpt.token = ?'
mysqliq.reset_register_verify = 'update users set mail_verified = 1 where id = ? limit 1'
mysqliq.update_register_verify_token =
    'update register_verify_token set used_at = ?, used = 1 where user_id = ? and used = 0'

// Return
mysqliq.return_cart_all_item =
    'select p.*, {{columns}}, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,b.cart_id,b.returncart_id from projects AS p {{customTableJoin}} inner join buynow as b on b.project_id = p.id and b.user_id = "{{userid}}" left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and p.ended_early = 0 and b.paid = "1" {{where}}  group by p.id {{order}}'
mysqliq.return_cart_all_cartid =
    'select rc.id from return_cart AS rc where rc.id > 0 and rc.checkout = "0" and rc.user_id = ? {{where}} {{order}}'
mysqliq.return_get_cart_all_data = 'SELECT rc.* FROM return_cart as rc where rc.id = ? limit 1 '
mysqliq.return_get_cart_location_data =
    'SELECT loc.* FROM return_cart as rc left join locations as loc on loc.id = rc.location_id where rc.id = ? limit 1'

mysqliq.return_check_cart_user_exists =
    'SELECT rc.id FROM return_cart as rc  where rc.user_id = ? and rc.location_id = ? and rc.checkout = 0 order by rc.id desc limit 1 '
mysqliq.return_insert_new_cart_user =
    'INSERT INTO `return_cart`(user_id, location_id, created_at) VALUES (?,?,?)'
mysqliq.return_add_cart_to_user =
    'update buynow as b set b.returncart_id = ? where b.user_id = ? and b.project_id = ? limit 1'
mysqliq.return_update_cart_details =
    'update return_cart set {{keys}} where id = "{{cart_id}}" limit 1'

// refund
mysqliq.refund_update_payment_success_cart =
    'update return_cart set checkout = 1, paid = ?, payment = ?, card_number = ?,card_expiry = ?, paiddate = ? where id = ?'
mysqliq.refund_update_payment_success_buynow =
    'update buynow set returned = ?, return_invoice = ?, returned_date = ? where returncart_id = ?'
mysqliq.refund_get_cart_details = 'SELECT rc.* FROM return_cart as rc WHERE rc.id = ? limit 1 '
mysqliq.refund_update_appointment_success_buynow =
    'update return_cart set appointment_id = ? where id = ?'

// relist
mysqliq.im_809 = `INSERT INTO projects (
    item_id, title, desc_proc, selltype, selectedbuyer, bidtype, avatar, date_added, date_closed, sprice, rprice, location_id, user_id, created_at, updated_at, post_type, buynow, feature, bprice, wprice, market_status, auction, qty, sold, reject_reason, future, booked, auctionid, auctiontype, notes, ended_early, buyership, crontype, relisted_id,                                              relisted_count    ) SELECT
    item_id, title, desc_proc, selltype, selectedbuyer, bidtype, avatar, ?         , ?          , sprice, rprice, location_id, user_id, created_at, updated_at, post_type, buynow, feature, bprice, sprice, ?            , auction, qty, sold, reject_reason, future, booked, auctionid, auctiontype, notes, ended_early, buyership, crontype, case when relisted_id = "0" then id else relisted_id end, relisted_count + 1 FROM projects WHERE id = ?`
mysqliq.im_810 = 'update projects set is_relist = 1, market_status = ? where id = ? limit 1'
mysqliq.im_810_return = 'update projects set market_status = ? where id = ? limit 1'
mysqliq.im_809a =
    'INSERT INTO attachments (project_id,url,file_name,image_json,type,user_id,orderby,created_at) SELECT ? as project_id,url,file_name,image_json,type,user_id,orderby,NOW() as created_at FROM attachments WHERE project_id = ? and is_delete = 0'
mysqliq.im_817 =
    'update projects set avatar = (select a.avatar from (SELECT * FROM projects) as a where a.id = ?) where id = ?'
mysqliq.im_54_return = 'select return_invoice from buynow order by return_invoice desc limit 1'

// return invoice
mysqliq.returninvoice_all_item =
    'select  {{columns}}, watc.id as watchlistid,(CASE WHEN p.date_added > "{{dateNow}}" THEN 1 ELSE 0 END) as future_active,p.avatar as file_name,IFNULL(b.user_id,0) as buynowed,IFNULL(b.amount,0) as buynowamount,b.returncart_id,b.returned from projects AS p {{customTableJoin}} inner join buynow as b on b.project_id = p.id and b.user_id = "{{userid}}" left join watchlists as watc on p.id = watc.project_id and watc.user_id = "{{userid}}" and watc.is_delete = 0 where p.id > 0 and p.ended_early = 0 {{where}} group by p.id {{order}}'
mysqliq.get_cart_returninvoice_all_data =
    'SELECT rc.*,b.return_invoice FROM return_cart as rc inner join buynow as b on b.returncart_id = rc.id where rc.id = ? limit 1'
mysqliq.get_cart_returninvoice_transactions_data =
    'SELECT rr.* FROM refund_records as rr where rr.returncart_id = ?'
mysqliq.get_cart_returninvoice_appointment_data =
    'SELECT a.* FROM return_cart as rc inner join appointments as a on a.id = rc.appointment_id WHERE rc.id = ?'
mysqliq.get_cart_returninvoice_location_data =
    'SELECT l.* FROM return_cart as rc inner join locations as l on l.id = rc.location_id WHERE rc.id = ?'

mysqliq.remainder_notification_flag_dynamic =
    'SELECT nf.* FROM notification_flag as nf WHERE nf.type = ? and nf.enabled = 1 and notify=0 limit 1'

// Preference
mysqliq.get_preference = 'select id from user_notification where user_id = ?'
mysqliq.insert_preference = 'insert into user_notification (user_id,email,sms) values(?,?,?)'
mysqliq.update_preference = 'update user_notification set email=?, sms=? where id = ?'

// video stream store

mysqliq.add_video_stream_user =
    'insert into auction_video_stream (auctionid,user_id,date_added) values(?,?,?)'
mysqliq.get_video_stream_user =
    'select auctionid from auction_video_stream where FIND_IN_SET(?, auctionid) order by id desc limit 1'

// Buy now carts
mysqliq.temp_cart_all_item =
    'select {{columns}} from cart_temp AS crt {{customTableJoin}}  where crt.user_id = "{{userid}}" and p.ended_early = 0 and crt.paid = "0" {{where}} {{order}}'
mysqliq.temp_cart_all_cartid =
    'select crt.cart_group as id from cart_temp AS crt where  crt.paid = "0" and crt.user_id = ? {{where}} group by cart_group {{order}}'
mysqliq.temp_check_cart_user =
    'select b.id, p.location_id from buynow as b inner join projects as p on p.id = b.project_id where b.user_id = ? and b.project_id = ? limit 1'
mysqliq.temp_add_cart_to_user =
    'update buynow as b set b.cart_id = ? where b.user_id = ? and b.project_id = ? limit 1'

mysqliq.insert_payment_request_log_rosoom =
    'INSERT INTO payment_logs(cart_id,request, user_id,transactionID,pay_type, gateway,requested_at,payment_object ) VALUES (?,?,?,?,?,?,?,?)'

// Buynow Add
mysqliq.get_project_details_buynow =
    'select id,market_status,user_id,sold,bprice,booked,qty,tax,shipping,buyer_premium,group_carts,shipping_check,local_pickup_check from {{tables}} where id IN (?) limit 1'
mysqliq.get_cart_details_buynow =
    'select cart_id,qty from {{tables}} where project_id = ? and user_id = ? and paid = 0 limit 1'

mysqliq.insert_payment_response_log_rosoom =
    'update payment_logs set response=?,response_at=? where id in (?)'

// doug TV video stream store

mysqliq.add_video_stream_user_doug =
    'insert into auction_video_stream (auctionid,sender_stream,user_id,date_added,active) values(?,?,?,?,?)'
mysqliq.get_video_stream_user =
    'select auctionid,sender_stream from auction_video_stream where FIND_IN_SET(?, auctionid) order by id desc limit 1'
mysqliq.stop_video_stream_user_doug =
    'update auction_video_stream set active = ?, date_ended = ? where sender_stream in (?)'
