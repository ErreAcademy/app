const ICO={
peso:'<rect x="3.5" y="4" width="17" height="16" rx="4"/><path d="M8.5 10a4.5 4 0 0 1 7 0"/><path d="M12 10l1.7-2"/>',
pasos:'<path d="M4 17.5c0-3 1.2-5 3.2-6.2L9.5 5l3.3 1.6-1.4 3.6 6.2 2.6c1.5.6 2.4 1.7 2.4 3.4V19H4z"/>',
fuerza:'<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>',
llama:'<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.2 1 1.8 1.7 2C10.5 8 11 5.5 12 3z"/>',
l0:'<path d="M12 21v-8"/><path d="M12 13c0-4-3-6-7-6 0 4 2 6 7 6z"/><path d="M12 15c0-3 2-5 6-5 0 3-2 5-6 5z"/>',
l1:'<rect x="4" y="5" width="16" height="15" rx="3"/><path d="M4 10h16M8 3v4M16 3v4M9 15l2 2 4-4"/>',
l2:'<path d="M17 4l3 3-3 3"/><path d="M4 11V9a2 2 0 0 1 2-2h16"/><path d="M7 20l-3-3 3-3"/><path d="M20 13v2a2 2 0 0 1-2 2H2"/>',
l3:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
l4:'<path d="M2.5 19l6.5-12 4 7 3-4.5 5.5 9.5z"/>',
cardio:'<path d="M3 12.5h4l2.3-6.5 4.4 12 2.3-5.5H21"/>',
calma:'<path d="M3 8.5h10a2.5 2.5 0 1 0-2.5-2.5M3 12.5h15a2.5 2.5 0 1 1-2.5 2.5M3 16.5h7a2 2 0 1 1-2 2"/>',
act:'<circle cx="14.5" cy="4.5" r="1.8"/><path d="M6 21l3.5-6 3 2.5L15 12l3.5 2.5M9.5 15l-1.5-5 5.5-1.5 2 3"/>',
trash:'<path d="M4 7h16M9.5 11v5.5M14.5 11v5.5M6 7l.9 11.2A2 2 0 0 0 8.9 20h6.2a2 2 0 0 0 2-1.8L18 7M9 7V4.5h6V7"/>',
bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/>',
l5:'<path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z"/>',
layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.5l9 5 9-5"/><path d="M3 16.5l9 5 9-5"/>',
gauge:'<path d="M4.5 18a8.5 8.5 0 1 1 15 0"/><path d="M12 14l4-5"/><circle cx="12" cy="14.5" r="1.2" fill="currentColor"/>',
timer:'<circle cx="12" cy="13.5" r="7.5"/><path d="M12 9.5v4l2.5 1.5M9.5 3h5"/>',
drop:'<path d="M12 3v13M7 12l5 5 5-5M5 21h14"/>',
tempo:'<path d="M8 21l2-17h4l2 17zM12 17l4-9"/>',
repeat:'<path d="M17 4l3 3-3 3"/><path d="M4 11V9a2 2 0 0 1 2-2h14"/><path d="M7 20l-3-3 3-3"/><path d="M20 13v2a2 2 0 0 1-2 2H4"/>',
close:'<path d="M6 6l12 12M18 6L6 18"/>',
moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5z"/><path d="M17.5 3v4M15.5 5h4"/>'};
const TMIC={series:'layers',reps:'repeat',rir:'gauge',rpe:'gauge',descanso:'timer',tempo:'tempo',dropset:'drop'};
ICO.hist='<path d="M4 4v16h16"/><path d="M8 15l3.5-4 3 2.5L19 8"/>';
ICO.cmt='<path d="M5 4h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-7l-4.5 4v-4H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/><path d="M8 9h8M8 12.5h5"/>';
const ICON=(n,s)=>`<svg class="ico" width="${s||18}" height="${s||18}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[n]||''}</svg>`;
/* ================= ERRE · conexión real (Supabase) ================= */
const CFG=window.ERRE_CFG||{};
function realDB(){
  const sb=window.supabaseCreate(CFG.url,CFG.key,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  const ok=r=>{if(r.error)throw r.error;return r.data;};
  return {
    async session(){const {data}=await sb.auth.getSession();return data.session;},
    async signIn(email,pw){const r=await sb.auth.signInWithPassword({email,password:pw});if(r.error)throw r.error;return r.data.session;},
    async signUp(email,pw,name){const r=await sb.auth.signUp({email,password:pw,options:{data:{full_name:name},emailRedirectTo:APPURL()}});if(r.error)throw r.error;return r.data;},
    async sendCode(email){const r=await sb.auth.signInWithOtp({email,options:{shouldCreateUser:false,emailRedirectTo:APPURL()}});if(r.error)throw r.error;},
    async verify(email,token){const r=await sb.auth.verifyOtp({email,token,type:'email'});if(r.error)throw r.error;return r.data.session;},
    async push(body){try{const r=await sb.functions.invoke('push',{body});return r.data||null;}catch(e){return null;}},
    async aiWorkout(body){const r=await sb.functions.invoke('ai-workout',{body});if(r.error){let c=null;try{c=await r.error.context.json();}catch(e){}throw Object.assign(new Error('ai'),{code:(c&&c.error)||'error'});}return r.data;},
    async routine(cid){const r=await sb.from('routines').select('name,days').eq('client_id',cid).maybeSingle();if(r.error)throw r.error;return r.data;},
    async saveRoutine(cid,name,days,uid){const ex=await sb.from('routines').select('id').eq('client_id',cid).eq('is_template',false).maybeSingle();if(ex.error)throw ex.error;
      const row={name,days,updated_at:new Date().toISOString()};
      if(ex.data){ok(await sb.from('routines').update(row).eq('id',ex.data.id));}else{ok(await sb.from('routines').insert(Object.assign({client_id:cid,is_template:false,created_by:uid},row)));}},
    async templates(){return ok(await sb.from('routines').select('id,name,days,tkind,folder_id').eq('is_template',true).order('name'));},
    async saveTemplate(id,name,days,uid,tkind,folder_id){const row={name,days,updated_at:new Date().toISOString()};if(tkind)row.tkind=tkind;if(folder_id!==undefined)row.folder_id=folder_id;
      if(id){ok(await sb.from('routines').update(row).eq('id',id));return {id};}
      return ok(await sb.from('routines').insert(Object.assign({client_id:null,is_template:true,created_by:uid},row)).select('id').single());},
    async folders(){return ok(await sb.from('routine_folders').select('id,kind,parent_id,name').order('name'));},
    async addFolder(kind,parent_id,name,uid){return ok(await sb.from('routine_folders').insert({kind,parent_id,name,created_by:uid}).select('id,kind,parent_id,name').single());},
    async renameFolder(id,name){ok(await sb.from('routine_folders').update({name}).eq('id',id));},
    async delFolder(id){ok(await sb.from('routine_folders').delete().eq('id',id));},
    async delTemplate(id){ok(await sb.from('routines').delete().eq('id',id));},
    async customEx(){return ok(await sb.from('custom_exercises').select('id,data'));},
    async saveCustomEx(id,data,uid){ok(await sb.from('custom_exercises').upsert({id,data,created_by:uid},{onConflict:'id'}));},
    async delRoutine(cid){ok(await sb.from('routines').delete().eq('client_id',cid).eq('is_template',false));},
    async signOut(){await sb.auth.signOut();},
    async previewBasic(focus,days,level){const r=await sb.rpc('preview_basic_program',{p_focus:focus,p_days:days,p_level:level});if(r.error)throw r.error;return r.data;},
    async assignBasic(focus,days,level,block){const r=await sb.rpc('assign_basic_program',{p_focus:focus,p_days:days,p_level:level,p_block:block||1});if(r.error)throw r.error;return r.data;},
    async accessMine(email){const r=await sb.from('client_access').select('*').eq('email',String(email||'').toLowerCase()).maybeSingle();return r.error?null:r.data;},
    async cancelSub(action){const r=await sb.functions.invoke('whop-cancel',{body:{action}});if(r.error)throw r.error;return r.data;},
    async feedback(kind,reason,comment){const r=await sb.from('client_feedback').insert({kind,reason:reason||null,comment:(comment||'').trim()||null});if(r.error)throw r.error;},
    async feedbackAll(){const r=await sb.from('client_feedback').select('*').order('created_at',{ascending:false}).limit(200);return r.error?[]:(r.data||[]);},
    async checkinSave(period,data,comment){const r=await sb.from('client_feedback').insert({kind:'checkin',period,data,comment:(comment||'').trim()||null});if(r.error&&r.error.code!=='23505')throw r.error;},
    async chkAskMine(){const r=await sb.from('client_data').select('value').eq('client_id',ME.id).eq('key','chkask').maybeSingle();return r&&r.data?r.data.value:null;},
    async chkAskGet(cid){const r=await sb.from('client_data').select('value').eq('client_id',cid).eq('key','chkask').maybeSingle();return r&&r.data?r.data.value:null;},
    async checkinsMine(){const r=await sb.from('client_feedback').select('period').eq('kind','checkin').eq('client_id',ME.id);return r.error?[]:(r.data||[]);},
    async checkinsAll(){const r=await sb.from('client_feedback').select('*').eq('kind','checkin').order('created_at',{ascending:false}).limit(120);return r.error?[]:(r.data||[]);},
    async measuresOf(cid){const r=await sb.from('client_measures').select('*').eq('client_id',cid).order('date',{ascending:true});if(r.error)throw r.error;return r.data||[];},
    async measureSave(row){const r=await sb.from('client_measures').insert(row);if(r.error)throw r.error;},
    async asmList(){const r=await sb.from('assessments').select('id,client_id,ext_name,date,created_at').order('created_at',{ascending:false}).limit(100);if(r.error)throw r.error;return r.data||[];},
    async asmGet(id){const r=await sb.from('assessments').select('*').eq('id',id).single();if(r.error)throw r.error;return r.data;},
    async asmSave(row){const x=Object.assign({},row,{updated_at:new Date().toISOString()});if(x.id){const id=x.id;delete x.id;const r=await sb.from('assessments').update(x).eq('id',id).select('id').single();if(r.error)throw r.error;return r.data.id;}const r=await sb.from('assessments').insert(x).select('id').single();if(r.error)throw r.error;return r.data.id;},
    async asmDel(id){const r=await sb.from('assessments').delete().eq('id',id);if(r.error)throw r.error;},
    async measDoneMine(){const r=await sb.from('client_measures').select('task_id').eq('client_id',ME.id).not('task_id','is',null);if(r.error)throw r.error;return (r.data||[]).map(x=>x.task_id);},
    async measureDel(id){const r=await sb.from('client_measures').delete().eq('id',id);if(r.error)throw r.error;},
    async thumbs(ids){const r=await sb.functions.invoke('yt-thumbs',{body:{ids}});if(r.error)throw r.error;return r.data||{};},
    async accessAll(){const r=await sb.from('client_access').select('*');return r.error?[]:(r.data||[]);},
    async accessOf(cid){const r=await sb.from('client_access').select('*').eq('client_id',cid).maybeSingle();return r.error?null:r.data;},
    async accessSave(row,cid){let email=row.email;if(!email){const q=await sb.rpc('client_email',{p_id:cid});email=q&&q.data;}if(!email)throw new Error('sin correo');
      const full=Object.assign({},row,{email,client_id:cid});const u=await sb.from('client_access').upsert(full,{onConflict:'email'});if(u.error)throw u.error;return full;},
    async setPassword(pw){const r=await sb.auth.updateUser({password:pw});if(r.error)throw r.error;},
    async setEmail(em){const r=await sb.auth.updateUser({email:em});if(r.error)throw r.error;},
    async profile(uid){return ok(await sb.from('profiles').select('*').eq('id',uid).single());},
    async saveProfile(uid,f){ok(await sb.from('profiles').update(f).eq('id',uid));},
    async load(uid){
      const [weights,steps,blobs,chat,photos,calls]=await Promise.all([
        sb.from('weights').select('log_date,kg').eq('client_id',uid).then(ok),
        sb.from('steps').select('log_date,steps').eq('client_id',uid).then(ok),
        sb.from('client_data').select('key,value').eq('client_id',uid).then(ok),
        sb.from('chat_messages').select('id,sender_id,kind,body,created_at').eq('client_id',uid).order('created_at').then(ok),
        sb.from('progress_photos').select('month,angle,storage_path,taken_at').eq('client_id',uid).then(ok),
        sb.from('calls').select('starts_at').eq('client_id',uid).gte('starts_at',new Date(Date.now()-36e5).toISOString()).order('starts_at').limit(1).then(ok)]);
      return {weights,steps,blobs,chat,photos,call:calls[0]||null};
    },
    onChat(cb){try{if(window._chRT)return;window._chRT=sb.channel('erre-chat').on('postgres_changes',{event:'INSERT',schema:'public',table:'chat_messages'},p=>{try{cb(p.new||{});}catch(e){}}).subscribe();}catch(e){console.warn('rt',e);}},
    async chat(uid){return ok(await sb.from('chat_messages').select('id,sender_id,kind,body,created_at').eq('client_id',uid).order('created_at'));},
    async upsert(table,rows,onConflict){ok(await sb.from(table).upsert(rows,{onConflict}));},
    async circuits(){return ok(await sb.from('circuits').select('id,name,cfg').order('name'));},
    async saveCircuit(c){return ok(await sb.from('circuits').upsert({id:c.dbid||undefined,name:c.name,cfg:c,updated_at:new Date().toISOString()}).select('id').single());},
    async delCircuit(id){ok(await sb.from('circuits').delete().eq('id',id));},
    async del(table,match){let q=sb.from(table).delete();for(const k in match)q=q.eq(k,match[k]);ok(await q);},
    async insertChat(row){const r=ok(await sb.from('chat_messages').insert(row).select('id,created_at').single());if(row.kind==='msg'&&PROFILE&&PROFILE.coach_id)pushTo(PROFILE.coach_id,(PROFILE.full_name||'Un cliente')+' te escribió',row.body,'chat-'+row.client_id);return r;},
    async updateChat(id,body){ok(await sb.from('chat_messages').update({body}).eq('id',id));},
    async upload(path,blob){const r=await sb.storage.from('photos').upload(path,blob,{upsert:true,contentType:'image/jpeg'});if(r.error)throw r.error;},
    async remove(paths){const r=await sb.storage.from('photos').remove(paths);if(r.error)throw r.error;},
    async signed(paths){if(!paths.length)return [];return ok(await sb.storage.from('photos').createSignedUrls(paths,3600));},
    async clientDetail(cid){
      const [profile,weights,steps,fb,chat,calls,photos]=await Promise.all([
        sb.from('profiles').select('*').eq('id',cid).single().then(ok),
        sb.from('weights').select('log_date,kg').eq('client_id',cid).order('log_date').then(ok),
        sb.from('steps').select('log_date,steps').eq('client_id',cid).order('log_date').then(ok),
        sb.from('session_feedback').select('log_date,grp,intensity,feel,note,duration_min,skip_reason').eq('client_id',cid).order('log_date',{ascending:false}).limit(20).then(ok),
        sb.from('chat_messages').select('id,sender_id,kind,body,created_at').eq('client_id',cid).order('created_at').then(ok),
        sb.from('calls').select('starts_at').eq('client_id',cid).gte('starts_at',new Date(Date.now()-36e5).toISOString()).order('starts_at').limit(1).then(ok),
        sb.from('progress_photos').select('month,angle,taken_at').eq('client_id',cid).then(ok)]);
      let extra=[];try{extra=ok(await sb.from('client_data').select('key,value').eq('client_id',cid).in('key',['wnotes','sleep','excom','logs','swaps','extras','cardio','cardioX','warmFA','fb','user','tasks','prefs','ctasks','freeOk','prio','alimplan','refw']));}catch(e){}
      const xv=k=>((extra.find(r=>r.key===k)||{}).value)||{};
      const data={};extra.forEach(r=>data[r.key]=r.value);
      return {profile,weights,steps,fb,chat,data,photos,call:calls[0]||null,wnotes:xv('wnotes'),sleep:xv('sleep'),excom:xv('excom')};
    },
    async updateClient(cid,f){ok(await sb.from('profiles').update(f).eq('id',cid));},
    async sendCoach(cid,uid,body){const r=ok(await sb.from('chat_messages').insert({client_id:cid,sender_id:uid,kind:'msg',body}).select('id,created_at').single());pushTo(cid,'Tu coach te escribió',body,'chat');return r;},
    async scheduleCall(cid,uid,iso){ok(await sb.from('calls').delete().eq('client_id',cid).gte('starts_at',new Date().toISOString()));ok(await sb.from('calls').insert({client_id:cid,starts_at:iso,created_by:uid}));},
    async resetClient(cid){ok(await sb.rpc('reset_client_records',{cid}));},
    async resetProfile(cid){ok(await sb.rpc('reset_client_profile',{cid}));},
    async archiveClient(cid,on){ok(await sb.rpc('archive_client',{cid,on_:on}));},
    async deleteClient(cid){ok(await sb.rpc('delete_client',{cid}));},
    async moveTemplate(id,folder_id){ok(await sb.from('routines').update({folder_id:folder_id||null}).eq('id',id));},
    async moveFolder(id,parent_id){ok(await sb.from('routine_folders').update({parent_id:parent_id||null}).eq('id',id));},
    async clientsMeta(){const r=await sb.from('routines').select('client_id,name,days,updated_at').eq('is_template',false);const f=await sb.from('session_feedback').select('client_id,log_date').order('log_date',{ascending:false}).limit(800);const h=await sb.from('chat_messages').select('client_id,body,created_at').eq('kind','hito').order('created_at',{ascending:false}).limit(200);const m={rt:{},last:{},hito:{}};(h.data||[]).forEach(x=>{if(!m.hito[x.client_id])m.hito[x.client_id]={at:x.created_at,body:x.body};});(r.data||[]).forEach(x=>{if(x.client_id)m.rt[x.client_id]={name:x.name,n:(x.days||[]).length,at:x.updated_at};});(f.data||[]).forEach(x=>{if(!m.last[x.client_id])m.last[x.client_id]=x.log_date;});return m;},
    async chatInbox(){return await sb.from('chat_messages').select('client_id,sender_id,body,kind,created_at').order('created_at',{ascending:false}).limit(400).then(ok).catch(()=>[]);},
    async logAct(cid,kind,text){try{const k=(cid||'')+'|'+text,t=Date.now();this._la=this._la||{};if(this._la[k]&&t-this._la[k]<60000)return;this._la[k]=t;await sb.from('coach_activity').insert({client_id:cid||null,kind,text});}catch(e){}},
    async coachAct(){return await sb.from('coach_activity').select('client_id,kind,text,created_at').order('created_at',{ascending:false}).limit(25).then(ok).catch(()=>[]);},
    async homeData(){
      const since=new Date(Date.now()-14*864e5).toISOString().slice(0,10),sf=p=>p.then(ok).catch(()=>[]);
      const [fb,hi,cd,ca,act]=await Promise.all([
        sf(sb.from('session_feedback').select('client_id,log_date,grp,intensity,feel,note,duration_min,skip_reason').gte('log_date',since).order('log_date',{ascending:false}).limit(150)),
        sf(sb.from('chat_messages').select('client_id,body,created_at').eq('kind','hito').order('created_at',{ascending:false}).limit(40)),
        sf(sb.from('client_data').select('client_id,key,value').in('key',['prefs','excom','logs'])),
        sf(sb.from('calls').select('client_id,starts_at').gte('starts_at',new Date().toISOString())),
        DB.coachAct()]);
      return {fb,hi,cd,ca,act};
    },
    async lessons(){return ok(await sb.from('lessons').select('id,title,body,tag,active,created_at').order('created_at'));},
    async saveLesson(o,uid){const row={title:o.title,body:o.body,tag:o.tag,active:o.active!==false};if(o.id)ok(await sb.from('lessons').update(row).eq('id',o.id));else ok(await sb.from('lessons').insert(Object.assign({created_by:uid},row)));},
    async delLesson(id){ok(await sb.from('lessons').delete().eq('id',id));},
    async accessAll(){return ok(await sb.from('client_access').select('client_id,email,tier,period,paid_until,payment_failed_at,cancel_at_period_end,source').not('client_id','is',null));},
    async clientInfo(){const r=await sb.rpc('coach_client_info');if(r.error)throw r.error;const o={};(r.data||[]).forEach(x=>o[x.id]=x);return o;},
    async claimInvite(code){const r=await sb.functions.invoke('claim-invite',{body:{code}});if(r.error)throw r.error;return (r.data||{}).r;},
    async clients(uid){return ok(await sb.from('profiles').select('id,full_name,plan,goal,level,status,birth_date,member_since,created_at').eq('role','client').order('full_name'));}
  };
}
const DB=window.DB_MOCK||realDB();
if(DB.scheduleCall){const _sc=DB.scheduleCall.bind(DB);DB.scheduleCall=async(cid,uid,iso)=>{const r=await _sc(cid,uid,iso);try{const b=bogota(iso);DB.logAct(cid,'call','Agendó llamada 1:1 para el '+b.date+' a las '+b.time);}catch(e){}return r;};}
if(DB.updateClient){const _uc=DB.updateClient.bind(DB);DB.updateClient=async(cid,f)=>{const r=await _uc(cid,f);try{DB.logAct(cid,'cli',f.status==='active'?'Activó la cuenta y asignó el plan':f.plan?'Cambió el plan a '+f.plan:f.modules?'Cambió los módulos del cliente':'Editó datos del cliente');}catch(e){}return r;};}
if(DB.saveRoutine){const _sr=DB.saveRoutine.bind(DB);DB.saveRoutine=async(cid,n,d,uid)=>{const r=await _sr(cid,n,d,uid);try{if(uid&&cid!==uid){pushPlan(cid);DB.logAct(cid,'prog','Actualizó el programa «'+(n||'Programa')+'» ('+(d||[]).length+' workouts)');}}catch(e){}return r;};}
let ME=null,PROFILE=null,LG={step:'email',email:'',err:'',busy:false},CHATT=null;
const APPURL=()=>{try{const u=location.origin+location.pathname.replace(/[^/]*$/,'');return /^https?:/.test(u)?u:undefined;}catch(e){return undefined;}};
const SLICES=['logs','swaps','extras','cardio','cardioX','tasks','warmFA','fb','sum','user','msSeen','lvSeen','wnotes','sleep','fidSeen','excom','ctasks','circuits','lowE','prs','grips','cirColors','freeOn','freeOk','tz','prio','alimplan'];
let HYD=false;/* true solo cuando ya se descargó lo guardado en la nube */
const LAST={weights:{},steps:{},slices:{},prefs:'',fb:{},profile:'',chatKey:{},photos:{},upl:{}};
let needs=false,syncing=false,pend=false,tmr=null;
const R_GRP={g_fuerza:'fuerza',g_cardio:'cardio',g_calm:'calma'};
const R_FEEL={'Con energía':'energia','Bien':'bien','Cansado':'cansado','Con molestia':'molestia'};
const R_FEELR=Object.fromEntries(Object.entries(R_FEEL).map(([a,b])=>[b,a]));
const bogota=iso=>{const d=new Date(new Date(iso).getTime()-5*3600e3);return {date:d.toISOString().slice(0,10),time:d.toISOString().slice(11,16)};};
const planOf=p=>p.plan==='basic'?'basic':'complete';

function profileCols(){
  const u=S.user;if(!u)return null;const f=u.data||{};
  const bd=(f.dd&&f.mm&&f.yy)?`${f.yy}-${String(f.mm).padStart(2,'0')}-${String(f.dd).padStart(2,'0')}`:null;
  return {full_name:u.name||null,sex:u.sex||null,birth_date:bd,height_cm:parseFloat(f.height)||null,start_weight_kg:parseFloat(f.weight)||null,
    goal:['bajar','complete','aumentar','salud'].includes(u.main)?u.main:'complete',level:u.level||null,train_days:u.sched||[],
    injuries:u.pain==='Sí'?(u.painTxt||'Sí'):null,step_goal:S.stepGoal||8000,fc_max:u.fcmax||null};
}
async function pushAll(){
  const uid=ME.id;
  for(const [tbl,col,src] of [['weights','kg',S.weights||{}],['steps','steps',S.steps||{}]]){
    const lastM=LAST[tbl],rows=[];
    for(const d in src)if(lastM[d]!==src[d])rows.push({client_id:uid,log_date:d,[col]:src[d]});
    if(rows.length)await DB.upsert(tbl,rows,'client_id,log_date');
    for(const d in lastM)if(src[d]==null)await DB.del(tbl,{client_id:uid,log_date:d});
    LAST[tbl]=Object.assign({},src);
  }
  const blobs=[];
  for(const k of SLICES){const v=S[k]===undefined?null:S[k],j=JSON.stringify(v);
    if(k==='logs'&&v&&LAST.slices.logs&&j!==LAST.slices.logs){let n0=0;try{n0=Object.keys(JSON.parse(LAST.slices.logs)||{}).length;}catch(x){}
      if(Object.keys(v).length<n0&&!S._logsDel){console.warn('logs: se evitó sobrescribir con menos datos');S.logsGuard=(S.logsGuard||0)+1;continue;}}
    if(v!==null&&j!==LAST.slices[k])blobs.push({client_id:uid,key:k,value:v,updated_at:new Date().toISOString(),_j:j});}
  try{if(window.remMsgMap&&S.role!=='coach'&&S.rem&&S.rem.train&&S.rem.train.on)S.remmsg=window.remMsgMap();}catch(e){}
  const prefs={rem:S.rem,stepGoal:S.stepGoal,chatRead:S.chatRead,start:S.start,remmsg:S.remmsg},pj=JSON.stringify(prefs);
  if(pj!==LAST.prefs)blobs.push({client_id:uid,key:'prefs',value:prefs,updated_at:new Date().toISOString(),_j:pj,_p:1});
  if(blobs.length){await DB.upsert('client_data',blobs.map(({_j,_p,...r})=>r),'client_id,key');blobs.forEach(b=>{if(b._p)LAST.prefs=b._j;else LAST.slices[b.key]=b._j;});S._logsDel=false;}
  const fbs=[];
  for(const fk in S.fb){const [date,,g]=fk.split('|'),e=S.fb[fk],grp=R_GRP[g];if(!grp||!date)continue;
    const row={client_id:uid,log_date:date,grp,intensity:e.rpe||null,feel:R_FEEL[e.feel]||null,note:e.note||null,duration_min:e.dur||null,skip_reason:e.skip||null},j=JSON.stringify(row);
    if(LAST.fb[fk]!==j)fbs.push([fk,row,j]);}
  if(fbs.length){await DB.upsert('session_feedback',fbs.map(x=>x[1]),'client_id,log_date,grp');fbs.forEach(x=>LAST.fb[x[0]]=x[2]);if(fbs.some(x=>x[1].feel==='molestia')&&PROFILE&&PROFILE.coach_id)pushTo(PROFILE.coach_id,'⚠ '+(PROFILE.full_name||'Un cliente')+' reportó una molestia','Revisa su sesión de hoy','mol-'+uid);}
  for(const fk of Object.keys(LAST.fb)){if(S.fb&&S.fb[fk])continue;const [date,,gg]=fk.split('|'),grp=R_GRP[gg];if(grp&&date){await DB.del('session_feedback',{client_id:uid,log_date:date,grp});}delete LAST.fb[fk];}
  const pc=profileCols();if(pc){const j=JSON.stringify(pc);if(j!==LAST.profile){await DB.saveProfile(uid,pc);LAST.profile=j;}}
  for(const m of S.chat){
    if(m.from!=='client')continue;
    const body=m.kind==='session'?JSON.stringify({key:m.key,g:m.g,date:m.date,rpe:m.rpe,feel:m.feel,text:m.text}):m.text,sig=body;
    if(m.kind==='session'&&m.key&&!m.id&&LAST.chatKey[m.key])m.id=LAST.chatKey[m.key];
    if(!m.id){const r=await DB.insertChat({client_id:uid,sender_id:uid,kind:m.kind==='session'?'session':'msg',body});m.id=r.id;m._sig=sig;if(m.key)LAST.chatKey[m.key]=r.id;}
    else if(m._sig!==sig){await DB.updateChat(m.id,body);m._sig=sig;if(m.key)LAST.chatKey[m.key]=m.id;}
  }
  try{if(AV&&LAST.av!==AV){await DB.upsert('client_data',[{client_id:uid,key:'avatar',value:AV,updated_at:new Date().toISOString()}],'client_id,key');LAST.av=AV;}}catch(e){console.warn('avatar',e);}
  store.set('erre_state',S);
}
const SYNC={
  dirty(){if(!ME||!PROFILE||!PROFILE.consent_at||PROFILE.role==='coach')return;clearTimeout(tmr);tmr=setTimeout(SYNC.flush,900);},
  async flush(){
    if(!ME||!PROFILE||!PROFILE.consent_at)return;
    if(PROFILE.role!=='coach'&&!HYD){tmr=setTimeout(SYNC.dirty,1500);return;}
    if(syncing){pend=true;return;}
    syncing=true;
    try{await pushAll();needs=false;}catch(e){console.warn('sync',e);needs=true;setTimeout(()=>{if(needs)SYNC.dirty();},15000);}
    syncing=false;if(pend){pend=false;SYNC.dirty();}
  },
  async photos(){
    if(!ME||!PROFILE||!PROFILE.consent_at||PROFILE.role==='coach')return;
    const uid=ME.id,seen={};
    try{
      for(const m in PH)for(const a of ['front','side','back']){
        const v=PH[m][a];if(!v)continue;const k=m+'|'+a;seen[k]=1;
        if(v.startsWith('data:')&&LAST.upl[k]!==v){
          const blob=await (await fetch(v)).blob(),path=`${uid}/${m}-${a}.jpg`;
          await DB.upload(path,blob);
          await DB.upsert('progress_photos',[{client_id:uid,month:m,angle:a,storage_path:path,taken_at:PH[m].d||today()}],'client_id,month,angle');
          LAST.upl[k]=v;LAST.photos[k]=path;
        }
      }
      for(const k in LAST.photos){if(!seen[k]){const [m,a]=k.split('|');await DB.remove([LAST.photos[k]]);await DB.del('progress_photos',{client_id:uid,month:m,angle:a});delete LAST.photos[k];delete LAST.upl[k];}}
    }catch(e){console.warn('fotos',e);}
  }
};
window.SYNC=SYNC;

function mapChat(rows,uid){
  return rows.map(r=>{const base={id:r.id,from:r.sender_id===uid?'client':'coach',at:Date.parse(r.created_at)};
    if(r.kind==='session'){let p={};try{p=JSON.parse(r.body)}catch(e){}return Object.assign(base,{kind:'session',key:p.key,g:p.g,date:p.date,rpe:p.rpe,feel:p.feel,text:p.text||'',_sig:r.body});}
    if(r.kind==='hito')return Object.assign(base,{kind:'hito',text:r.body||'',_sig:r.body});
    if(r.kind==='call')return Object.assign(base,{kind:'msg',text:r.body||''});
    return Object.assign(base,{kind:'msg',text:r.body||'',_sig:r.body});});
}
function mergeChat(rows){
  const rem=mapChat(rows,ME.id);rem.forEach(m=>{if(m.key)LAST.chatKey[m.key]=m.id;});
  const ids=new Set(rem.map(m=>m.id));
  const local=S.chat.filter(m=>!m.id||(!ids.has(m.id)&&m.from==='client'&&false));
  S.chat=rem.concat(local);
}
async function pullChat(){
  if(!ME||PROFILE.role==='coach')return;
  try{const rows=await DB.chat(ME.id),before=S.chat.length;mergeChat(rows);
    if(S.chat.length!==before||S.chatOpen){ if(!S.profile&&!(S.ob&&S.user==null))render(); }
  }catch(e){console.warn('chat',e);}
}
async function applyRemote(d){
  const uid=ME.id;
  S.weights={};d.weights.forEach(r=>S.weights[r.log_date]=+r.kg);LAST.weights=Object.assign({},S.weights);
  S.steps={};d.steps.forEach(r=>S.steps[r.log_date]=r.steps);LAST.steps=Object.assign({},S.steps);
  d.blobs.forEach(b=>{if(SLICES.includes(b.key)){S[b.key]=b.value;LAST.slices[b.key]=JSON.stringify(b.value);}
    else if(b.key==='prefs'){Object.assign(S,b.value);LAST.prefs=JSON.stringify({rem:S.rem,stepGoal:S.stepGoal,chatRead:S.chatRead,start:S.start,remmsg:S.remmsg});}});
  cxSync();
  mergeChat(d.chat);
  if(d.call){const c=bogota(d.call.starts_at);S.call={date:c.date,time:c.time};}else S.call=null;
  Object.keys(PH).forEach(k=>delete PH[k]);LAST.photos={};LAST.upl={};
  if(d.photos.length){
    try{const urls=await DB.signed(d.photos.map(p=>p.storage_path));
      d.photos.forEach((p,i)=>{const u=urls[i]&&(urls[i].signedUrl||urls[i].signedURL);if(!u)return;(PH[p.month]=PH[p.month]||{d:p.taken_at})[p.angle]=u;LAST.photos[p.month+'|'+p.angle]=p.storage_path;});
    }catch(e){console.warn('fotos',e);}
  }
  store.set('erre_photos',PH,true);
  S.fb&&Object.keys(S.fb).forEach(fk=>{const [date,,g]=fk.split('|'),e=S.fb[fk];if(R_GRP[g])LAST.fb[fk]=JSON.stringify({client_id:uid,log_date:date,grp:R_GRP[g],intensity:e.rpe||null,feel:R_FEEL[e.feel]||null,note:e.note||null,duration_min:e.dur||null,skip_reason:e.skip||null});});
  const pc=profileCols();if(pc)LAST.profile=JSON.stringify(pc);
  try{const av=d.blobs.find(b=>b.key==='avatar');if(av&&typeof av.value==='string'&&av.value){AV=av.value;LAST.av=AV;store.set('erre_avatar',AV);}}catch(e){}
  HYD=true;
}
function resetLocal(){
  Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,defaultsS());S.sel=today();S.off=0;
  Object.keys(PH).forEach(k=>delete PH[k]);AV=null;store.set('erre_avatar',null);HYD=false;
  for(const k in LAST)LAST[k]=(k==='prefs'||k==='profile')?'':{};
}

/* ---------- pantallas: acceso, consentimiento, coach ---------- */
function verTag(){const v=String(typeof APP_VER==='string'?APP_VER:'').match(/^(\d+)([a-z]+)-(\d\d)(\d\d)$/);return 'Beta'+(v?' '+(+v[1])+' '+v[2]+' '+v[3]+':'+v[4]:'');}
function authHead(){return `<header class="top">${logo('#C0392B')}<div class="who"><h1 style="font-size:16px">ERRE Complete</h1><small>Método Complete · ${verTag()}</small></div></header>`;}
const PLAN_INFO={
 basic:{n:'Basic',ic:'🌱',c:'#5A554E',p:'Desde $24 USD al mes · precio fundador',t:'Entrena solo, con un programa claro por niveles',b:['Método Complete: movilidad, fuerza, resistencia y dominio','Programa por nivel (principiante, intermedio, avanzado)','Mesociclos de 5 semanas, hasta 5 días de fuerza','Videos de cada ejercicio dentro de la app','Reporte semanal para ti']},
 complete:{n:'Complete',ic:'🏋',c:'#C0392B',p:'Fundador $400 USD · trimestre · cupos limitados',t:'Tu coach arma y ajusta tu programa a tu medida',b:['Todo lo de Basic, pero a tu medida (ejercicios, series y cargas)','Mesociclos de 6 semanas, sin límite de días','Chat directo con tu coach','Peso de referencia por ejercicio y ajustes según cómo te sientas','Tu coach comenta tus fotos y recibe tu reporte semanal','Llamada 1:1 cada ~45 días']},
 elite:{n:'Elite',ic:'👑',c:'#C9A24B',p:'$1.000 USD por trimestre',t:'Complete con más acompañamiento directo',b:['Todo lo de Complete','Llamada 1:1 cada 30 días','Check-ins más frecuentes con tu coach','Ajuste de carga dentro de la semana']}
};
const PLAN_ROWS=[['Método Complete (movilidad, fuerza, resistencia, dominio)','✓','✓','✓'],['Programa','Por nivel','A tu medida','A tu medida'],['Mesociclo','5 sem.','6 sem.','6 sem.'],['Días de fuerza','Hasta 5','Sin límite','Sin límite'],['sec','Con tu coach'],['Chat con tu coach','—','✓','✓'],['Peso de referencia por ejercicio','—','✓','✓'],['Ajustes según cómo te sientas','—','✓','✓'],['Tu coach comenta tus fotos','—','✓','✓'],['Reporte semanal','Para ti','A tu coach','A tu coach'],['Llamada 1:1','—','~45 días','30 días'],['sec','Acompañamiento cercano'],['Check-ins más frecuentes','—','—','✓'],['Ajuste de carga dentro de la semana','—','—','✓']];
const WHOP_BASIC='https://whop.com/checkout/plan_mpQgoOUlluRcm/';/* fundador mensual 24 USD, 7 días gratis */
const WHOP_X={bq:'https://whop.com/checkout/plan_qez8510VLKC5m/',ba:'https://whop.com/checkout/plan_UFkt7Kpxw3Nv8/',cf:'https://whop.com/checkout/plan_9RYmmxPLjDoKm/',cu:'https://whop.com/checkout/plan_DeF9YNmLVx71x/',cc:'https://whop.com/checkout/plan_BiwypNHNxy9gT/'};
const PLAN_EXTRA={basic:[['Mensual · Fundador','$24 USD/mes · 17% menos · 7 días gratis',WHOP_BASIC],['Trimestral · Fundador','$65 USD · ≈$21,7/mes · 25% menos',WHOP_X.bq],['Anual · Fundador','$189 USD · ≈$15,8/mes · 46% menos',WHOP_X.ba]],complete:[['Complete Fundador · cupos limitados','$400 USD pago único · 20% menos',WHOP_X.cf],['En 3 cuotas','3 pagos de $167 USD',WHOP_X.cc],['Pago único','$500 USD',WHOP_X.cu]]};
const planBtns=(k,msg)=>{const x=PLAN_EXTRA[k]||[];const b=x.map((o,i)=>`<a class="plcta" style="margin-top:8px;display:block;text-align:center;${i?'background:#fff;color:var(--ink,#1C1B19);border:1.5px solid #C0392B':''}" href="${o[2]}" target="_blank" rel="noopener"><b>${o[0]}</b><br><small style="opacity:.85;font-weight:500">${o[1]}</small></a>`).join('');return k==='basic'?b:b+`<a class="plcta" style="margin-top:8px;display:block;text-align:center;background:#fff;color:var(--ink,#1C1B19);border:1.5px solid var(--line)" href="${planLink(k,msg)}" target="_blank" rel="noopener">Desde Colombia o dudas · WhatsApp</a>`;};
const WHOP_RENEW='https://whop.com/checkout/plan_ygvmYETt0jzAZ';/* renovar: sin prueba */
const planLink=(k,msg)=>k==='basic'?WHOP_BASIC:`https://wa.me/${COACH_WA}?text=${encodeURIComponent(msg)}`;
function plansPublic(){
  const card=k=>{const p=PLAN_INFO[k],msg=`Hola Juanjo, quiero información del plan ${p.n} de ERRE.`;
    return `<details class="plbtn" style="--pc:${p.c}"><summary><span class="plic">${p.ic}</span><span class="plt"><b>${p.n}</b><small>${p.t}</small></span><span class="plp">${p.p}</span></summary>
      <ul>${p.b.map(x=>`<li>${x}</li>`).join('')}</ul>
      ${PLAN_EXTRA[k]?planBtns(k,msg):`<a class="btn solid plgo" href="${planLink(k,msg)}" target="_blank" rel="noopener">Quiero ${p.n}</a>`}</details>`;};
  const body=PLAN_ROWS.map(r=>r[0]==='sec'?`<tr class="srow"><td colspan="4">${r[1]}</td></tr>`:`<tr><td>${r[0]}</td>${[1,2,3].map(i=>`<td class="${r[i]==='—'?'':'y'}${i===3?' eg':''}">${r[i]}</td>`).join('')}</tr>`).join('');
  return `<details class="plall"><summary><span><b>💳 Elige tu membresía</b><small>Mira qué incluye cada plan y sus precios</small></span><i>▾</i></summary>
    ${['basic','complete','elite'].map(card).join('')}
    <details class="plcmp"><summary>¿No sabes cuál elegir? Compara los planes</summary>
      <table class="cmpt"><thead><tr><th></th><th><b>Basic</b><small>$29<br>al mes</small></th><th><b>Complete</b><small>$500<br>trimestre</small></th><th class="eg"><b>Elite</b><small>$1.000<br>trimestre</small></th></tr></thead><tbody>${body}</tbody></table>
      <div class="note">El mismo Método Complete en todos. Cambia el nivel de acompañamiento.</div></details>
  </details>`;
}
function loginView(){
  const _inv=(()=>{try{return !!localStorage.getItem('erre_inv');}catch(e){return false;}})();
  if(_inv&&!LG._invSet){LG._invSet=true;if(!LG.mode)LG.mode='signup';}
  const h=loginView0();
  return _inv&&LG.mode!=='forgot'&&LG.mode!=='code'?h.replace('</header>','</header><div class="invbn"><span>Invitación de Juanjo</span><b>Tu plan Complete se diseña a mano para ti</b><small>Crea tu cuenta y llena tu registro. Tu coach prepara tu rutina.</small></div>'):h;
}
function loginView0(){
  const e=LG.err?`<div class="note" style="border-color:var(--red);color:var(--red-strong)">${LG.err}</div>`:'',ok=LG.ok?`<div class="note" style="border-color:#2E9D6B;color:#1F7A52">${LG.ok}</div>`:'';
  const bar=typeof pwaBar==='function'?pwaBar():'';
  if(LG.mode==='forgot')return authHead()+bar+`<button class="lblbtn" data-act="lgback" style="color:var(--gray);margin:10px 0 0">‹ Volver</button><h2 class="h2" style="margin-top:6px">¿Olvidaste tu contraseña?</h2><p class="lead">Escribe tu correo y te enviamos un código para entrar.</p>${e}${ok}
    <label class="pfl">Correo</label><input class="fld" id="lgEmail" type="email" inputmode="email" autocomplete="username" placeholder="tu@correo.com" value="${LG.email}">
    <button class="btn solid" data-act="lgcode" style="width:100%;padding:14px;margin-top:14px"${LG.busy?' disabled':''}>${LG.busy?'Enviando…':'Enviarme el código'}</button>`;
  if(LG.mode==='code')return authHead()+bar+`<button class="lblbtn" data-act="lgback" style="color:var(--gray);margin:10px 0 0">‹ Volver</button><h2 class="h2" style="margin-top:6px">Escribe tu código</h2><p class="lead">Te lo enviamos a <b>${esc(LG.email)}</b>. Revisa también spam. Cuando entres, cambia tu contraseña en Perfil → Mi cuenta.</p>${e}${ok}
    <input class="fld" id="lgCode" inputmode="numeric" autocomplete="one-time-code" maxlength="8" placeholder="Código" style="font-size:22px;letter-spacing:.2em;text-align:center">
    <button class="btn solid" data-act="lgverify" style="width:100%;padding:14px;margin-top:14px"${LG.busy?' disabled':''}>${LG.busy?'Entrando…':'Entrar'}</button>`;
  if(LG.mode==='signup')return authHead()+bar+`<button class="lblbtn" data-act="lgback" style="color:var(--gray);margin:10px 0 0">‹ Volver</button><h2 class="h2" style="margin-top:6px">Crear cuenta</h2><p class="lead">${(()=>{try{return localStorage.getItem('erre_inv')?'Tu coach activa tu plan Complete apenas termines.':'Empiezas con el plan Basic. Tu coach activa tu cuenta y te asigna tu plan.';}catch(e){return '';}})()}</p>${e}${ok}
    <label class="pfl">Nombre</label><input class="fld" id="lgName" autocomplete="name" placeholder="Tu nombre" value="${esc(LG.name||'')}">
    <label class="pfl" style="margin-top:10px">Correo</label><input class="fld" id="lgEmail" type="email" inputmode="email" autocomplete="username" placeholder="tu@correo.com" value="${LG.email}">
    <label class="pfl" style="margin-top:10px">Contraseña (mínimo 6)</label><div class="pweye"><input class="fld" id="lgPass" type="password" autocomplete="new-password" placeholder="Crea una contraseña"><button type="button" class="eyeb" data-act="lgeye" aria-label="Ver contraseña">👁</button></div>
    <label class="pfl" style="margin-top:10px">Repite la contraseña</label><div class="pweye"><input class="fld" id="lgPass2" type="password" autocomplete="new-password" placeholder="Escríbela otra vez"><button type="button" class="eyeb" data-act="lgeye" aria-label="Ver contraseña">👁</button></div>
    <button class="btn solid" data-act="lgsignup" style="width:100%;padding:14px;margin-top:14px"${LG.busy?' disabled':''}>${LG.busy?'Creando…':'Crear mi cuenta'}</button>`;
  return authHead()+bar+`<h2 class="h2" style="margin-top:14px">Entra a tu cuenta</h2><p class="lead">Escribe tu correo y tu contraseña.</p>${e}${ok}
    <label class="pfl">Correo</label><input class="fld" id="lgEmail" type="email" inputmode="email" autocomplete="username" placeholder="tu@correo.com" value="${LG.email}">
    <label class="pfl" style="margin-top:10px">Contraseña</label><div class="pweye"><input class="fld" id="lgPass" type="password" autocomplete="current-password" placeholder="Tu contraseña"><button type="button" class="eyeb" data-act="lgeye" aria-label="Ver contraseña">👁</button></div>
    <button class="btn solid" data-act="lgsend" style="width:100%;padding:14px;margin-top:14px"${LG.busy?' disabled':''}>${LG.busy?'Entrando…':'Entrar'}</button>
    <button class="lblbtn" data-act="lgforgot" style="display:block;margin:12px auto 0;color:var(--gray)">¿Olvidaste tu contraseña?</button>
    <div class="plwrap"><div class="pltitle">¿Aún no tienes cuenta?</div><button class="btn solid" data-act="lgsignmode" style="width:100%;padding:14px;margin:4px 0 12px">Crear cuenta</button>${plansPublic()}<div class="foot" style="margin-top:10px">Te registras y tu coach activa tu plan.</div></div>`;
}
function showLogin(){$('#app').innerHTML=loginView();}
function pendingView(){
  const nm=esc((PROFILE.full_name||'').split(' ')[0]||'');
  const msg=encodeURIComponent('Hola Juanjo, acabo de crear mi cuenta en la app ('+(ME.email||'')+'). ¿Me activas?');
  return authHead()+`<h2 class="h2" style="margin-top:14px">¡Listo${nm?', '+nm:''}! Tu registro quedó completo</h2><p class="lead">Ya llenaste todo. Solo falta que tu coach active tu cuenta y te asigne tu plan; en cuanto lo haga, entras a tu programa.</p>
    ${plansPublic('pend')}
    <a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:14px;text-decoration:none" href="https://wa.me/${COACH_WA}?text=${msg}" target="_blank" rel="noopener">Avisarle a mi coach</a>
    <button class="btn" data-act="pendchk" style="width:100%;padding:14px;margin-top:10px">Ya me activaron: revisar</button>
    <button class="lblbtn" data-act="pendout" style="display:block;margin:12px auto 0;color:var(--gray)">Cerrar sesión</button>`;
}
(function(){const st=document.createElement('style');st.textContent=`
.plhero{border:2px solid var(--red-strong,#C0392B);border-radius:20px;padding:20px 16px 16px;margin:14px 0 12px;background:linear-gradient(180deg,var(--red-tint,#FBEDEA),var(--card,#fff));text-align:center}
.plbadge{display:inline-block;background:var(--red-strong,#C0392B);color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:99px}
.plhn{display:block;font-family:'Archivo';font-stretch:125%;font-size:22px;text-transform:uppercase;margin-top:10px}
.plpr{font-size:42px;font-weight:800;line-height:1.1;margin-top:4px}.plpr em{font-size:16px;font-weight:500;color:var(--gray);font-style:normal;margin-left:2px}
.plfree{font-weight:700;color:var(--red-strong,#C0392B);margin-top:2px}.plsub{color:var(--gray);font-size:14px;margin:8px 0 4px}
.plhero ul{text-align:left;margin:10px 4px 6px;padding-left:20px;font-size:14px}.plhero li{margin:4px 0}
details.plmore{margin:6px 0 4px}details.plmore>summary{cursor:pointer;color:var(--gray);font-size:14px;text-align:center;padding:10px;list-style:none;text-decoration:underline}
details.plmore>summary::-webkit-details-marker{display:none}`;document.head.appendChild(st);})();
function consentView(){
  return authHead()+`<h2 class="h2" style="margin-top:14px">Tu información, protegida</h2>
   <p class="lead">ERRE Complete guarda tus datos de entrenamiento, tu peso, tus fotos de progreso y tus mensajes de forma privada. Solo tú y tu coach pueden verlos.</p>
   <section class="sec"><div class="pfrow"><span><b>Qué guardamos</b><small>Datos personales, peso, pasos, entrenamientos, feedback, fotos y chat con tu coach.</small></span></div>
   <div class="pfrow"><span><b>Para qué</b><small>Armar y ajustar tu programa y hacerte seguimiento.</small></span></div>
   <div class="pfrow"><span><b>Tus derechos</b><small>Puedes pedir ver, corregir o eliminar tus datos cuando quieras escribiéndole a tu coach.</small></span></div></section>
   <label class="pfrow" style="gap:12px;cursor:pointer"><input type="checkbox" id="cons" style="width:22px;height:22px;flex:none"><span style="font-size:14px">Acepto el tratamiento de mis datos personales y de salud, y de mis fotos de progreso, para este fin.</span></label>
   <div class="foot">Texto provisional: la política de privacidad completa se publicará antes del lanzamiento.</div>
   <button class="btn solid" data-act="consent" style="width:100%;padding:14px;margin-top:8px">Aceptar y continuar</button>`;
}

/* ---------- Panel del coach ---------- */
const CP={view:'list',sec:'inicio',home:null,q:'',pf:'todos',meta:{rt:{},last:{}},cid:null,tab:'rutina',d:null,clients:[],err:'',poll:null};
const PNAME={basic:'Basic',complete:'Complete',elite:'Elite'};
const GRN={fuerza:'Fuerza',cardio:'Cardio',calma:'Vuelta a la calma'};
function sparkOf(L,W=260,H=44){
  if(L.length<2)return '';const mn=Math.min(...L),mx=Math.max(...L),rg=Math.max(.6,mx-mn),pad=5;
  const pts=L.map((v,i)=>[pad+i*(W-2*pad)/(L.length-1),H-pad-(v-mn)/rg*(H-2*pad)]),lp=pts[pts.length-1];
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" aria-hidden="true"><path d="${pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' ')}" fill="none" stroke="#1C1B19" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/><circle cx="${lp[0]}" cy="${lp[1]}" r="5" fill="#C0392B"/></svg>`;
}
const esc=t=>String(t==null?'':t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const modOn=k=>(S.mods||[]).includes(k);
const tabsOn=()=>['inicio','entrenar'].concat(['alim','habitos','recovery'].filter(modOn),['progreso']);
function homeWrap(h){
  const i=h.indexOf('<div class="mini2">'),j=h.indexOf('<h2 class="h2">');
  if(i>j&&j>0){const k=h.indexOf('<h2 class="h2" style="margin-top:18px">Opcional'),e=k>i?k:h.length;
    h=h.slice(0,j)+'<div class="prio">Lo primero de hoy</div>'+h.slice(i,e)+h.slice(j,i)+h.slice(e);}
  if(!['recovery','habitos','alim'].some(modOn))h=h.replace('Mientras, puedes ir con tu respiración, hábitos y alimentación.','Mientras, puedes registrar tu peso y tus pasos.');
  return h;
}
function cardioWrap(h,d){
  const tail='</div></div></section>',zi=h.indexOf('</em></div></div>');if(zi<0)return h;const k=zi+'</em></div></div>'.length;
  let inner=h.slice(k,h.lastIndexOf(tail)),log='';const m=inner.match(/<div class="setwrap[^>]*>[\s\S]*?<\/button><\/div><\/div>/);
  if(m){log=m[0];inner=inner.replace(log,'');}
  const open=!!S.exp['cardio.det'];
  return h.slice(0,k)+log+cirEntry(d)+`<button class="cdet" data-act="exp" data-k="cardio.det">${open?'Ocultar detalles del cardio':'Ver detalles del cardio'} <i>${open?'⌃':'⌄'}</i></button>`+(open?`<div class="cdetb">${inner}</div>`:'')+h.slice(h.lastIndexOf(tail));
}
const cpW=()=>window.innerWidth>=1000;
const cpWideNow=()=>!!CP.wide;
function cpWideCls(el){el.classList.toggle('cpwide',cpW());el.style.maxWidth=(cpWideNow()&&CP.view==='client'&&cpW())?'none':'';}
function cpShell(inner){
  const nav=[['inicio','Inicio'],['clientes','Clientes'],['chat','Chat'],['lecc','Lecciones'],['editor','Programas y workouts'],['qp','Plan de comidas externo'],['vl','Valoración inicial'],['pagos','Suscripciones']].map(([k,n])=>k==='qp'?`<button class="cpn" data-act="qpopen">${n}</button>`:k==='vl'?`<button class="cpn" data-act="vlopen">${n}</button>`:`<button class="cpn${CP.sec===k&&(CP.view==='list'||k==='clientes')?' on':''}" data-act="cpnav" data-v="${k}">${n}</button>`).join('');
  return `<div class="cpshell${cpWideNow()&&CP.view==='client'&&cpW()?' cpfull':''}"><aside class="cpside">${authHead().replace('</small>','</small><span class="cpbadge">Panel Coach</span>')}<nav class="cpnav">${nav}</nav><div class="cpfoot"><small>${esc(PROFILE.full_name||'Coach')}</small>${pushCoachBtn()}<button class="lblbtn" data-act="acct">Mi cuenta</button><button class="lblbtn" data-act="newuser">Cerrar sesión</button></div></aside><main class="cpmain">${draftBanner()}${CP.err&&CP.view==='list'?`<div class="note">${CP.err}</div>`:''}${inner}</main></div>`;
}
const dAgo=s=>{if(!s)return '—';const n=Math.floor((Date.now()-new Date(s+'T12:00:00'))/864e5);return n<=0?'Hoy':n===1?'Ayer':'hace '+n+' d';};
const CPDIS_K='erre_cp_dis';
const cpDisGet=()=>{try{return JSON.parse(localStorage.getItem(CPDIS_K)||'{}');}catch(e){return {};}};
const cpDisSet=o=>{try{localStorage.setItem(CPDIS_K,JSON.stringify(o));}catch(e){}};
const cpIni=n=>(n||'?').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
const cpRel=d=>{const n=diffD(today(),d);return n<=0?'Hoy':n===1?'Ayer':'Hace '+n+' d';};
function cpHomeData(){
  const C=(CP.clients||[]).filter(c=>c.status!=='archived'),H=CP.home||{fb:[],hi:[],cd:[],ca:[]},nm={};C.forEach(c=>nm[c.id]=c);const feed=[],al=[],tdy=today(),M=CP.meta||{rt:{},last:{}};
  (H.fb||[]).forEach(f=>{if(!nm[f.client_id])return;const g=GRN[f.grp]||f.grp;feed.push({d:f.log_date,cid:f.client_id,k:f.feel==='molestia'?'mol':'ses',t:'completó '+g,rpe:f.intensity,feel:R_FEELR[f.feel]||f.feel,q:[f.note,f.skip_reason?'No hizo todo: '+f.skip_reason:''].filter(Boolean).join(' · '),dur:f.duration_min});});
  (H.hi||[]).forEach(h=>{if(!nm[h.client_id])return;feed.push({d:bogota(h.created_at).date,cid:h.client_id,k:'hito',t:(h.body||'').replace(/^Hito logrado:\s*/,'desbloqueó: ')});});
  const prefs={},calls={};(H.cd||[]).forEach(r=>{if(r.key==='prefs')prefs[r.client_id]=r.value||{};else if(r.key==='excom'){const since=addD(tdy,-14);Object.keys(r.value||{}).forEach(id=>(r.value[id]||[]).forEach(c=>{if(nm[r.client_id]&&c.d>=since)feed.push({d:c.d,cid:r.client_id,k:'com',t:'comentó en '+((E[id]||{}).n||id),q:c.t});}));}});
  (H.ca||[]).forEach(c=>calls[c.client_id]=c.starts_at);
  feed.sort((a,b)=>a.d<b.d?1:a.d>b.d?-1:0);
  C.forEach(c=>{
    if(c.status==='pending'){al.push({s:0,k:c.id+'|pend',cid:c.id,t:'Cuenta nueva por activar',q:'Se registró en la app. Ábrela, actívala y elige su plan.'});return;}
    const has=M.rt[c.id]&&M.rt[c.id].n,last=M.last[c.id],coachP=c.plan!=='basic',pf=prefs[c.id]||{};
    if(!has)al.push(c.plan==='complete'?{s:0,k:c.id+'|norut',cid:c.id,t:'Cliente Complete por tu link: arma su rutina',q:'Ya está activo y espera. Revisa su registro y cárgale el programa.'}:{s:0,k:c.id+'|norut',cid:c.id,t:'Sin programa asignado',q:'Asígnale un programa para que pueda entrenar.'});
    else{
      if(last){const n=diffD(tdy,last);if(n>=4)al.push({s:1,k:c.id+'|inact|'+last,cid:c.id,t:'Lleva '+n+' días sin entrenar',q:'Última sesión: '+fdate(last)+'.'});}
      else al.push({s:2,k:c.id+'|nosess',cid:c.id,t:'Aún no registra ninguna sesión',q:'Escríbele para que arranque.'});
    }
    (H.fb||[]).filter(f=>f.client_id===c.id&&f.feel==='molestia'&&f.log_date>=addD(tdy,-7)).slice(0,1).forEach(f=>al.push({s:0,k:c.id+'|mol|'+f.log_date,cid:c.id,t:'Reportó una molestia',q:fdate(f.log_date)+(f.note?' · “'+f.note+'”':'')+' Revisa y ajusta la rutina.'}));
    if(coachP&&has&&pf.start){const P=PERIOD[planOf(c)],raw=Math.floor(diffD(monOf(tdy),pf.start)/7)+1;if(raw>=1){const wk=((raw-1)%P.weeks)+1;if(wk===P.weeks)al.push({s:1,k:c.id+'|meso|'+monOf(tdy),cid:c.id,t:'Última semana del mesociclo',q:'Programa el siguiente antes del domingo.'});}}
    if(coachP&&!calls[c.id])al.push({s:2,k:c.id+'|call',cid:c.id,t:'Sin llamada 1:1 agendada',q:'Agéndala en su ficha, pestaña Hoy.'});
  });
  al.sort((a,b)=>a.s-b.s);
  const dis=cpDisGet(),hid=al.filter(a=>dis[a.k]);
  return {feed:feed.slice(0,6),al:al.filter(a=>!dis[a.k]),nm,nh:hid.length,hid};
}
/* Mi actividad como coach: se lee en 2.ª persona («Cambiaste los módulos»), y las repeticiones seguidas se juntan */
const CP_ACT_V={'Eliminó':'Eliminaste','Cambió':'Cambiaste','Activó':'Activaste','Asignó':'Asignaste','Quitó':'Quitaste','Editó':'Editaste','Actualizó':'Actualizaste','Agendó':'Agendaste','Archivó':'Archivaste','Restauró':'Restauraste','Reinició':'Reiniciaste','Creó':'Creaste','Guardó':'Guardaste'};
const cpActYou=t=>String(t||'').replace(/^\S+/,m=>CP_ACT_V[m]||m).replace(/ y asignó /,' y asignaste ').replace(/(\d{4})-(\d{2})-(\d{2})/,(m,y,mo,d)=>d+'/'+mo);
function cpActMerge(L){const out=[];(L||[]).forEach(a=>{const q=out[out.length-1];if(q&&q.client_id===a.client_id&&q.text===a.text&&Math.abs(new Date(q.created_at)-new Date(a.created_at))<120000){q.n=(q.n||1)+1;}else out.push(Object.assign({n:1},a));});return out;}
function cpHomePage(){
  const {feed,al,nm,nh,hid}=cpHomeData(),K={ses:'Workout',hito:'Logro',com:'Comentario',mol:'Molestia',chk:'Chequeo'};
  const AK={prog:'Programa',task:'Tarea',call:'Llamada',cli:'Cliente'},act=cpActMerge((CP.home&&CP.home.act)||[]).slice(0,6);
  const ahist=act.length?act.map(a=>{const c=nm[a.client_id]||{},b=bogota(a.created_at),mine=!a.client_id,ini=cpIni(mine?(PROFILE&&PROFILE.full_name)||'Coach':c.full_name),who=mine?'':`<i class="cpfk" style="font-style:normal;background:#F1EEE8;color:var(--ink)">Para: ${esc(c.full_name||'un cliente')}</i>`,tag=`<i class="cpfk" style="font-style:normal;background:#EEF3FB;color:#2A5BA8">${AK[a.kind]||'Acción'}</i>`,inner=`<i class="cpav">${esc(ini)}</i><span><b>${esc(cpActYou(a.text))}${a.n>1?' <small style="display:inline">×'+a.n+'</small>':''}</b><small>${tag}${who}${cpRel(b.date)} · ${b.time}</small></span>`;return mine?`<div class="cpfi" style="cursor:default">${inner}</div>`:`<button class="cpfi" data-act="cpopen" data-id="${a.client_id}">${inner}</button>`;}).join(''):'<div class="note" style="padding:10px 4px">Aquí verás lo que vayas haciendo con tus clientes: programas, tareas, llamadas.</div>';
  const fh=feed.length?feed.map(f=>{const c=nm[f.cid]||{};return `<button class="cpfi" data-act="cpopen" data-id="${f.cid}"><i class="cpav">${esc(cpIni(c.full_name))}</i><span><b>${esc(c.full_name||'Cliente')} <small style="display:inline">${esc(f.t)}</small></b><small><i class="cpfk ${f.k}" style="font-style:normal">${K[f.k]}</i>${f.rpe?'Esfuerzo '+f.rpe+'/10 · ':''}${f.feel?esc(f.feel):''}</small>${f.q?`<span class="cpq">“${esc(f.q)}”</span>`:''}</span><em>${cpRel(f.d)}</em></button>`;}).join(''):'<div class="note">Aún no hay actividad en los últimos 14 días.</div>';
  const ah=al.length?al.slice(0,10).map(a=>{const c=nm[a.cid]||{};return `<div class="cpal ${a.s===0?'warn':a.s===1?'':'info'}"><button class="cpalb" data-act="cpopen" data-id="${a.cid}"><i class="cpav" style="flex:none;width:34px;height:34px;font-size:12px">${esc(cpIni(c.full_name))}</i><span><b>${esc(c.full_name||'Cliente')}</b><b style="font-weight:600;color:${a.s===0?'#C0392B':'inherit'}">${esc(a.t)}</b><small>${esc(a.q)}</small></span></button><button class="cpok" data-act="cpdis" data-k="${esc(a.k)}" title="Marcar como atendida">✓ Atendida</button></div>`;}).join(''):'<div class="note">Todo en orden ✓ Ningún cliente necesita tu atención ahora.</div>';
  const hh=(CP.showDis&&hid&&hid.length)?hid.map(a=>{const c=nm[a.cid]||{};return `<div class="cpal info" style="opacity:.75"><button class="cpalb" data-act="cpopen" data-id="${a.cid}"><i class="cpav" style="flex:none;width:34px;height:34px;font-size:12px">${esc(cpIni(c.full_name))}</i><span><b>${esc(c.full_name||'Cliente')}</b><b style="font-weight:600">${esc(a.t)}</b><small>${esc(a.q)}</small></span></button><button class="cpok" data-act="cpundis" data-k="${esc(a.k)}" title="Volver a pendientes">↺ Aún no la atendí</button></div>`;}).join(''):'';
  return `<div class="cphead"><h2 class="h2" style="margin:0">Inicio</h2><em class="cpcount">${(CP.clients||[]).filter(c=>c.status!=='archived').length} clientes</em></div>
   <div class="cphome"><section class="sec"><div class="sec-h"><b>Necesitan tu atención</b><em>${al.length}</em></div>${ah}${nh?`<button class="lblbtn" data-act="cprestore" style="margin-top:6px">${CP.showDis?'Ocultar':'Ver'} ${nh} atendida${nh>1?'s':''}</button>`:''}${hh}</section>
   <section class="sec"><div class="sec-h"><b>Actividad reciente</b><em>${feed.length}</em></div>${fh}</section>
   <section class="sec"><div class="sec-h"><b>Mi actividad como coach</b><em>${act.length}</em></div>${ahist}</section></div>`;
}
function cpGripsSec(d){try{
  const bl=(d.blobs||[]).find(x=>x.key==='grips'),G=(bl&&bl.value)||{};const L=[];
  Object.keys(G).forEach(id=>{const x=(typeof E!=='undefined'&&E[id])||null;const c=G[id]||{};const parts=[];
    ['g','w','f'].forEach(t=>{if(c[t]){const o=(GRIPS[t]||[]).find(q=>q[0]===c[t]);if(o)parts.push((t==='g'?'Agarre ':t==='w'?'Ancho de agarre: ':'Pies: ')+o[1].toLowerCase());}});
    if(parts.length)L.push(`<div class="cpgr"><b>${esc(x?x.n:id)}</b><small>${parts.join(' · ')}</small></div>`);});
  return `<section class="sec"><div class="sec-h"><b>Agarres y posturas</b><em>${L.length}</em></div>${L.length?L.join(''):'<div class="note">Aún no ha elegido agarres ni posturas.</div>'}</section>`;
}catch(e){return '';}}
async function cpInboxLoad(){try{CP.inbox=await DB.chatInbox();}catch(e){CP.inbox=[];}try{badgeCalc();}catch(e){}if(CP.view==='list'&&CP.sec==='chat')coachRender();}
function cpChatPage(){
  const last={};(CP.inbox||[]).forEach(m=>{if(m.client_id&&!last[m.client_id])last[m.client_id]=m;});
  const rd=id=>{try{return +localStorage.getItem('cpread_'+id)||0;}catch(e){return 0;}};
  const L=(CP.clients||[]).map(c=>({c,m:last[c.id]})).sort((a,b)=>(b.m?new Date(b.m.created_at):0)-(a.m?new Date(a.m.created_at):0));
  const row=({c,m})=>{const un=m&&m.sender_id===c.id&&m.kind!=='hito'&&new Date(m.created_at).getTime()>rd(c.id);const b=m?bogota(m.created_at):null;
    const txt=m?(m.sender_id===c.id?'':'Tú: ')+String(m.body||'').replace(/\s+/g,' ').slice(0,70):'Sin mensajes aún';
    return `<button class="cpfi" data-act="cpchat" data-id="${c.id}"><i class="cpav">${esc(cpIni(c.full_name))}</i><span><b>${esc(c.full_name||'Cliente')}${un?' <small style="display:inline;color:var(--red-strong)">● nuevo</small>':''}</b><small style="${un?'font-weight:700;color:var(--ink)':''}">${esc(txt)}</small></span><small style="flex:none">${b?b.date.slice(5)+' '+b.time:''}</small></button>`;};
  return `<div class="cphead"><h2 class="h2">Chat</h2></div>${CP.inbox?'':'<div class="note">Cargando…</div>'}<div class="cpfeed">${L.length?L.map(row).join(''):'<div class="note">Aún no tienes clientes.</div>'}</div>`;
}
const REGL={quick:['Registro rápido','#B87400'],full:['Registro completo','#1F8F53']};
function regTag(i,c){if(c&&c.status==='pending')return '';const r=REGL[i.reg];return r?`<em class="cpreg" style="color:${r[1]};border-color:${r[1]}">${r[0]}</em>`:'<em class="cpreg">Sin registro</em>';}
function cpClientsPage(){
  const q=nrm(CP.q),m=CP.meta,all=CP.clients;
  const cl=all.filter(c=>(CP.pf==='arch'?c.status==='archived':(c.status!=='archived'&&(CP.pf==='todos'||c.plan===CP.pf)))&&(!q||nrm((c.full_name||'')+' '+(c.level||'')+' '+((CP.info&&CP.info[c.id]||{}).email||'')).includes(q)));
  const cnt=k=>k==='arch'?all.filter(c=>c.status==='archived').length:k==='todos'?all.filter(c=>c.status!=='archived').length:all.filter(c=>c.status!=='archived'&&c.plan===k).length;
  return `<div class="cphead"><h2 class="h2" style="margin:0">Clientes</h2><em class="cpcount">${cnt('todos')}</em></div>
   <div class="cptabs">${['todos','basic','complete','elite'].concat(['arch']).map(k=>`<button class="cptab${CP.pf===k?' on':''}" data-act="cppf" data-v="${k}">${k==='todos'?'Todos':k==='arch'?'Archivados':PNAME[k]} <em>${cnt(k)}</em></button>`).join('')}</div>
   <input class="fld" id="cpQ" placeholder="Buscar cliente…" value="${esc(CP.q)}" autocomplete="off" style="margin:10px 0">
   ${cl.length?`<div class="cptable"><div class="cptr head"><span>Cliente</span><span>Plan</span><span>Nivel</span><span>Programa</span><span>Última sesión</span></div>${cl.map(c=>{const r=m.rt[c.id],ini=(c.full_name||'?').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();return `<div class="cptr cprow"><span class="cpcl" data-act="cpopen" data-id="${c.id}" style="cursor:pointer"><i class="cpav">${esc(ini)}</i><span class="cpnm"><b>${esc(c.full_name||'Sin nombre')}</b><small class="cpem">${esc(((CP.info&&CP.info[c.id])||{}).email||'')}</small>${regTag((CP.info&&CP.info[c.id])||{},c)}</span>${(m.hito&&m.hito[c.id]&&Date.now()-Date.parse(m.hito[c.id].at)<864e5*3)?`<em class="cphito" title="${esc(m.hito[c.id].body)}">🏆</em>`:''}</span><span><em class="cpbadge ${c.plan}">${PNAME[c.plan]||c.plan}</em>${c.status==='pending'?' <em class="cpwarn">Pendiente</em>':''}${c.status==='archived'?' <em class="cpwarn">Archivado</em>':''}${c.status==='pending'?`<small style="display:block;color:var(--gray);font-size:11px;margin-top:3px">Se registró ${c.created_at?fdate(bogota(c.created_at).date):'—'}</small>`:`<small style="display:block;color:var(--gray);font-size:11px;margin-top:3px">Activo desde ${(c.member_since||c.created_at)?fdate(c.member_since||bogota(c.created_at).date):'—'}</small>`}</span><span>${esc(c.level||'—')}</span><span>${r?`${r.n} ${r.n===1?'día':'días'}`:'<em class="cpwarn">Sin programa</em>'}</span><span>${dAgo(m.last[c.id])}</span><button class="cpkb" data-act="cpmenu" data-id="${c.id}" aria-label="Más acciones">⋮</button></div>`;}).join('')}</div>`:'<div class="note">No hay clientes con ese filtro.</div>'}`;
}
async function coachLive(m){try{
  if(CP.sec==='chat'&&CP.view==='list'){cpInboxLoad();}else{DB.chatInbox().then(r=>{CP.inbox=r;badgeCalc();}).catch(()=>{});}
  if(CP.view==='client'&&CP.tab==='chat'&&m&&m.client_id===CP.cid&&!(typeof RT!=='undefined'&&RT.open)){CP.d=await DB.clientDetail(CP.cid);coachRender(true);}
}catch(e){}}
async function coachHome(){try{if(DB.onChat)DB.onChat(coachLive);}catch(e){}CP.view='list';coachRender();try{DB.chatInbox().then(r=>{CP.inbox=r;badgeCalc();}).catch(()=>{});}catch(e){}try{CP.clients=await DB.clients(ME.id);}catch(e){console.warn(e);CP.err='No pudimos cargar tus clientes.';}try{CP.meta=await DB.clientsMeta();}catch(e){console.warn(e);}try{CP.info=await DB.clientInfo();}catch(e){console.warn('info',e);}try{CP.home=await DB.homeData();}catch(e){console.warn('home',e);}try{await rtLoadTpls();}catch(e){}coachRender();}
async function coachOpen(id,tab){
  CP.view='client';CP.cid=id;CP.tab=tab||'hoy';CP.cd=null;CP.d=null;CP.routine=null;CP.pwx=[];CP.pwq='';coachRender();
  try{await rtLoadTpls();CP.routine=await DB.routine(id);}catch(e){console.warn(e);}
  try{CP.d=await DB.clientDetail(id);}catch(e){console.warn(e);CP.err='No pudimos cargar al cliente.';}
  coachRender();clearInterval(CP.poll);CP.poll=setInterval(async()=>{if(CP.view==='client'&&(CP.tab==='chat'||CP.tab==='plan')&&document.visibilityState==='visible'&&!(typeof RT!=='undefined'&&RT.open)){try{CP.d=await DB.clientDetail(CP.cid);coachRender(true);}catch(e){}}},20000);
}
function coachRender(keepInput){
  if(keepInput&&typeof RT!=='undefined'&&RT.open)return;
  const el=document.getElementById('app'),keep=keepInput&&document.getElementById('cpIn')?document.getElementById('cpIn').value:'';
  if(CP.view==='list'){
    const body=CP.sec==='lecc'?cpLessonsPage():CP.sec==='editor'?rtTplList():CP.sec==='inicio'?cpHomePage():CP.sec==='chat'?cpChatPage():CP.sec==='pagos'?cpPagosPage():cpClientsPage();
    el.innerHTML=cpShell(body);cpWideCls(el);const qi=document.getElementById('cpQ');if(qi&&CP.sec==='clientes'&&keepInput){qi.focus();qi.setSelectionRange(qi.value.length,qi.value.length);}return;
  }
  if(CP.tab==='llamada'||CP.tab==='arch'||!CP.tab)CP.tab='hoy';
  const d=CP.d,SB=[['hoy','🏠','Hoy'],['plan','🏋','Entreno'],['alim','🍽','Nutrición'],['evol','📈','Progreso'],['chat','💬','Chat'],['resumen','⚙️','Ajustes']],tabs=SB.map(x=>x[0]),TL=Object.fromEntries(SB.map(x=>[x[0],x[2]]));
  const nm=d?esc(d.profile.full_name||'Cliente'):'Cargando…';
  let body='<p class="lead">Cargando…</p>';
  if(d){
    const p=d.profile;
    if(CP.tab==='resumen'||CP.tab==='evol'){
      const W=d.weights.map(r=>+r.kg),last=W[W.length-1],w7=W.slice(-8),delta=W.length>1?last-W[Math.max(0,W.length-8)]:null;
      const S7=d.steps.slice(-7).map(r=>r.steps),avg=S7.length?Math.round(S7.reduce((a,b)=>a+b,0)/S7.length):null;
      const edad=p.birth_date?Math.floor((Date.now()-new Date(p.birth_date))/31557600000):null;
      const inf=(CP.info&&CP.info[CP.cid])||{},rg=REGL[inf.reg],cuenta=`<section class="sec"><div class="sec-h"><b>Cuenta</b></div><div class="cpgr"><span>Correo</span><small>${esc(inf.email||'—')}${inf.email?` <button class="lblbtn" data-act="cpcopy" data-v="${esc(inf.email)}">Copiar</button>`:''}</small></div><div class="cpgr"><span>Tipo de registro</span><small>${rg?rg[0]:(p.status==='pending'?'Cuenta nueva, aún sin registro':'Aún no hace el registro')}</small></div><div class="cpgr"><span>Zona horaria</span><small>${esc(inf.tz||'Sin dato (se asume Bogotá)')}</small></div></section>`,
      all=cuenta+`<section class="sec"><div class="sec-h"><b>Plan</b><em>${PNAME[p.plan]}</em></div>
        <div class="chips">${['basic','complete','elite'].map(k=>`<button class="chip${p.plan===k?' on':''}" data-act="cpplan" data-v="${k}">${PNAME[k]}</button>`).join('')}</div>
        <div class="note">Cambiar el plan cambia lo que ve el cliente en su app.</div></section>
       <section class="sec"><div class="sec-h"><b>Pruebas</b></div><div class="note" style="margin-bottom:8px">Borra los registros de este cliente (peso, pasos, entrenamientos, feedback, hitos y niveles) para volver a probar desde cero. No borra su perfil, rutina, fotos ni chat.</div><button class="btn" data-act="cpreset" style="width:100%">Reiniciar registros y hitos</button><div class="note" style="margin:14px 0 8px">Reinicio total: además borra su formulario y su programa Basic automático. Al abrir la app vuelve a empezar desde el registro (incluye la pregunta de embarazo). Conserva cuenta, plan, chat y fotos.</div><button class="btn" data-act="cpresetall" style="width:100%;border-color:#B3261E;color:#B3261E">Reiniciar TODO el perfil (volver al registro)</button></section>
       <section class="sec"><div class="sec-h"><b>Archivar o eliminar</b></div>${p.status==='archived'?'<div class="note" style="margin-bottom:8px">Cuenta archivada: no puede entrar a la app y no recibe avisos. Conservas todo su historial.</div><button class="btn solid" data-act="cparch" data-on="0" style="width:100%">Restaurar cliente</button>':'<div class="note" style="margin-bottom:8px">Archivar: deja de entrar a la app y sale de tu lista, pero conservas todo su historial y puedes restaurarlo cuando quieras.</div><button class="btn" data-act="cparch" data-on="1" style="width:100%">Archivar cliente</button>'}<div class="note" style="margin:14px 0 8px">Eliminar: borra la cuenta y TODOS sus datos para siempre (rutinas, registros, chat, fotos). Antes se guarda una copia de seguridad automática. No cancela su pago en Whop.</div><button class="btn" data-act="cpdelacc" style="width:100%;border-color:#B3261E;color:#B3261E">Eliminar cuenta y datos</button></section>
       ${(()=>{const bl=(CP.d.blobs||[]).find(x=>x.key==='freeOk'),on=!!(bl&&bl.value===true);return `<section class="sec"><div class="sec-h"><b>Entreno libre</b><em>${on?'Activado':'Desactivado'}</em></div><div class="note" style="margin-bottom:8px">Si lo activas, esta persona ve en Entrenar el botón "Crear mi entreno" y usa el mismo editor que tú para armar sesiones extra. No cambia su programa. Tú ves lo que arma en su calendario.</div><button class="btn${on?'':' solid'}" data-act="cpfreeok" style="width:100%">${on?'Desactivar entreno libre':'Activar entreno libre'}</button></section>`;})()}
       ${accSec()}
       ${prioSec()}${cpMedSec()}
       ${cpGripsSec(d)}
       <section class="sec"><div class="sec-h"><b>Hitos celebrados</b></div><div class="note" style="margin-bottom:8px">Reinicia la celebración de un hito para que el cliente la vuelva a ver (y pueda compartirla). No borra sus registros.</div>
        ${(()=>{const bl=(CP.d.blobs||[]).find(x=>x.key==='msSeen'),L=Array.isArray(bl&&bl.value)?bl.value:[];return L.length?`<div class="chips">${L.map(t=>`<button class="chip" data-act="cphreset" data-t="${esc(t)}">↺ ${esc(t)}</button>`).join('')}</div>`:'<div class="note">Aún no tiene hitos celebrados.</div>';})()}
        <label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:13px"><input type="checkbox" id="cphok"> Entiendo que se volverá a celebrar</label>
        <button class="btn" data-act="cphreset" data-t="*" style="width:100%;margin-top:8px">Reiniciar todos los hitos</button></section>
       <section class="sec"><div class="sec-h"><b>Fidelidad</b><em>${fidSpan(fidMonths(fidSince(p)))}</em></div>
        <div class="note" style="margin-bottom:8px">Miembro desde. Para clientes de la app anterior, pon la fecha real en que empezaron contigo y el cliente verá sus hitos de fidelidad.</div>
        <input class="fld" type="date" id="cpSince" value="${fidSince(p)||''}"><button class="btn solid" data-act="cpsince" style="width:100%;margin-top:8px;padding:11px">Guardar fecha</button>
        <div class="note">Hito actual: ${fidTier(fidMonths(fidSince(p)))>=0?FID[fidTier(fidMonths(fidSince(p)))][2]+' · '+FID[fidTier(fidMonths(fidSince(p)))][1]:'aún sin hito (primer hito al mes)'}</div></section>
       <section class="sec"><div class="sec-h"><b>Módulos de la app</b></div>
        <div class="note" style="margin-bottom:8px">Por defecto el cliente solo ve Inicio, Entrenar y Progreso. Activa lo que quieras que vea.</div>
        <div class="chips">${[['recovery','Respiración'],['habitos','Hábitos'],['alim','Alimentación'],['medidas','Medidas antropométricas']].map(([k,n])=>`<button class="chip${(p.modules||[]).includes(k)?' on':''}" data-act="cpmod" data-v="${k}">${n}</button>`).join('')}</div></section>
       <section class="sec"><div class="sec-h"><b>Exportar datos</b></div><div class="note" style="margin-bottom:8px">Copia en un clic el perfil, la salud, el historial y el programa de este cliente, listo para pegar en una IA y revisar su plan.</div><button class="btn solid" data-act="exdata" data-id="${CP.cid}" style="width:100%">Exportar datos del cliente</button></section>
       <section class="sec"><div class="sec-h"><b>Perfil</b></div>
        <div class="pfrow"><span><b>Objetivo</b><small>${GN[p.goal]||p.goal||'—'}</small></span><span><b>Nivel</b><small>${esc(p.level||'—')}</small></span></div>
        <div class="pfrow"><span><b>Días</b><small>${(p.train_days||[]).map(i=>DAYL[i]).join(' · ')||'—'}</small></span><span><b>Edad</b><small>${edad!=null?edad+' años':'—'}</small></span></div>
        <div class="pfrow"><span><b>Estatura / peso inicial</b><small>${p.height_cm||'—'} cm · ${p.start_weight_kg||'—'} kg</small></span></div>
        <div class="pfrow"><span><b>Molestias o lesiones</b><small>${esc(p.injuries||'Ninguna')}</small></span></div></section>
<!--M1--><section class="sec"><div class="sec-h"><b>Peso</b><em>${last!=null?last.toFixed(1)+' kg':'Sin registros'}</em></div>${sparkOf(w7)}${delta!=null?`<div class="note">${delta>0?'+':delta<0?'−':''}${Math.abs(delta).toFixed(1)} kg en sus últimos registros</div>`:''}</section>
       ${(()=>{const wn=d.wnotes||{},ks=Object.keys(wn).sort().reverse().slice(0,10);return ks.length?`<section class="sec"><div class="sec-h"><b>Notas de pesaje</b><em>${ks.length}</em></div>${ks.map(k=>{const n=wn[k]||{};return `<div class="pfrow"><span><b>${fdate(k)}${n.w?' · '+(+n.w).toFixed(1)+' kg':''}</b><small>${(n.tags||[]).map(esc).join(' · ')}${n.note?'<br>“'+esc(n.note)+'”':''}</small></span></div>`;}).join('')}</section>`:'';})()}
       ${(()=>{const sl=d.sleep||{},ks=Object.keys(sl).sort().reverse().slice(0,10);if(!ks.length)return '';const hs=ks.map(k=>sl[k].h).filter(h=>h!=null),av=hs.length?hs.reduce((a,b)=>a+b,0)/hs.length:null;return `<section class="sec"><div class="sec-h"><b>Sueño</b><em>${av!=null?fmtHM(av)+' prom.':'—'}</em></div>${ks.map(k=>{const n=sl[k]||{};return `<div class="pfrow"><span><b>${n.h!=null||n.q?'<i class="sdot" style="background:'+(n.q?SLC[n.q]:slHC(n.h))+'"></i>':''}${fdate(k)}${n.h!=null?' · '+fmtHM(n.h):''}</b><small>${[n.q?'Calidad '+n.q:'',n.e?'Energía '+n.e:'',...(n.tags||[])].filter(Boolean).map(esc).join(' · ')}${n.note?'<br>“'+esc(n.note)+'”':''}</small></span></div>`;}).join('')}</section>`;})()}
<!--M2-->${(()=>{const ec=d.excom||{},rows=[];Object.keys(ec).forEach(id=>(ec[id]||[]).forEach(c=>rows.push({id,d:c.d,t:c.t})));rows.sort((a,b)=>a.d<b.d?1:-1);return rows.length?`<section class="sec"><div class="sec-h"><b>Comentarios en ejercicios</b><em>${rows.length}</em></div>${rows.slice(0,12).map(c=>`<div class="pfrow"><span><b>${esc((E[c.id]||{}).n||c.id)} · ${fdate(c.d)}</b><small>“${esc(c.t)}”</small></span></div>`).join('')}</section>`:'';})()}
<!--M3--><section class="sec"><div class="sec-h"><b>Pasos</b><em>${avg!=null?avg.toLocaleString('es-CO'):'—'}</em></div><div class="note">Promedio de los últimos ${S7.length||0} días registrados. Meta: ${(p.step_goal||0).toLocaleString('es-CO')}.</div></section>
       <section class="sec"><div class="sec-h"><b>Sesiones recientes</b></div>${d.fb.length?d.fb.map(f=>`<div class="pfrow"><span><b>${GRN[f.grp]||f.grp} · ${fdate(f.log_date)}</b><small>${f.intensity?INT(f.intensity)+' ('+f.intensity+'/10)':'Sin intensidad'}${f.feel?' · '+(R_FEELR[f.feel]||f.feel):''}${f.feel==='molestia'?' ⚠':''}${f.duration_min?' · '+f.duration_min+' min':''}${f.skip_reason?'<br>No hizo todo: '+esc(f.skip_reason):''}${f.note?'<br>“'+esc(f.note)+'”':''}</small></span>${f.intensity?`<span class="rb" style="background:${RC[f.intensity-1]}">${f.intensity}</span>`:''}</div>`).join(''):'<div class="pfrow"><small>Aún no hay sesiones registradas.</small></div>'}</section>`;
      const P1=all.split('<!--M1-->'),P2=P1[1].split('<!--M2-->'),P3=P2[1].split('<!--M3-->');
      body=CP.tab==='evol'?cpChkSec()+P2[0]+P3[0]+(()=>{try{return cpWith(()=>fzSeries());}catch(e){return '';}})()+P3[1]:cpAjustes(P1[0]);
    }else if(CP.tab==='alim'){body=cpAlimTab();
    }else if(CP.tab==='plan'){body=cpEntSeg()+cpPlanBody();
    }else if(CP.tab==='rutina'){body=cpEntSeg()+rtClientTab();
    }else if(CP.tab==='pesos'){body=cpEntSeg()+cpPesosTab();
    }else if(CP.tab==='chat'){
      const msgs=mapChat(d.chat,ME.id);
      body=`<div style="padding:4px 0 8px">${msgs.length?msgs.map(m=>msgHTML(m,m.from==='client')).join(''):'<div class="note">Aún no hay mensajes. Escríbele para empezar.</div>'}</div>
        <div class="chatin"><input id="cpIn" placeholder="Escribe al cliente…" value="${esc(keep)}"><button data-act="cpsend">Enviar</button></div>`;
    }else{body=cpHoy(d);
    }
  }
  const pp=d?d.profile:{},ini=(pp.full_name||'?').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
  el.innerHTML=cpShell(`<div class="cpcrumb"><button class="lblbtn" data-act="cpback">Clientes</button> / <b>${nm}</b></div>
    <div class="cphead"><span class="cpav">${esc(ini)}</span><div><h2 class="h2" style="margin:0">${nm}</h2>${(CP.info&&CP.info[CP.cid]&&CP.info[CP.cid].email)?`<small class="cpem" style="display:block">${esc(CP.info[CP.cid].email)}</small>`:''}<small>${d?(PNAME[pp.plan]||'')+' · '+(GN[pp.goal]||pp.goal||'Sin objetivo')+' · '+fidSpan(fidMonths(fidSince(pp)))+' con ERRE':''}</small></div></div>
    ${pp&&pp.status==='pending'?`<section class="sec" style="border:2px solid #F28C28;margin:10px 0"><div class="sec-h"><b>Cuenta pendiente</b></div><div class="note" style="margin-bottom:8px">Se registró solo. Elige su plan (Ajustes → Cuenta y acceso) y actívala para que entre a la app.</div><button class="btn solid" data-act="cpactivate" style="width:100%">Activar cuenta</button></section>`:''}
    <div class="cptabs cpnavx">${tabs.map(t=>`<button class="cptab${(CP.tab===t||(t==='plan'&&(CP.tab==='rutina'||CP.tab==='pesos')))?' on':''}" data-act="cptab" data-v="${t}"><i>${SB.find(x=>x[0]===t)[1]}</i>${TL[t]}</button>`).join('')}</div>${CP.err?`<div class="note">${CP.err}</div>`:''}<div class="${CP.tab==='plan'?'':'cpnar'}">${body}</div>`);cpWideCls(el);
}
/* tareas asignadas por el coach (cliente + coach) */
const cxList=()=>((S.ctasks&&S.ctasks.tasks)||[]);
function cxSync(){
  for(let i=DAYS.length-1;i>=0;i--)if(DAYS[i].x)DAYS.splice(i,1);
  cxList().forEach(t=>{const sd=t.day||(t.ref&&(cxList().find(q=>q.id===t.ref)||{}).day);if(t.type==='workout'&&sd){const d=JSON.parse(JSON.stringify(sd));d.id='x'+t.id;d.x=1;d.label=t.title||d.name||'Workout';DAYS.push(d);}});
}
function cxCard(){return cxList().filter(t=>t.date===S.sel&&t.type==='cardio').pop()||null;}
let cxTier=t=>((cxCard()||{}).tier)||t;
function cxOv(date){const L=cxList().filter(t=>t.date===date);return L.find(t=>t.type==='rest')||L.find(t=>t.type==='workout'&&!t.extra)||null;}
const CXS={};
function cxExtras(date){return cxList().filter(t=>t.date===date&&t.type==='workout'&&t.extra);}
function cxSessBar(){const c=ctxFor(S.sel),ss=c.ss||[];if(ss.length<2)return '';const i=Math.min(CXS[S.sel]||0,ss.length-1);return `<div class="cxnote" style="background:#EEF3FB;border-color:#C9D8EE"><b style="color:#2A5BA8">Hoy tienes ${ss.length} sesiones</b><span class="chips" style="margin-top:6px;display:flex;gap:6px;flex-wrap:wrap">${ss.map((n,k)=>`<button class="chip${k===i?' on':''}" data-act="cxsess" data-v="${k}">${k+1}. ${esc(n)}</button>`).join('')}</span></div>`;}

function cxNotes(){const cc=cxCard(),ch=cc?`<div class="cxnote" style="background:#FDECF1;border-color:#F0BCCB"><b style="color:#D03A68">Cardio asignado por tu coach</b>${esc(((typeof CMODS!=='undefined'&&CMODS[cc.mod])||{n:'Cardio'}).n)}${cc.tier?' · '+esc(cc.tier):''}${cc.min?' · '+cc.min+' min':''}${cc.text?'<br>'+esc(cc.text):''}</div>`:'';const L=cxList().filter(t=>t.date===S.sel&&t.type==='note');return cxSessBar()+ch+L.map(t=>`<div class="cxnote"><b>Nota de tu coach</b>${esc(t.text||'')}</div>`).join('');}
async function cpSaveTasks(list){
  const value={tasks:list};
  try{const old=cxListOf(CP.d)||[],ids=new Set(old.map(t=>t.id)),nw=list.filter(t=>!ids.has(t.id)),TL={workout:'un entrenamiento',cardio:'cardio',note:'una nota',steps:'pasos'};
    if(nw.length)nw.forEach(t=>DB.logAct(CP.cid,'task','Asignó '+(TL[t.type]||'una tarea')+' para el '+t.date));
    else if(list.length<old.length)DB.logAct(CP.cid,'task','Quitó '+(old.length-list.length)+' tarea(s) asignada(s)');
    else DB.logAct(CP.cid,'task','Editó una tarea asignada');}catch(e){}
  await DB.upsert('client_data',[{client_id:CP.cid,key:'ctasks',value,updated_at:new Date().toISOString()}],'client_id,key');
  CP.d.data=CP.d.data||{};CP.d.data.ctasks=value;pushPlan(CP.cid);
}
const cpTid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const CPT_SOON=['Vídeo','Nutrición','Documento','Registrar evolución','Sesión presencial / online','Programar mensaje'];
function cxDropT(L,id){const t=L.find(x=>x.id===id);let R=L.filter(x=>x.id!==id);if(t&&t.day){const nx=R.find(x=>x.ref===id);if(nx)R=R.map(x=>x.id===nx.id?Object.assign({},x,{day:t.day,ref:undefined}):(x.ref===id?Object.assign({},x,{ref:nx.id}):x));}return R;}
function cpMvAsk(from,dg,to){if(!from||!to||from===to)return;CP.mv={from,dg,to};cpMvModal();}
function cpMvModal(){const m=CP.mv;if(!m){const o=document.getElementById('cpmv');if(o)o.remove();return;}
  let o=document.getElementById('cpmv');if(!o){o=document.createElement('div');o.id='cpmv';o.className='cpdv';document.body.appendChild(o);}
  const L=cxListOf(CP.d),tk=m.dg==='workout'?null:L.find(x=>x.id===m.dg),nm=m.dg==='workout'?'el entrenamiento':tk?({rest:'el descanso',cardio:'el cardio',note:'la nota'}[tk.type]||'la tarea'):'la tarea';
  const wk=m.dg==='workout'||(tk&&tk.type==='workout'),occ=wk?cpWith(()=>!!cpDayInfo(m.to).d):(tk&&tk.type==='cardio'?L.some(x=>x.date===m.to&&x.type==='cardio'):(tk&&tk.type==='rest'?cpWith(()=>!!cpDayInfo(m.to).d):false));
  const canSwap=false,msg=wk&&occ?`El ${fdate(m.to)} ya tiene un entrenamiento. Se queda y este se suma como segunda sesión.`:occ?`El ${fdate(m.to)} ya tiene ${tk&&tk.type==='cardio'?'un cardio':'un entrenamiento'}. No se reemplaza.${canSwap?' Puedes intercambiar los dos días.':' Elige otro día.'}`:`Vas a pasar ${nm} del ${fdate(m.from)} al ${fdate(m.to)}.`;
  const btns=occ&&!wk?(canSwap?'<button class="cpmvbt pri" data-act="cpmvdo" data-m="swap">Intercambiar</button>':'')+'<button class="cpmvbt" data-act="cpmvno">Cancelar</button>':'<button class="cpmvbt pri" data-act="cpmvdo" data-m="move">Mover</button><button class="cpmvbt" data-act="cpmvdo" data-m="copy">Duplicar</button><button class="cpmvbt" data-act="cpmvno">Cancelar</button>';
  o.innerHTML=`<div class="cpdc" style="max-width:420px"><div class="cpdhd"><div><b>¿Qué quieres hacer?</b><small>${fmtL(m.from)} → ${fmtL(m.to)}</small></div><button class="cpdx" data-act="cpmvno" aria-label="Cerrar">✕</button></div><div class="cpmvb"><p>${msg}</p><div>${btns}</div></div></div>`;}
async function cpMvDo(mode){const copy=mode===true||mode==='copy',swap=mode==='swap',m=CP.mv;if(!m)return;CP.mv=null;cpMvModal();const from=m.from,to=m.to;
  try{let L=cxListOf(CP.d).slice();const now=new Date().toISOString();
    const dayOf=dt=>{const tk=L.find(x=>x.date===dt&&x.type==='workout');const d=tk?(tk.day||((L.find(q=>q.id===tk.ref)||{}).day)):cpWith(()=>{const d=cpDayInfo(dt).d;return d&&!d.x?d:null;});return d?JSON.parse(JSON.stringify(d)):null;};
    if(swap&&m.dg==='workout'){const a=dayOf(from),b=dayOf(to);if(!a||!b){toast('No se pudo intercambiar');return;}
      [from,to].forEach(dt=>L.filter(x=>x.date===dt&&(x.type==='rest'||x.type==='workout')).forEach(x=>{L=cxDropT(L,x.id);}));
      L.push({id:cpTid(),date:to,type:'workout',title:a.name||a.label||'Workout',day:a,by:ME.id,at:now},{id:cpTid(),date:from,type:'workout',title:b.name||b.label||'Workout',day:b,by:ME.id,at:now});
      await cpSaveTasks(L);CP.cd=to;coachRender();toast('Días intercambiados ✓');return;}
    if(m.dg==='workout'){
      const tk=L.find(x=>x.date===from&&x.type==='workout');
      let day=tk?(tk.day||((L.find(q=>q.id===tk.ref)||{}).day)):cpWith(()=>{const d=cpDayInfo(from).d;return d&&!d.x?d:null;});
      if(!day){toast('No se pudo leer ese entrenamiento');return;}
      day=JSON.parse(JSON.stringify(day));
      const occ=cpWith(()=>!!cpDayInfo(to).d);
      L.filter(x=>x.date===to&&x.type==='rest').forEach(x=>{L=cxDropT(L,x.id);});
      if(!copy&&tk)L=cxDropT(L,tk.id);
      const nt={id:cpTid(),date:to,type:'workout',title:day.name||day.label||'Workout',day,by:ME.id,at:now};if(occ)nt.extra=true;L.push(nt);
      if(!copy){L=L.filter(x=>!(x.date===from&&x.type==='rest'));await cpSaveTasks(L);
        if(cpWith(()=>{const d=cpDayInfo(from).d;return d&&!d.x;})){L.push({id:cpTid(),date:from,type:'rest',title:'Descanso',by:ME.id,at:now});}}
    }else{
      const tk=L.find(x=>x.id===m.dg);if(!tk)return;
      const t2=Object.assign({},tk,{id:copy?cpTid():tk.id,date:to,at:now});delete t2.series;
      if(tk.type==='workout'){if(!t2.day&&tk.ref)t2.day=(L.find(q=>q.id===tk.ref)||{}).day;delete t2.ref;}
      const sameK=x=>x.date===to&&x.id!==tk.id&&((tk.type==='rest'||tk.type==='workout')&&(x.type==='rest'||x.type==='workout')||(tk.type==='cardio'&&x.type==='cardio'));
      if(tk.type==='workout'){const occ=cpWith(()=>!!cpDayInfo(to).d);if(occ&&!(L.some(x=>x.date===to&&x.type==='workout'&&!x.extra)))t2.extra=true;else if(occ)t2.extra=true;else delete t2.extra;L.filter(x=>x.date===to&&x.type==='rest').forEach(x=>{L=cxDropT(L,x.id);});}
      else L.filter(sameK).forEach(x=>{L=cxDropT(L,x.id);});
      if(!copy)L=cxDropT(L,tk.id);
      L.push(t2);
    }
    await cpSaveTasks(L);CP.cd=to;coachRender();toast((copy?'Duplicado':'Movido')+' ✓ El cliente lo verá al abrir su app');
  }catch(x){console.warn(x);toast('No se pudo mover. Intenta de nuevo.');}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act=cxsess]');if(!t)return;e.stopPropagation();CXS[S.sel]=+t.dataset.v;render();},true);
document.addEventListener('dragstart',e=>{const p=e.target.closest&&e.target.closest('[data-dg]');if(!p||CP.view!=='client')return;const c=p.closest('.cpc');CP.drag={from:p.dataset.v,dg:p.dataset.dg};try{e.dataTransfer.setData('text/plain',p.dataset.dg);e.dataTransfer.effectAllowed='move';}catch(x){}});
document.addEventListener('dragover',e=>{if(!CP.drag)return;const c=e.target.closest&&e.target.closest('.cpc[data-v]');document.querySelectorAll('.cpc.cpdrop').forEach(x=>x!==c&&x.classList.remove('cpdrop'));if(c){e.preventDefault();c.classList.add('cpdrop');}});
document.addEventListener('drop',e=>{if(!CP.drag)return;const c=e.target.closest&&e.target.closest('.cpc[data-v]');document.querySelectorAll('.cpc.cpdrop').forEach(x=>x.classList.remove('cpdrop'));if(!c){CP.drag=null;return;}e.preventDefault();const d=CP.drag;CP.drag=null;cpMvAsk(d.from,d.dg,c.dataset.v);});
document.addEventListener('dragend',()=>{CP.drag=null;document.querySelectorAll('.cpc.cpdrop').forEach(x=>x.classList.remove('cpdrop'));});
function cpBlankDay(name){const d=RD.torsoC(1);d.name=name||'Nuevo workout';d.label='Workout';d.blocks.forEach(b=>{if(!b.cardio)b.items=[];});return d;}
function cpOpenNew(date,day){const nm=(day.name||'Nuevo workout');rtOpen('client',{cid:CP.cid,name:nm,days:[day]});RT.xtn={date,id:cpTid()};RT.dirty=true;RT.sel=0;RT.bt=day.blocks.some(b=>!b.cardio&&b.items&&b.items.length)?'fu':'warm';rtShow();}
function cpAiCatalog(){const L=[];Object.keys(E).forEach(k=>{const e=E[k];if(!e||!e.n)return;if(e.yt||k.slice(0,2)==='x_'||/^(mov_|band_|est_|resp_)/.test(k))L.push([k,e.n,e.g||'',e.pat||''].join('|'));});return L.join('\n');}
function cpAiDay(p){const d=cpBlankDay(String(p.name||'Workout IA').slice(0,60)),ok=x=>typeof x==='string'&&E[x];
  const bi=(x,k,rest)=>({ex:x,kind:k,ref:0,tempo:k==='basic'?'3-0-1-0':'2-0-1-0',rir:'2',rest,note:''}),B=k=>d.blocks.find(b=>b.k===k),seen={};
  const take=a=>(Array.isArray(a)?a:[]).filter(x=>ok(x)&&!seen[x]&&(seen[x]=1));
  B('warm').items=take(p.warm).map(x=>({ex:x,kind:'warm',fixed:{sets:'2',reps:'10-12'},note:''}));
  B('main').items=take(p.main).map(x=>bi(x,'basic',120));
  B('acc').items=take(p.acc).map(x=>bi(x,'acc',75));
  B('calm').items=take(p.calm).map(x=>({ex:x,kind:'calm',fixed:{sets:'2',reps:/^resp_/.test(x)?'2 min':'30 s'},note:''}));
  return d;}
function cpAiModal(date){let o=document.getElementById('cpai');if(!date){if(o)o.remove();return;}
  if(!o){o=document.createElement('div');o.id='cpai';o.className='cpdv';document.body.appendChild(o);}
  const m=CP.ai=CP.ai||{date,min:60,busy:false,err:'',brief:''};m.date=date;
  o.innerHTML=`<div class="cpdc" style="max-width:520px"><div class="cpdhd"><div><b>✨ Crear workout con IA</b><small>${fmtL(date)} · borrador para que lo revises</small></div><button class="cpdx" data-act="cpaino" aria-label="Cerrar">✕</button></div><div class="cpmvb">
   <label class="pfl">¿Qué quieres entrenar?</label><textarea class="fld" id="cpaiB" rows="4" placeholder="Ej. Tren superior, empuje + tríceps, sin dolor de hombro. Énfasis en pecho.">${esc(m.brief)}</textarea>
   <label class="pfl" style="margin-top:8px">Duración</label><div class="chips">${[45,60,75,90].map(n=>`<button class="chip${m.min===n?' on':''}" data-act="cpaimin" data-v="${n}">${n} min</button>`).join('')}</div>
   ${m.err?`<div class="note" style="border-color:var(--red);color:var(--red-strong);margin-top:8px">${m.err}</div>`:''}
   <div class="note" style="margin-top:8px">La IA arma el borrador con tu biblioteca de ejercicios. Las series y repeticiones salen del mesociclo. Lo abres en el editor, lo ajustas y lo guardas tú.</div>
   <button class="cpmvbt pri" data-act="cpaigo" style="width:100%;margin-top:10px"${m.busy?' disabled':''}>${m.busy?'Armando el borrador…':'Generar borrador'}</button></div></div>`;}
function cpTmSync(){const m=CP.tm;if(!m)return;const d=document.getElementById('cptD'),u=document.getElementById('cptU');if(d&&d.value)m.date=d.value;if(u&&u.value)m.until=u.value;}
function cpTaskModal(){
  const m=CP.tm;if(!m){const o=document.getElementById('cptm');if(o)o.remove();return;}
  let o=document.getElementById('cptm');if(!o){o=document.createElement('div');o.id='cptm';o.className='cpdv';document.body.appendChild(o);}
  const progDays=(CP.routine&&CP.routine.days)||[],wk=(RT.tpls||[]).filter(t=>(t.tkind||'program')==='workout'&&t.days&&t.days.length);
  const T=(k,n,ic,body)=>`<div class="cptt${m.type===k?' on':''}"><button class="cpth2" data-act="cptype" data-v="${k}"><i class="cpdot" style="background:${ic}"></i><b>${n}</b><span>${m.type===k?'▴':'▾'}</span></button>${m.type===k?`<div class="cptb">${body}</div>`:''}</div>`;
  o.innerHTML=`<div class="cpdc" style="max-width:560px"><div class="cpdhd"><div><b>Añadir nueva tarea</b><small>${fmtL(m.date)}</small></div><button class="cpdx" data-act="cptclose" aria-label="Cerrar">✕</button></div>
   <label class="pfl">Fecha</label><input class="fld" type="date" id="cptD" value="${m.date}" style="margin-bottom:10px">
   <div class="cprep"><span>¿Quieres repetir esta tarea?</span><button class="chip${m.rep?'':' on'}" data-act="cprep" data-v="0">No</button><button class="chip${m.rep?' on':''}" data-act="cprep" data-v="1">Sí</button></div>
   ${m.rep?`<div class="cprepb"><div class="chips">${DNL.map((n,i)=>`<button class="chip${(m.rd||[]).includes(i)?' on':''}" data-act="cprd" data-v="${i}">${n}</button>`).join('')}</div><label class="pfl">Repetir hasta</label><input class="fld" type="date" id="cptU" value="${m.until||addD(m.date,28)}"></div>`:''}
   ${T('workout','Workout','#F0A020',`<select class="fld" id="cptW"><option value="">Elige el entrenamiento…</option>${progDays.length?`<optgroup label="Días del programa del cliente">${progDays.map((d,i)=>`<option value="p:${i}">${esc(d.label||('Día '+(i+1)))} · ${esc(d.name||'')}</option>`).join('')}</optgroup>`:''}${wk.length?`<optgroup label="Workouts guardados">${wk.map(t=>`<option value="w:${t.id}">${esc(t.name)}</option>`).join('')}</optgroup>`:''}</select><div class="cpwk2"><button class="btn" data-act="cpnewwk">✎ Crear desde cero</button><button class="btn" data-act="cpai">✨ Crear con IA</button></div><div class="note">Reemplaza el entrenamiento que le tocaba ese día. Si no le tocaba ninguno, se suma como un día extra.</div><button class="btn solid" data-act="cptsave" style="width:100%;margin-top:8px">Asignar workout</button>`)}
   ${T('rest','Descanso','#8A8F98',`<div class="note">El cliente verá ese día como descanso y no tendrá entrenamiento.</div><button class="btn solid" data-act="cptsave" style="width:100%;margin-top:8px">Marcar descanso</button>`)}
   ${T('note','Nota para el cliente','#3B82C4',`<textarea class="fld" id="cptN" rows="3" placeholder="Ej. Hoy prioriza técnica, baja el peso un 10 %."></textarea><button class="btn solid" data-act="cptsave" style="width:100%;margin-top:8px">Guardar nota</button>`)}
   ${T('cardio','Cardio','#E6477A',`<label class="pfl">Qué cardio</label><select class="fld" id="cptCm">${cpModOpts('camin_cam')}</select><label class="pfl">Intensidad</label><select class="fld" id="cptCt"><option value="">Según el plan</option><option value="Base">Base · 20-40 min</option><option value="Moderado">Moderado · 10-25 min</option></select><label class="pfl">Minutos (opcional)</label><input class="fld" id="cptCn" inputmode="numeric" placeholder="Ej. 20"><label class="pfl">Nota (opcional)</label><input class="fld" id="cptCx" placeholder="Ej. Después de pierna"><div class="note">Si ese día ya tiene entrenamiento con cardio, reemplaza el cardio del plan. Si es descanso, el cliente lo ve como cardio asignado.</div><button class="btn solid" data-act="cptsave" style="width:100%;margin-top:8px">Asignar cardio</button>`)}
   ${T('form','Formulario','#C0392B',`<div class="note" style="margin-bottom:8px"><b>Chequeo quincenal</b><br>Cumplimiento, molestias, carga, alimentación, energía, sueño, estrés y progreso. 1 minuto, con colores. Le aparece en Inicio en la fecha elegida y la respuesta te llega aquí.</div><button class="btn solid" data-act="cptsave" data-f="chequeo" style="width:100%;margin-top:8px">Asignar chequeo</button>`)}
   ${T('med','Medidas antropométricas','#2E7D6B',`<div class="note" style="margin-bottom:8px"><b>Medidas para llenar</b><br>El cliente se mide y las anota: peso, perímetros y pliegues (todo opcional). Te llega aquí y queda en su historial.</div><button class="btn solid" data-act="cptsave" data-f="medidas" style="width:100%;margin-top:8px">Asignar medidas</button>`)}
   <div class="cptt"><button class="cpth2" data-act="cptprog"><i class="cpdot" style="background:#777"></i><b>Asignar programa</b><span>›</span></button></div>
   ${CPT_SOON.map(n=>`<div class="cptt soon"><div class="cpth2"><i class="cpdot" style="background:#ccc"></i><b>${n}</b><span>Próximamente</span></div></div>`).join('')}</div>`;
}
/* ---------- panel coach: calendario de planificación + detalle del entrenamiento ---------- */
const CPK=['alimplan','prio','ctasks','logs','swaps','extras','cardio','cardioX','warmFA','fb','user','tasks','program','start','weights','steps','wm','goal','sel','week','day','pos','raw','mes'];
function cpWith(fn){
  const d=CP.d,dt=(d&&d.data)||{},p=d.profile,days=(CP.routine&&CP.routine.days)||[],o={},od=DAYS.slice(),pf=dt.prefs||{};
  CPK.forEach(k=>o[k]=S[k]);
  S.logs=dt.logs||{};S.swaps=dt.swaps||{};S.extras=dt.extras||{};S.cardio=dt.cardio||{};S.cardioX=dt.cardioX||{};S.warmFA=dt.warmFA||{};S.fb=dt.fb||{};S.tasks=dt.tasks||{};
  S.program=planOf(p);S.start=pf.start||S.start;S.wm='ex';S.goal=['bajar','complete','aumentar'].includes(p.goal)?p.goal:'complete';
  const u=dt.user||{};S.user=Object.assign({},u,{sched:(u.sched&&u.sched.length)?u.sched:((p.train_days&&p.train_days.length)?p.train_days:[0,2,4])});
  S.weights={};(d.weights||[]).forEach(r=>S.weights[r.log_date]=+r.kg);S.steps={};(d.steps||[]).forEach(r=>S.steps[r.log_date]=r.steps);
  S.prio=dt.prio||{};S.alimplan=dt.alimplan||{};S.ctasks=dt.ctasks||null;DAYS.length=0;days.forEach(x=>DAYS.push(x));cxSync();
  try{return fn();}finally{CPK.forEach(k=>S[k]=o[k]);DAYS.length=0;od.forEach(x=>DAYS.push(x));}
}
function cpDayInfo(date){return withDate(date,()=>{
  const c=ctxFor(date),d=c.d;if(!d)return {d:null,ov:cxOv(date)};
  let done=0,total=0;const wk=Math.min(S.week,PERIOD[S.program].weeks);
  d.blocks.forEach(b=>{try{const x=blockCount(d,b,wk);done+=x.done;total+=x.total;}catch(e){}});
  const rp=['g_fuerza','g_cardio'].map(g=>S.fb[cKey(d)+'|'+g]).filter(f=>f&&f.rpe).map(f=>f.rpe);
  return {d,done,total,n:c.pos+1,rpe:rp.length?Math.round(rp.reduce((a,b)=>a+b,0)/rp.length*10)/10:null};});
}
const cpSt=(i,date)=>!i.d?'':(i.total>0&&i.done>=i.total)?'ok':i.done>0?'part':date<today()?'miss':'plan';
const cpMonL=ym=>{const [y,m]=ym.split('-').map(Number);return cap(new Date(y,m-1,1,12).toLocaleDateString('es-CO',{month:'long',year:'numeric'}));};
function cpPlanBody(){
  const d=CP.d;if(!(CP.routine&&CP.routine.days&&CP.routine.days.length)&&!cxListOf(d).length)return '<div class="note">Esta persona aún no tiene programa. Asígnale uno en la pestaña Programa, o agrega tareas con el botón + Tarea.</div><button class="btn solid" data-act="cptnew" data-v="'+today()+'" style="margin-top:10px">+ Tarea</button>';
  const cd=CP.cd=CP.cd||today(),vw=CP.cv=CP.cv||'mes',ym=cd.slice(0,7),tdy=today();
  return cpWith(()=>{
    let ds=[];
    if(vw==='sem'){const m=monOf(cd);ds=Array.from({length:7},(_,i)=>addD(m,i));}
    else if(vw==='dia'){ds=[cd];}
    else{const f=ym+'-01',gs=monOf(f);for(let i=0;i<42;i++){const x=addD(gs,i);if(i>=35&&x.slice(0,7)!==ym)break;ds.push(x);}}
    let ok=0,miss=0,plan=0;
    const cell=(dt,big)=>{
      const inM=vw!=='mes'||dt.slice(0,7)===ym,inf=cpDayInfo(dt),st=cpSt(inf,dt),L=cxList().filter(t=>t.date===dt);
      if(inM&&(vw!=='lista')&&st){if(st==='ok')ok++;else if(st==='miss'||(st==='part'&&dt<tdy))miss++;else plan++;}
      const w=S.weights[dt],stp=S.steps[dt],pct=inf.total?Math.round(inf.done/inf.total*100):0;
      const pills=(inf.d?`<button class="cpp ${st}" draggable="true" data-dg="workout" data-act="cpday" data-v="${dt}" title="${esc(inf.d.name||'')}"><i>${st==='ok'?'✓':st==='part'?pct+'%':st==='miss'?'!':'•'}</i><span>${inf.d.x?'':'Día '+inf.n+'<em> · '}${esc(inf.d.x?(inf.d.label||inf.d.name||'Workout'):(inf.d.name||''))}${inf.d.x?'':'</em>'}</span></button>`:'')
        +L.filter(t=>t.type==='workout'&&t.extra).map(t=>`<button class="cpp plan" draggable="true" data-dg="${t.id}" data-act="cpday" data-v="${dt}"><i>+</i><span>${esc(t.title||'Workout')}</span></button>`).join('')
        +L.filter(t=>t.type==='rest').map(t=>`<button class="cpp rest" draggable="true" data-dg="${t.id}" data-act="cpday" data-v="${dt}"><i>☾</i><span>Descanso</span></button>`).join('')
        +L.filter(t=>t.type==='cardio'&&!inf.d).map(t=>`<button class="cpp card" draggable="true" data-dg="${t.id}" data-act="cpday" data-v="${dt}"><i>🏃</i><span>Cardio${t.min?' · '+t.min+' min':''}</span></button>`).join('')
        +L.filter(t=>t.type==='note').map(t=>`<button class="cpp note" draggable="true" data-dg="${t.id}" data-act="cpday" data-v="${dt}"><i>✎</i><span>${esc(t.text||'Nota')}</span></button>`).join('')
        +L.filter(t=>t.type==='form').map(t=>{const md=t.form==='medidas',dn=md?((CP.med&&CP.med.rows)||[]).some(x=>x.task_id==='f-'+t.id):(CP.chk||[]).some(x=>x.client_id===CP.cid&&x.period==='f-'+t.id);return `<button class="cpp form" draggable="true" data-dg="${t.id}" data-act="cpday" data-v="${dt}"><i>${dn?'✓':md?'📏':'▤'}</i><span>${md?'Medidas':'Chequeo'}${dn?' · listo':''}</span></button>`;}).join('');
      return `<div class="cpc${inM?'':' out'}${dt===tdy?' tdy':''}${big?' big':''}" data-act="cptnew" data-v="${dt}"><button class="cpcn" data-act="cptnew" data-v="${dt}">${big?fdate(dt)+' ':''}${+dt.slice(8)}</button>${pills}${cpDefs(dt,big||vw==='sem')}</div>`;
    };
    let main='';
    if(vw==='mes'){main=`<div class="cpdow">${['L','M','X','J','V','S','D'].map(x=>`<span>${x}</span>`).join('')}</div><div class="cpgrid">${ds.map(x=>cell(x)).join('')}</div>`;}
    else if(vw==='sem'){main=`<div class="cpdow">${['L','M','X','J','V','S','D'].map(x=>`<span>${x}</span>`).join('')}</div><div class="cpgrid cpwk">${ds.map(x=>cell(x,0)).join('')}</div>`;}
    else if(vw==='dia'){main=`<div class="cpgrid" style="grid-template-columns:1fr">${cell(cd,1)}</div>`;}
    else{const rows=ds.filter(x=>x.slice(0,7)===ym).map(x=>({x,h:cell(x,1)})).filter(r=>cpHas(r.x));main=rows.length?rows.map(r=>`<div class="cpl">${r.h}</div>`).join(''):'<div class="note">No hay tareas este mes.</div>';
      ds.filter(x=>x.slice(0,7)===ym).forEach(x=>{const st=cpSt(cpDayInfo(x),x);if(st==='ok')ok++;else if(st==='miss'||(st==='part'&&x<tdy))miss++;else if(st)plan++;});}
    const lbl=vw==='mes'||vw==='lista'?cpMonL(ym):vw==='sem'?'Semana del '+fdate(ds[0])+' al '+fdate(ds[6]):fmtL(cd);
    return `<section class="sec"><div class="cpbar"><button class="arr" data-act="cpcal" data-v="-1" aria-label="Anterior">‹</button><button class="arr" data-act="cpcal" data-v="1" aria-label="Siguiente">›</button><button class="lblbtn" data-act="cpcal" data-v="0">Hoy</button><b class="cpbl">${lbl}</b><button class="btn solid cpnew" data-act="cptnew" data-v="${vw==='dia'?cd:tdy}">+ Tarea</button></div>
      <div class="chips cpvw">${[['mes','Mes'],['sem','Semana'],['dia','Día'],['lista','Lista']].map(([k,n])=>`<button class="chip${vw===k?' on':''}" data-act="cpview" data-v="${k}">${n}</button>`).join('')}</div>
      <div class="cpkpi"><span><b>${ok}</b><small>Cumplidos</small></span><span><b>${miss}</b><small>Sin completar</small></span><span><b>${plan}</b><small>Por venir</small></span><span><b>${ok+miss?Math.round(ok/(ok+miss)*100):0}%</b><small>Cumplimiento</small></span></div>
      ${main}
      <div class="cpleg"><span><i class="cpp ok">✓</i>Cumplido</span><span><i class="cpp part">%</i>Parcial</span><span><i class="cpp miss">!</i>Sin completar</span><span><i class="cpp plan">•</i>Programado</span><span><i class="cpp rest">☾</i>Descanso</span><span><i class="cpp note">✎</i>Nota</span></div>
      <div class="note">Toca un día para ver lo que hizo y para asignarle tareas: un workout, un descanso o una nota.</div></section>`;
  });
}
function cpDefs(dt,lab){
  const d=CP.d,p=d.profile,tdy=today(),cdc=cpCardioChip(dt,lab,tdy);if(dt>tdy)return cdc?`<div class="cpks">${cdc}</div>`:'';
  const wd=(d.weights||[]).map(r=>r.log_date).sort(),cr=p.created_at?bogota(p.created_at).date:null,start=[wd[0],cr].filter(Boolean).sort()[0]||dt;if(dt<start)return '';
  const st=(ok,part)=>ok?'ok':part?'part':dt<tdy?'miss':'plan',out=[];
  const add=(ic,n,s2,tip,key)=>out.push(`<button class="cpk ${s2}" data-act="cpchip" data-v="${dt}|${key}" title="${esc(n+(tip?' · '+tip:''))}">${ic}${lab?' '+n:''}</button>`);
  const w=S.weights[dt];add('⚖','Peso',st(w!=null),w!=null?w.toFixed(1)+' kg':'sin registrar','peso');
  const sl=(d.sleep||{})[dt];if(Object.keys(d.sleep||{}).length)add('☾','Sueño',st(!!(sl&&(sl.h!=null||sl.q))),sl&&sl.h!=null?fmtHM(sl.h):'sin registrar','sueno');
  const stp=S.steps[dt],g=p.step_goal||8000;add('👣','Pasos',st(stp>=g,stp>0),stp?stp.toLocaleString('es-CO')+' de '+g.toLocaleString('es-CO'):'sin registrar','pasos');
  if((d.photos||[]).some(x=>x.taken_at===dt))add('📷','Foto','ok','foto de progreso','foto');
  const MN={recovery:['🫁','Respiración'],habitos:['✔','Hábitos'],alim:['🍽','Alimentación']};
  (p.modules||[]).forEach(k=>{if(!MN[k]||!TASKS[k])return;const c=withDate(dt,()=>tcount(k));add(MN[k][0],MN[k][1],st(c.total>0&&c.done>=c.total,c.done>0),c.done+' de '+c.total,k);});
  if(cdc)out.unshift(cdc);
  return `<div class="cpks">${out.join('')}</div>`;
}
function cpCardioInfo(d,dt){
  const ov=cxCard(),tier=((ov||{}).tier)||(d&&d.cardioTier)||(CARDIO[S.goal]&&CARDIO[S.goal][Math.min(S.week,PERIOD[S.program].weeks)-1]);if(!tier)return null;
  const c=S.cardio[cKey(d)]||{},mod=c.mod||(ov&&ov.mod)||d.cardioDefault,m=(typeof CMODS!=='undefined'&&CMODS[mod])||null;
  return {tier,done:!!c.done,mod:m?m.n:'',txt:CARDIO_TXT[tier]||'',dur:(d&&d.cardioMin?d.cardioMin+' min':(typeof DUR!=='undefined'&&DUR[tier]))||'',ex:(S.cardioX[dt]||[]),ov:ov,dmod:(ov&&ov.mod)||d.cardioDefault};
}
function cpCardioChip(dt,lab,tdy){
  return withDate(dt,()=>{const c=ctxFor(dt);if(!c.d)return '';const ci=cpCardioInfo(c.d,dt);if(!ci)return '';
    const st=ci.done?'ok':dt<tdy?'miss':'plan';return `<button class="cpk ${st}" data-act="cpchip" data-v="${dt}|cardio" title="Cardio ${ci.tier}${ci.mod?' · '+esc(ci.mod):''}">🏃${lab?' Cardio '+ci.tier:''}</button>`;});
}
const cpModOpts=sel=>Object.entries(CMODS).map(([id,x])=>`<option value="${id}"${id===sel?' selected':''}>${esc(x.n)}</option>`).join('');
function cpCardForm(dt,ci,dy){
  return `<div class="cptt" style="margin-top:12px"><div class="cptb" style="padding:12px"><b style="font-size:13px">Editar el cardio</b>
   <label class="pfl">Qué cardio</label><select class="fld" id="cpEm">${cpModOpts(ci.dmod)}</select>
   <label class="pfl">Intensidad</label><select class="fld" id="cpEt"><option value="">Según el plan (${ci.ov&&ci.ov.tier?'plan':ci.tier})</option><option value="Base"${ci.ov&&ci.ov.tier==='Base'?' selected':''}>Base · 20-40 min</option><option value="Moderado"${ci.ov&&ci.ov.tier==='Moderado'?' selected':''}>Moderado · 10-25 min</option></select>
   <label class="pfl">Minutos (opcional)</label><input class="fld" id="cpEn" inputmode="numeric" value="${ci.ov&&ci.ov.min||''}" placeholder="Ej. 20">
   <label class="pfl">Nota para el cliente (opcional)</label><input class="fld" id="cpEx" value="${esc((ci.ov&&ci.ov.text)||'')}" placeholder="Ej. Hazlo después de pierna">
   <button class="btn solid" data-act="cpcard" data-v="${dt}|day" style="width:100%;margin-top:8px">Guardar solo para este día</button>
   ${dy&&!dy.x?`<button class="btn" data-act="cpcard" data-v="${dt}|routine" style="width:100%;margin-top:6px">Cambiar el cardio de este workout en el programa</button><div class="note" style="margin-top:6px">Esa opción cambia la modalidad en todas las semanas.</div>`:''}</div></div>`;
}
function cpChipHTML(dt,key){
  return cpWith(()=>withDate(dt,()=>{
    const d=CP.d,p=d.profile,row=(a,b)=>`<div class="pfrow"><span><b>${a}</b><small>${b}</small></span></div>`;
    let title='',body='',ok=true,msg='';const f=fdate(dt);
    if(key==='peso'){const w=S.weights[dt],n=(d.wnotes||{})[dt]||{};title='Peso';ok=w!=null;body=ok?row('Peso del día',w.toFixed(1)+' kg')+((n.tags&&n.tags.length)?row('Contexto',n.tags.map(esc).join(' · ')):'')+(n.note?row('Nota','“'+esc(n.note)+'”'):''):row('Sin registro','No se pesó este día.');msg='No vi tu registro de peso del '+f+'. Cuando puedas, regístralo en la app.';}
    else if(key==='sueno'){const n=(d.sleep||{})[dt];title='Sueño';ok=!!(n&&(n.h!=null||n.q));body=ok?row('Horas dormidas',n.h!=null?fmtHM(n.h):'—')+row('Calidad / energía',(n.q?'Calidad '+n.q:'—')+(n.e?' · Energía '+n.e:''))+((n.tags&&n.tags.length)?row('Contexto',n.tags.map(esc).join(' · ')):'')+(n.note?row('Nota','“'+esc(n.note)+'”'):''):row('Sin registro','No registró el sueño este día.');msg='No vi tu registro de sueño del '+f+'. Cuando puedas, cuéntame cómo dormiste.';}
    else if(key==='pasos'){const st=S.steps[dt],g=p.step_goal||8000;title='Pasos';ok=st>=g;body=row('Pasos',st?st.toLocaleString('es-CO')+' de '+g.toLocaleString('es-CO')+' ('+Math.round(st/g*100)+'%)':'Sin registro');msg=st?'Vi que el '+f+' quedaste en '+st.toLocaleString('es-CO')+' pasos. ¡Vamos por la meta!':'No vi tus pasos del '+f+'. Acuérdate de registrarlos.';}
    else if(key==='foto'){const ph=(d.photos||[]).filter(x=>x.taken_at===dt),AN={front:'De frente',side:'De lado',back:'De espalda'};title='Foto de progreso';body=row('Fotos subidas',ph.map(x=>AN[x.angle]||x.angle).join(' · ')||'—')+row('Mes',ph[0]?ph[0].month:'—');}
    else if(key==='cardio'){const dy=ctxFor(dt).d,ci=dy&&cpCardioInfo(dy,dt);title='Cardio planificado';if(ci){ok=ci.done;body=row('Tipo',ci.tier+(ci.dur?' · '+esc(ci.dur):''))+row('Qué hacer',esc(ci.txt))+(ci.mod?row('Modalidad programada',esc(ci.mod)):'')+row('Estado',ci.done?'Hecho ✓':'Pendiente')+(ci.ov?row('Asignado para este día',(ci.ov.min?ci.ov.min+' min · ':'')+(ci.ov.tier||'')+(ci.ov.text?' · “'+esc(ci.ov.text)+'”':'')):'')+(ci.ex.length?row('Otro cardio registrado',ci.ex.map(x=>esc(x.name)+' '+x.min+' min').join(' · ')):'')+cpCardForm(dt,ci,dy);msg=ci.done?'¡Muy bien con tu cardio del '+f+'! Sigue así 💪':(dt>today()?'Para el '+f+' te dejé cardio en tu plan. Revísalo en tu app.':'No vi tu cardio del '+f+'. Cuando puedas, hazlo y márcalo en la app.');}else body=row('Sin cardio','No hay cardio planificado este día.');}
    else{const T=TASKS[key],t=tk();title=({recovery:'Respiración',habitos:'Hábitos',alim:'Alimentación'})[key]||key;const done=T.items.filter(x=>t[key+'.'+x.id]).length;ok=done>=T.items.length;body=T.items.map(x=>`<div class="pfrow"><span><b>${t[key+'.'+x.id]?'✓':'○'} ${esc(x.t||x.n||x.id)}</b></span></div>`).join('');msg='No vi tus tareas de '+title+' del '+f+'. Ánimo, ¡tú puedes!';}
    if(ok&&key!=='foto'&&key!=='pasos'&&key!=='cardio')msg='¡Muy bien con tu registro de '+title.toLowerCase()+' del '+f+'! Sigue así 💪';
    return `<div class="cpdhd"><div><b>${esc(title)}</b><small>${fmtL(dt)}</small></div><button class="cpdx" data-act="cpdclose" aria-label="Cerrar">✕</button></div>${body}${key!=='foto'?`<label class="pfl" style="margin-top:12px">Mensaje al cliente</label><textarea class="fld" id="cpRm" rows="3">${esc(msg)}</textarea><button class="btn solid" data-act="cpremind" style="width:100%;margin-top:8px">Enviar por chat</button>`:''}`;
  }));
}
const cxListOf=d=>((((d&&d.data)||{}).ctasks||{}).tasks)||[];
const cpHas=dt=>{const i=cpDayInfo(dt);return !!i.d||cxList().some(t=>t.date===dt);};
function cpDayHTML(date){
  const d=CP.d;
  return cpWith(()=>withDate(date,()=>{
    const inf=cpDayInfo(date),TL=cxList().filter(t=>t.date===date),tlh=`<div class="cpdhd"><div><b>${fmtL(date)}</b><small>${inf.d?'Entrenamiento y tareas':'Tareas del día'}</small></div><button class="cpdx" data-act="cpdclose" aria-label="Cerrar">✕</button></div><div class="cpdact"><button class="btn solid" data-act="cptnew" data-v="${date}">+ Tarea</button>${inf.d?`<button class="btn" data-act="cpedit" data-v="${date}" title="${inf.d.x?'Edita solo este workout asignado':'Se abre en el editor de rutinas. El cambio aplica a este día en todas las semanas.'}">✎ Editar entreno</button>`:''}</div>${TL.length?'<div class="cpdsec">Asignado</div>':''}${TL.map(t=>`<div class="cptask"><span><b>${t.type==='workout'?'Workout · '+esc(t.title||''):t.type==='rest'?'Descanso':t.type==='cardio'?'Cardio · '+esc(((typeof CMODS!=='undefined'&&CMODS[t.mod])||{n:''}).n)+(t.tier?' · '+t.tier:'')+(t.min?' · '+t.min+' min':''):t.type==='form'?(t.form==='medidas'?'Formulario · Medidas antropométricas':'Formulario · Chequeo quincenal'):'Nota'}</b>${t.type==='note'?'<small>'+esc(t.text||'')+'</small>':''}</span><button class="cpdx" data-act="cptdel" data-id="${t.id}" aria-label="Quitar">✕</button>${t.series?`<button class="lblbtn" data-act="cptdel" data-all="1" data-id="${t.id}" style="font-size:11px">Quitar serie</button>`:''}</div>`).join('')}`;
    if(!inf.d)return tlh+(TL.length?'':'<p class="lead">Ese día no tiene entrenamiento programado ni tareas.</p>');
    const dy=inf.d,st=cpSt(inf,date),pct=inf.total?Math.round(inf.done/inf.total*100):0,ec=(d.data&&d.data.excom)||d.excom||{};
    let sets=0,vol=0,fe=null;
    const fbs=['g_fuerza','g_cardio','g_calm'].map(g=>({g,f:S.fb[cKey(dy)+'|'+g]})).filter(x=>x.f);
    const GN={warm:'Calentamiento',fu:'Rutina de fuerza',cardio:'Cardio',calm:'Vuelta a la calma'},GI={warm:'🔥',fu:'🏋',cardio:'🏃',calm:'🧘'},GK={warm:'warm',main:'fu',acc:'fu',cardio:'cardio',calm:'calm'};
    const blocksA=dy.blocks.map(b=>{
      if(b.cardio){const ci=cpCardioInfo(dy,date);if(!ci)return null;return {k:'cardio',g:'cardio',d:ci.done?1:0,t:1,h:`<div class="cpdb">Cardio</div><div class="cpde"><div class="cpdn"><span><b>Cardio ${ci.tier}${ci.mod?' · '+esc(ci.mod):''}</b><small>${esc(ci.dur)}${ci.dur?' · ':''}${esc(ci.txt)}</small></span><span class="cpdt ${ci.done?'ok':'pe'}">${ci.done?'Completado':'Pendiente'}</span></div>${ci.ex.map(x=>`<div class="cpcm" style="background:var(--card,#fff);border-color:var(--line)"><b style="color:inherit">Otro cardio</b>${esc(x.name)} · ${x.min} min${x.hr?' · '+x.hr+' lpm':''}${x.note?'<br>“'+esc(x.note)+'”':''}</div>`).join('')}</div>`};}
      let bdn=0,btt=0;
      const items=itemsOf(dy,b).map((it,i)=>{
        if(b.k==='warm'&&typeof warmVid==='function'&&!warmVid(dy,b,i,it))return '';
        const id=curEx(dy,b.k,i,it),e=E[id]||{},pr=presc(it),L=S.logs[ikey(dy,b.k,i)]||[],sw=id!==it.ex;
        const rows=[];for(let q=0;q<Math.max(pr.sets,L.length);q++){const l=L[q]||{};if(l.done&&b.k!=='warm'&&b.k!=='calm'){sets++;vol+=(+l.kg||0)*(+l.reps||0);}
          rows.push(`<span class="cpsc${l.done?' d':''}"><b>${q+1}</b>${l.reps!=null?l.reps:'—'}${l.kg!=null?' × '+l.kg+' kg':''}${l.rpe?' · RPE '+l.rpe:''}${l.drop?' · drop':''}${l.done?' ✓':''}</span>`);}
        const dn=L.filter(l=>l&&l.done).length,stt=pr.sets>0&&dn>=pr.sets?'ok':dn>0?'pa':'pe';btt++;if(stt==='ok')bdn++;
        const cm=(ec[id]||[]).filter(c=>c.d===date);
        return `<div class="cpde"><div class="cpdn"><span class="cpth">${typeof thumb==='function'?thumb(id,'sm'):''}</span><span><b>${esc(e.n||id)}</b>${sw?'<small class="cpsw">Sustituido</small>':''}<small>${pr.sets} series × ${esc(String(pr.reps))}${pr.rest&&pr.rest!=='—'?' · descanso '+esc(String(pr.rest)):''}</small></span><span class="cpdt ${stt}">${stt==='ok'?'Completado':stt==='pa'?'Parcial':'Pendiente'}</span></div>
          <div class="cpsrs">${rows.join('')}</div>${cm.map(c=>`<div class="cpcm"><b>💬 Comentario del cliente</b>${esc(c.t)}</div>`).join('')}</div>`;}).join('');
      return items?{k:b.k,g:GK[b.k]||'fu',d:bdn,t:btt,h:`<div class="cpdb">${SUBT[b.k]||b.t||b.k}</div>${items}`}:null;
    }).filter(Boolean);
    const grp=['warm','fu','cardio','calm'].map(g=>{const bl=blocksA.filter(x=>x.g===g);if(!bl.length)return null;const dn=bl.reduce((a,x)=>a+x.d,0),tt=bl.reduce((a,x)=>a+x.t,0);return {g,dn,tt,st:tt>0&&dn>=tt?'ok':dn>0?'pa':'pe'};}).filter(Boolean);
    const bsel='all';
    const COL={warm:'#2E9D6B',fu:'#C0392B',cardio:'#D03A68',calm:'#5B7FC7'};
    const blocks=grp.map(x=>`<details class="cpdg" style="--tc:${COL[x.g]}"><summary><i>${GI[x.g]}</i><b>${GN[x.g]}</b><small>${x.tt} ${x.g==='cardio'?'tarea':'ejercicio'+(x.tt===1?'':'s')}</small><span class="cpdt ${x.st}">${x.st==='ok'?'Completado':x.st==='pa'?'Parcial':'Pendiente'}</span></summary>${blocksA.filter(y=>y.g===x.g).map(y=>y.h).join('')}</details>`).join('');
    const feel=fbs.map(x=>x.f.feel).filter(Boolean)[0],notes=fbs.filter(x=>x.f.note);
    const edb='';
    return tlh+edb+`<div class="cpdtt"><b>${dy.x?esc(dy.label||dy.name||'Workout'):'Día '+inf.n+' · '+esc(dy.name||'')}</b><span class="cpdt ${pct>=100?'ok':pct>0?'pa':'pe'}">${pct>=100?'Completado':pct>0?'Parcial':'Pendiente'}</span></div>
      <div class="cpdk"><span><b>${pct}%</b><small>Cumplimiento</small></span><span><b>${sets}</b><small>Series</small></span><span><b>${Math.round(vol).toLocaleString('es-CO')}</b><small>Volumen kg</small></span><span><b>${inf.rpe!=null?inf.rpe+'/10':'—'}</b><small>${inf.rpe!=null?INT(inf.rpe):'Esfuerzo'}</small></span></div>
      ${feel?`<div class="cpfeel">Sensación: <b>${esc(feel)}</b>${feel==='Con molestia'?' ⚠':''}</div>`:''}${notes.map(x=>`<div class="cpcm"><b>📝 Nota al terminar</b>${esc(x.f.note)}</div>`).join('')}
      ${blocks}`;
  }));
}
function cpDayOpen(date){
  cpDayClose();CP.dayOpen=date;const o=document.createElement('div');o.id='cpdv';o.className='cpdv';o.innerHTML=`<div class="cpdc">${cpDayHTML(date)}</div>`;document.body.appendChild(o);document.body.style.overflow='hidden';
}
function cpDayClose(){CP.dayOpen=null;const o=document.getElementById('cpdv');if(o)o.remove();document.body.style.overflow='';}
document.addEventListener('click',e=>{if(e.target.id==='cpdv')cpDayClose();});
document.addEventListener('click',async e=>{
  const t=e.target.closest('[data-act]');if(!t||!PROFILE||PROFILE.role!=='coach')return;const a=t.dataset.act;
  if(a==='cpday'){cpDayOpen(t.dataset.v);return;}
  if(a==='cpchip'){const [dt,k]=t.dataset.v.split('|');cpDayClose();const o=document.createElement('div');o.id='cpdv';o.className='cpdv';o.innerHTML='<div class="cpdc" style="max-width:520px">'+cpChipHTML(dt,k)+'</div>';document.body.appendChild(o);document.body.style.overflow='hidden';return;}
  if(a==='cpremind'){const v=((document.getElementById('cpRm')||{}).value||'').trim();if(!v)return;try{await DB.sendCoach(CP.cid,ME.id,v);CP.d=await DB.clientDetail(CP.cid);cpDayClose();toast('Mensaje enviado ✓');}catch(x){toast('No se pudo enviar');}return;}
  if(a==='cpwide'){CP.wide=!cpWideNow();coachRender();return;}
  if(a==='cpedit'){const date=t.dataset.v,dy=cpWith(()=>withDate(date,()=>ctxFor(date).d));if(!dy)return;cpDayClose();
    if(dy.x){const tk2=cxListOf(CP.d).find(x=>'x'+x.id===dy.id);if(!tk2)return;rtOpen('client',{cid:CP.cid,name:'Workout asignado',days:[tk2.day||(cxListOf(CP.d).find(q=>q.id===tk2.ref)||{}).day]});RT.xt=tk2.id;RT.sel=0;rtShow();}
    else{const ix=((CP.routine&&CP.routine.days)||[]).findIndex(x=>x.id===dy.id);if(ix<0){toast('No se encontró ese workout en el programa');return;}rtOpen('client',{cid:CP.cid,name:CP.routine.name,days:CP.routine.days});RT.sel=ix;rtShow();}
    return;}
  if(a==='cpcard'){const [date,sc]=t.dataset.v.split('|'),g=id=>((document.getElementById(id)||{}).value||'').trim(),mod=g('cpEm'),tier=g('cpEt'),mn=+g('cpEn')||0,tx=g('cpEx');
    try{
      if(sc==='day'){const task={id:cpTid(),date,type:'cardio',title:'Cardio',mod,tier,min:mn,text:tx,by:'coach',at:Date.now()};await cpSaveTasks(cxListOf(CP.d).filter(x=>!(x.date===date&&x.type==='cardio')).concat(task));toast('Cardio asignado para ese día ✓');}
      else{const dy=cpWith(()=>withDate(date,()=>ctxFor(date).d)),ix=dy?((CP.routine&&CP.routine.days)||[]).findIndex(x=>x.id===dy.id):-1;if(ix<0){toast('No se encontró ese workout en el programa');return;}
        CP.routine.days[ix].cardioDefault=mod;await DB.saveRoutine(CP.cid,CP.routine.name,CP.routine.days,ME.id);toast('Cardio del programa actualizado ✓');}
      cpDayClose();coachRender();}catch(x){console.warn(x);toast('No se pudo guardar el cardio');}return;}
  if(a==='cpdis'){const o=cpDisGet();o[t.dataset.k]=Date.now();cpDisSet(o);coachRender();return;}
  if(a==='cprestore'){CP.showDis=!CP.showDis;coachRender();return;}
  if(a==='cpundis'){const o=cpDisGet();delete o[t.dataset.k];cpDisSet(o);coachRender();return;}
  if(a==='cpview'){CP.cv=t.dataset.v;coachRender();return;}
  if(a==='cptnew'){CP.tm={date:t.dataset.v||today(),type:'workout'};cpTaskModal();return;}
  if(a==='cptclose'){CP.tm=null;cpTaskModal();return;}
  if(a==='cpbt'){CP.bt=t.dataset.v;const dc=document.querySelector('#cpdv .cpdc');if(dc&&CP.dayOpen)dc.innerHTML=cpDayHTML(CP.dayOpen);return;}
  if(a==='cpnewwk'){const date=(CP.tm&&CP.tm.date)||today();CP.tm=null;cpTaskModal();cpOpenNew(date,cpBlankDay());return;}
  if(a==='cpai'){const date=(CP.tm&&CP.tm.date)||today();CP.tm=null;cpTaskModal();CP.ai=null;cpAiModal(date);return;}
  if(a==='cpaino'){CP.ai=null;cpAiModal(null);return;}
  if(a==='cpaimin'){const b=document.getElementById('cpaiB');if(b)CP.ai.brief=b.value;CP.ai.min=+t.dataset.v;cpAiModal(CP.ai.date);return;}
  if(a==='cpaigo'){const m=CP.ai;if(!m||m.busy)return;const b=(document.getElementById('cpaiB')||{}).value||'';m.brief=b;if(b.trim().length<8){m.err='Cuéntame un poco más qué quieres entrenar.';cpAiModal(m.date);return;}
    m.busy=true;m.err='';cpAiModal(m.date);
    try{const r=await DB.aiWorkout({brief:b.trim(),minutes:m.min,goal:(CP.d.profile.goal||''),catalog:cpAiCatalog()});const day=cpAiDay((r&&r.plan)||{});
      if(!day.blocks.some(x=>!x.cardio&&x.items.length)){m.busy=false;m.err='La IA no devolvió ejercicios válidos. Intenta de nuevo.';cpAiModal(m.date);return;}
      const date=m.date;CP.ai=null;cpAiModal(null);cpOpenNew(date,day);toast('Borrador listo. Revísalo y guárdalo ✓');}
    catch(x){m.busy=false;const c=x&&x.code;m.err=c==='no_key'?'La IA aún no está activada: falta guardar la clave en Supabase (Edge Functions → Secrets → ANTHROPIC_API_KEY).':c==='solo_coach'?'Solo el coach puede usar esto.':'No se pudo generar. Intenta de nuevo en un momento.';cpAiModal(m.date);}
    return;}
  if(a==='cpmvno'){CP.mv=null;cpMvModal();return;}
  if(a==='cpmvdo'){await cpMvDo(t.dataset.m);return;}
  if(a==='cprep'){cpTmSync();CP.tm.rep=t.dataset.v==='1';if(CP.tm.rep&&!(CP.tm.rd||[]).length)CP.tm.rd=[wdOf(CP.tm.date)];cpTaskModal();return;}
  if(a==='cprd'){cpTmSync();const v=+t.dataset.v,r=CP.tm.rd||[];CP.tm.rd=r.includes(v)?r.filter(x=>x!==v):r.concat(v);cpTaskModal();return;}
  if(a==='cptype'){cpTmSync();CP.tm.type=CP.tm.type===t.dataset.v?'':t.dataset.v;cpTaskModal();return;}
  if(a==='cptprog'){CP.tm=null;cpTaskModal();cpDayClose();CP.tab='rutina';coachRender();return;}
  if(a==='cptdel'){const id=t.dataset.id,all=cxListOf(CP.d),tk0=all.find(x=>x.id===id)||{},date=tk0.date,whole=t.dataset.all==='1'&&tk0.series;try{
    let L=whole?all.filter(x=>x.series!==tk0.series):all.filter(x=>x.id!==id);
    if(!whole&&tk0.day){const nx=L.find(x=>x.ref===id);if(nx){L=L.map(x=>x.id===nx.id?Object.assign({},x,{day:tk0.day,ref:undefined}):(x.ref===id?Object.assign({},x,{ref:nx.id}):x));}}
    await cpSaveTasks(L);coachRender();if(date)cpDayOpen(date);toast('Tarea quitada ✓');}catch(x){toast('No se pudo quitar la tarea');}return;}
  if(a==='cptsave'){
    const m=CP.tm,type=m.type,date=(document.getElementById('cptD')||{}).value||m.date;let task={id:cpTid(),date,type,by:'coach',at:Date.now()};
    if(type==='workout'){const v=(document.getElementById('cptW')||{}).value;if(!v){toast('Elige el entrenamiento');return;}
      let day=null;if(v[0]==='p')day=(CP.routine.days||[])[+v.slice(2)];else{const tp=(RT.tpls||[]).find(x=>x.id===v.slice(2));day=tp&&tp.days[0];}
      if(!day){toast('No se encontró ese entrenamiento');return;}
      task.day=JSON.parse(JSON.stringify(day));task.title=day.name||day.label||'Workout';}
    else if(type==='note'){const tx=((document.getElementById('cptN')||{}).value||'').trim();if(!tx){toast('Escribe la nota');return;}task.text=tx;}
    else if(type==='cardio'){task.mod=(document.getElementById('cptCm')||{}).value||'camin_cam';task.tier=(document.getElementById('cptCt')||{}).value||'';task.min=+((document.getElementById('cptCn')||{}).value)||0;task.text=(((document.getElementById('cptCx')||{}).value)||'').trim();task.title='Cardio';}
    else if(type==='form'||type==='med'){task.type='form';task.form=t.dataset.f==='medidas'||type==='med'?'medidas':'chequeo';task.title=task.form==='medidas'?'Medidas antropométricas':'Chequeo quincenal';}
    else if(type!=='rest')return;
    cpTmSync();
    let dates=[date];if(m.rep){const until=(document.getElementById('cptU')||{}).value||m.until||addD(date,28),rd=(m.rd&&m.rd.length)?m.rd:[wdOf(date)];dates=[];for(let x=date,n=0;x<=until&&n<400;x=addD(x,1),n++)if(x===date||rd.includes(wdOf(x)))dates.push(x);if(dates.length>90){toast('Máximo 90 repeticiones. Acorta la fecha final.');return;}}
    const sid=dates.length>1?cpTid():null,news=dates.map((dt,i)=>{const o=Object.assign({},task,{id:i?cpTid():task.id,date:dt});if(sid)o.series=sid;if(type==='workout'&&i){delete o.day;o.ref=task.id;}return o;});
    try{const clash=(x,dt)=>x.date===dt&&((type==='rest'||type==='workout')&&(x.type==='rest'||x.type==='workout')||(type==='cardio'&&x.type==='cardio'));const keep=cxListOf(CP.d).filter(x=>!dates.some(dt=>clash(x,dt)));await cpSaveTasks(keep.concat(news));CP.tm=null;cpTaskModal();coachRender();cpDayOpen(date);toast('Tarea asignada ✓ El cliente la verá al abrir su app');}catch(x){console.warn(x);toast('No se pudo guardar la tarea');}return;}
  if(a==='cpdclose'){cpDayClose();return;}
  if(a==='cpcal'){const v=+t.dataset.v,vw=CP.cv||'mes',cd=CP.cd||today();
    if(!v)CP.cd=today();else if(vw==='sem')CP.cd=addD(cd,7*v);else if(vw==='dia')CP.cd=addD(cd,v);else{const [y,m]=cd.split('-').map(Number),n=new Date(y,m-1+v,1,12);CP.cd=n.getFullYear()+'-'+String(n.getMonth()+1).padStart(2,'0')+'-01';}
    coachRender();return;}
  if(a==='cpopen'){CP.err='';coachOpen(t.dataset.id);}
  else if(a==='cpchat'){CP.err='';try{localStorage.setItem('cpread_'+t.dataset.id,String(Date.now()));}catch(x){}coachOpen(t.dataset.id,'chat');}
  else if(a==='cpnav'){CP.sec=t.dataset.v;if(CP.sec==='lecc'){CP.ls=null;lessonsLoad(true);}if(CP.sec==='chat')cpInboxLoad();clearInterval(CP.poll);if(CP.view!=='list'){CP.view='list';}coachRender();}
  else if(a==='cppf'){CP.pf=t.dataset.v;coachRender();}
  else if(a==='cpback'){clearInterval(CP.poll);CP.err='';CP.sec='clientes';coachHome();}
  else if(a==='cptab'){CP.tab=t.dataset.v;coachRender();}
  else if(a==='cphreset'){const ok=document.getElementById('cphok');if(!ok||!ok.checked){toast('Marca "Entiendo" primero');return;}const tt=t.dataset.t,bl=(CP.d.blobs||[]).find(x=>x.key==='msSeen'),L=Array.isArray(bl&&bl.value)?bl.value:[];if(!confirm(tt==='*'?'¿Reiniciar TODOS los hitos de este cliente?':'¿Reiniciar el hito "'+tt+'"?'))return;const nx=tt==='*'?[]:L.filter(x=>x!==tt);try{await DB.upsert('client_data',[{client_id:CP.cid,key:'msSeen',value:nx,updated_at:new Date().toISOString()}],'client_id,key');if(tt==='*')await DB.upsert('client_data',[{client_id:CP.cid,key:'lvSeen',value:0,updated_at:new Date().toISOString()}],'client_id,key');if(bl)bl.value=nx;else CP.d.blobs.push({key:'msSeen',value:nx});CP.err='';coachRender();toast('Hito reiniciado ✓');}catch(x){CP.err='No se pudo reiniciar el hito.';coachRender();}}
  else if(a==='cpmod'){const cur=CP.d.profile.modules||[],v=t.dataset.v,nx=cur.includes(v)?cur.filter(x=>x!==v):cur.concat(v);try{await DB.updateClient(CP.cid,{modules:nx});CP.d.profile.modules=nx;CP.err='';coachRender();toast('Módulos actualizados ✓');}catch(x){CP.err='No se pudo actualizar.';coachRender();}}
  else if(a==='cparch'){const on=t.dataset.on==='1';if(on&&!confirm('¿Archivar a este cliente? Deja de entrar a la app y sale de tu lista. Puedes restaurarlo cuando quieras.'))return;try{await DB.archiveClient(CP.cid,on);if(CP.clients){const c=CP.clients.find(x=>x.id===CP.cid);if(c)c.status=on?'archived':'active';}CP.d=await DB.clientDetail(CP.cid);CP.err='';coachRender();toast(on?'Cliente archivado ✓':'Cliente restaurado ✓');}catch(x){console.warn(x);CP.err='No se pudo completar.';coachRender();}}
  else if(a==='cpdelacc'){const nm=((CP.d&&CP.d.profile&&CP.d.profile.full_name)||'este cliente');if(!confirm('¿Eliminar a '+nm+' y TODOS sus datos para siempre? No se puede deshacer.\n\nSi solo quieres sacarlo de tu lista, mejor usa "Archivar cliente".'))return;const w=prompt('Para confirmar, escribe ELIMINAR');if((w||'').trim().toUpperCase()!=='ELIMINAR'){toast('No se eliminó');return;}try{await DB.deleteClient(CP.cid);CP.clients=(CP.clients||[]).filter(x=>x.id!==CP.cid);CP.cid=null;CP.d=null;toast('Cliente eliminado');if(typeof coachHome==='function')await coachHome();else coachRender();}catch(x){console.warn(x);CP.err='No se pudo eliminar.';coachRender();}}
  else if(a==='cpresetall'){if(!confirm('¿Reiniciar TODO el perfil de este cliente? Vuelve al registro desde cero. No se puede deshacer.'))return;try{await DB.resetProfile(CP.cid);CP.d=await DB.clientDetail(CP.cid);CP.err='';coachRender();toast('Perfil reiniciado: al abrir la app empieza desde el registro ✓');}catch(x){console.warn(x);CP.err='No se pudo reiniciar.';coachRender();}}
  else if(a==='cpreset'){if(!confirm('¿Reiniciar registros y hitos de este cliente? No se puede deshacer.'))return;try{await DB.resetClient(CP.cid);CP.d=await DB.clientDetail(CP.cid);CP.err='';coachRender();toast('Registros reiniciados ✓');}catch(x){CP.err='No se pudo reiniciar.';coachRender();}}
  else if(a==='cpactivate'){try{await DB.updateClient(CP.cid,{status:'active'});CP.d.profile.status='active';const c=(CP.clients||[]).find(x=>x.id===CP.cid);if(c)c.status='active';CP.err='';coachRender();toast('Cuenta activada');pushTo&&pushTo(CP.cid,'¡Cuenta activada!','Ya puedes entrar a tu programa en ERRE.');}catch(x){CP.err='No se pudo activar.';coachRender();}}
  else if(a==='cpplan'){try{await DB.updateClient(CP.cid,{plan:t.dataset.v});CP.d.profile.plan=t.dataset.v;CP.err='';coachRender();toast('Plan actualizado');}catch(x){CP.err='No se pudo cambiar el plan.';coachRender();}}
  else if(a==='cpsend'){const i=document.getElementById('cpIn'),v=(i.value||'').trim();if(!v)return;i.value='';
    try{await DB.sendCoach(CP.cid,ME.id,v);CP.d=await DB.clientDetail(CP.cid);CP.err='';}catch(x){CP.err='No se pudo enviar el mensaje.';}coachRender();window.scrollTo(0,document.body.scrollHeight);}
  else if(a==='cpcall'){const d=document.getElementById('cpD').value,tm=document.getElementById('cpT').value;if(!d||!tm){toast('Elige fecha y hora');return;}
    try{const re=!!CP.d.call;await DB.scheduleCall(CP.cid,ME.id,new Date(`${d}T${tm}:00-05:00`).toISOString());
      await DB.sendCoach(CP.cid,ME.id,(re?'Reprogramé nuestra llamada 1:1: ':'Agendé nuestra llamada 1:1: ')+fmtCall({date:d,time:tm})+'. La puedes agregar a tu calendario desde tu Inicio.');
      CP.d=await DB.clientDetail(CP.cid);CP.err='';coachRender();toast('Llamada agendada. El cliente fue avisado ✓');}catch(x){CP.err='No se pudo agendar la llamada.';coachRender();}}
},true);

/* --- link de invitación Complete: ?plan=complete&c=CODIGO --- */
try{const mm=location.search.match(/[?&]c=([A-Za-z0-9]{4,20})/);if(mm&&/[?&]plan=complete/.test(location.search)){localStorage.setItem('erre_inv',mm[1].toUpperCase());LGINV=true;history.replaceState(history.state,'',location.pathname+location.hash);}}catch(e){}
var LGINV=LGINV||false;
async function enter(ses){
  ME=ses.user;const uid=ME.id;
  PROFILE=await DB.profile(uid);
  try{const inv=localStorage.getItem('erre_inv');if(inv&&PROFILE&&PROFILE.role==='client'){if(PROFILE.status==='pending'){const r=await DB.claimInvite(inv);if(r==='ok'){PROFILE=await DB.profile(uid);if(!S.user)S.cxInvite=true;}}localStorage.removeItem('erre_inv');}}catch(e){console.warn('invite',e);}try{await pushRefresh();}catch(e){console.warn('push',e);}
  if(store.get('erre_uid')!==uid){resetLocal();store.set('erre_uid',uid);}
  if(PROFILE.role==='coach'){await coachHome();return;}
  if(PROFILE.status==='archived'){$('#app').innerHTML=authHead()+`<h2 class="h2" style="margin-top:14px">Tu cuenta está en pausa</h2><p class="lead">Tu acceso está pausado por ahora. Escríbele a tu coach para retomarlo.</p><a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:14px;text-decoration:none" href="https://wa.me/${COACH_WA}?text=${encodeURIComponent('Hola Juanjo, quiero retomar mi cuenta en la app ('+(ME.email||'')+').')}" target="_blank" rel="noopener">Escribirle a mi coach</a><button class="lblbtn" data-act="pendout" style="display:block;margin:12px auto 0;color:var(--gray)">Cerrar sesión</button>`;return;}
  if(!PROFILE.consent_at){$('#app').innerHTML=consentView();return;}
  if(PROFILE.status==='pending'){await startClient();return;}/* pendiente: llena el formulario ya; al terminar ve «registro listo» */
  if(await accessGate())return;
  await startClient();
}
async function startClient(){
  await loadClientRoutine(ME.id);const d=await DB.load(ME.id);await applyRemote(d);
  try{const rb=(d.blobs||[]).find(b=>b.key==='reset');if(rb&&String(rb.value)!==localStorage.getItem('erre_reset_seen')){
    const df=typeof defaultsS==='function'?defaultsS():{};SLICES.forEach(k=>{if(k==='user')return;S[k]=(k==='msSeen'||k==='lvSeen'||k==='fidSeen')?undefined:(df[k]!==undefined?df[k]:{});LAST.slices[k]=null;});
    S.weights={};S.steps={};LAST.weights={};LAST.steps={};LAST.fb={};S.msSeen=null;S.lvSeen=undefined;localStorage.setItem('erre_reset_seen',String(rb.value));}}catch(e){console.warn('reset',e);}
  try{const ru=(d.blobs||[]).find(b=>b.key==='reset_user');if(ru&&String(ru.value)!==localStorage.getItem('erre_resetu_seen')){S.user=null;S.ob=null;S.assigned=null;LAST.slices.user=null;localStorage.setItem('erre_resetu_seen',String(ru.value));}}catch(e){console.warn('reset_user',e);}
  S.mods=PROFILE.modules||[];S.program=planOf(PROFILE);S.elite=PROFILE.plan==='elite';S.role='client';
  if(S.user){S.user.plan=S.program;}
  else{S.ob={step:'type',plan:S.program,form:{name:PROFILE.full_name||'',goals:['complete'],main:'complete',days:4,level:'Principiante',pain:'No',wd:[0,1,3,4],session:'60'}};}
  S.sel=today();store.set('erre_state',S);
  render();
  clearInterval(CHATT);CHATT=setInterval(()=>{if(document.visibilityState==='visible'){pullChat();if(needs)SYNC.dirty();}},30000);
  try{if(DB.onChat)DB.onChat(()=>{if(document.visibilityState==='visible')pullChat();});}catch(e){}
}
async function boot(){
  try{const ses=await DB.session();if(!ses){showLogin();return;}await enter(ses);}
  catch(e){console.warn('boot',e);LG.err='No pudimos conectar. Revisa tu internet e intenta de nuevo.';showLogin();}
}
window.addEventListener('online',()=>SYNC.dirty());
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&ME&&PROFILE&&PROFILE.role!=='coach'){clearTimeout(tmr);SYNC.flush();}});
window.addEventListener('pagehide',()=>{if(ME&&PROFILE&&PROFILE.role!=='coach'){clearTimeout(tmr);SYNC.flush();}});
document.addEventListener('click',async e=>{
  const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='lgsend'){const em=((document.getElementById('lgEmail')||{}).value||'').trim().toLowerCase();const pw=(document.getElementById('lgPass')||{}).value||'';
    LG.email=em;
    if(!/^\S+@\S+\.\S+$/.test(em)){LG.err='Escribe un correo válido.';showLogin();return;}
    if(!pw){LG.err='Escribe tu contraseña.';showLogin();return;}
    LG.err='';LG.busy=true;showLogin();
    try{const ses=await DB.signIn(em,pw);LG.busy=false;await enter(ses);}
    catch(x){LG.busy=false;LG.err=/invalid|credentials/i.test(x.message||'')?'Correo o contraseña incorrectos.':'No pudimos entrar. Revisa tu conexión e intenta de nuevo. ('+String((x&&x.message)||x).slice(0,90)+')';console.warn('login',x);showLogin();}}
  else if(a==='lgsignmode'){LG.mode='signup';LG.err='';LG.ok='';showLogin();}
  else if(a==='lgsignup'){const g=id=>((document.getElementById(id)||{}).value||'').trim();const nm=g('lgName'),em=g('lgEmail').toLowerCase(),pw=(document.getElementById('lgPass')||{}).value||'';
    LG.name=nm;LG.email=em;
    if(nm.length<2){LG.err='Escribe tu nombre.';showLogin();return;}
    if(!/^\S+@\S+\.\S+$/.test(em)){LG.err='Escribe un correo válido.';showLogin();return;}
    if(pw.length<6){LG.err='La contraseña debe tener al menos 6 caracteres.';showLogin();return;}
    if(pw!==((document.getElementById('lgPass2')||{}).value||'')){LG.err='Las contraseñas no coinciden. Escríbelas igual en los dos campos.';showLogin();return;}
    LG.err='';LG.busy=true;showLogin();
    try{const r=await DB.signUp(em,pw,nm);LG.busy=false;
      if(r.session){LG.mode='';await enter(r.session);}
      else if(r.user&&r.user.identities&&!r.user.identities.length){LG.mode='';LG.err='Ese correo ya tiene cuenta. Entra con tu contraseña o usa «¿Olvidaste tu contraseña?».';showLogin();}
      else{LG.mode='';LG.ok='Cuenta creada. Revisa tu correo para confirmarla y luego entra aquí con tu contraseña.';showLogin();}}
    catch(x){LG.busy=false;const m=x.message||'';LG.err=/already|registered/i.test(m)?'Ese correo ya tiene cuenta. Entra con tu contraseña.':/rate|limit/i.test(m)?'Demasiados intentos. Espera unos minutos.':/password/i.test(m)?'Contraseña muy débil. Usa al menos 6 caracteres.':'No pudimos crear la cuenta. Intenta de nuevo.';showLogin();}}
  else if(a==='pendchk'){try{PROFILE=await DB.profile(ME.id);if(PROFILE.status==='pending'){toast('Aún no vemos tu pago. Puede tardar unos minutos.');}else{await enter({user:ME});}}catch(x){toast('No pudimos revisar. Intenta de nuevo.');}}
  else if(a==='pendout'){try{await DB.signOut();}catch(x){}location.reload();}
  else if(a==='lgforgot'){LG.mode='forgot';LG.err='';LG.ok='';const v=((document.getElementById('lgEmail')||{}).value||'').trim();if(v)LG.email=v;showLogin();}
  else if(a==='lgback'){LG.mode='';LG.err='';LG.ok='';showLogin();}
  else if(a==='lgcode'){const em=((document.getElementById('lgEmail')||{}).value||'').trim().toLowerCase();LG.email=em;
    if(!/^\S+@\S+\.\S+$/.test(em)){LG.err='Escribe un correo válido.';showLogin();return;}
    LG.err='';LG.busy=true;showLogin();
    try{await DB.sendCode(em);}catch(x){console.warn('sendCode',x);}
    LG.busy=false;LG.mode='code';LG.ok='Si ese correo tiene cuenta, te enviamos un código.';showLogin();}
  else if(a==='lgverify'){const cd=((document.getElementById('lgCode')||{}).value||'').replace(/\s+/g,'');if(!cd){LG.err='Escribe el código.';showLogin();return;}
    LG.err='';LG.ok='';LG.busy=true;showLogin();
    try{const ses=await DB.verify(LG.email,cd);LG.busy=false;LG.mode='';await enter(ses);toast('Listo. Cambia tu contraseña en Perfil → Mi cuenta');}
    catch(x){LG.busy=false;LG.err='Código incorrecto o vencido. Pide uno nuevo.';showLogin();}}
  else if(a==='consent'){if(!document.getElementById('cons').checked){toast('Marca la casilla para continuar');return;}
    try{const ts=new Date().toISOString();await DB.saveProfile(ME.id,{consent_at:ts});PROFILE.consent_at=ts;await startClient();}catch(x){toast('No pudimos guardar. Intenta de nuevo.');}}
  else if(a==='chat'){pullChat();}
},true);

document.addEventListener('input',e=>{if(e.target.id==='cpQ'&&PROFILE&&PROFILE.role==='coach'&&CP.view==='list'){CP.q=e.target.value;coachRender(true);}});

document.addEventListener('dragstart',e=>{const t=e.target.closest&&e.target.closest('[data-drag]');if(!t)return;e.dataTransfer.setData('text/plain',t.dataset.drag);e.dataTransfer.effectAllowed='move';t.classList.add('dragging');});
document.addEventListener('dragend',e=>{document.querySelectorAll('.dragging,.dropon').forEach(x=>x.classList.remove('dragging','dropon'));});
document.addEventListener('dragover',e=>{const z=e.target.closest&&e.target.closest('[data-drop]');if(!z)return;e.preventDefault();document.querySelectorAll('.dropon').forEach(x=>x!==z&&x.classList.remove('dropon'));z.classList.add('dropon');});
document.addEventListener('drop',async e=>{const z=e.target.closest&&e.target.closest('[data-drop]');if(!z||!PROFILE||PROFILE.role!=='coach')return;e.preventDefault();z.classList.remove('dropon');
  const v=e.dataTransfer.getData('text/plain')||'',kind=v.slice(0,2),id=v.slice(2),dest=z.dataset.drop||null;
  try{
    if(kind==='t:'){await DB.moveTemplate(id,dest);}
    else if(kind==='f:'){if(id===dest)return;let p=RT.fo.find(x=>x.id===dest);while(p){if(p.id===id){toast('No puedes meter una carpeta dentro de sí misma');return;}p=RT.fo.find(x=>x.id===p.parent_id);}await DB.moveFolder(id,dest);}
    else return;
    await rtLoadTpls();coachRender();toast('Movido ✓');
  }catch(x){toast('No se pudo mover');}
});

/* ---------- hitos, pasos y efectos ---------- */
const sndOn=()=>{try{return localStorage.getItem('erre_mute')!=='1';}catch(e){return true;}};
function chime(kind){
  if(!sndOn())return;try{try{window._sil=window._sil||new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=');_sil.loop=true;_sil.play().catch(()=>{});clearTimeout(_sil._t);_sil._t=setTimeout(()=>{try{_sil.pause();}catch(e){}},2500);}catch(e){}const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const c=window._ac=window._ac||new A();if(c.state==='suspended')c.resume();
    const N=kind==='soft'?[880,1175]:[784,1047,1319],t0=c.currentTime;
    N.forEach((f,i)=>{const o=c.createOscillator(),gn=c.createGain();o.type='sine';o.frequency.value=f;gn.gain.setValueAtTime(0.0001,t0+i*.11);gn.gain.exponentialRampToValueAtTime(.25,t0+i*.11+.02);gn.gain.exponentialRampToValueAtTime(.0001,t0+i*.11+.55);o.connect(gn);gn.connect(c.destination);o.start(t0+i*.11);o.stop(t0+i*.11+.6);});
  }catch(e){}
}
const buzz=p=>{try{navigator.vibrate&&navigator.vibrate(p);}catch(e){}};
function confetti(host,n){
  const cols=['#C0392B','#1C1B19','#B98A3C','#DCD6CC','#96271B'];let h='';
  for(let i=0;i<(n||26);i++){const x=(Math.random()*100).toFixed(1),d=(Math.random()*.5).toFixed(2),r=Math.round(Math.random()*360),w=6+Math.round(Math.random()*6);h+=`<i style="left:${x}%;background:${cols[i%cols.length]};width:${w}px;height:${w*1.6}px;animation-delay:${d}s;--r:${r}deg"></i>`;}
  const d=document.createElement('div');d.className='confetti';d.innerHTML=h;host.appendChild(d);setTimeout(()=>d.remove(),2600);
}
let msBusy=false;
function msSoon(){try{applyFid();}catch(e){}clearTimeout(msSoon.t);msSoon.t=setTimeout(()=>{checkMilestones();setTimeout(checkFid,400);},900);}
function checkMilestones(){
  if(msBusy||!S||S.role==='coach'||typeof gam!=='function'||!S.user)return;
  let g,ms;try{g=gam();ms=milestones(g);}catch(e){return;}
  const done=ms.filter(m=>m.v>=m.n);
  if(!S.msSeen){S.msSeen=done.map(m=>m.t);S.lvSeen=g.li;store.set('erre_state',S);return;}
  const fresh=done.filter(m=>!S.msSeen.includes(m.t)),up=g.li>(S.lvSeen||0);
  if(!fresh.length&&!up)return;
  S.msSeen=Array.from(new Set((S.msSeen||[]).concat(done.map(m=>m.t))));S.lvSeen=Math.max(S.lvSeen||0,g.li);store.set('erre_state',S);showMilestone(fresh,up?{n:g.li+1,name:g.name}:null);
}
function showMilestone(list,lv){
  msBusy=true;const top=lv&&!list.length?null:list[0];
  const el=document.createElement('div');el.id='msov';el.className='msov';
  const more=list.slice(1);
  el.innerHTML=`<div class="msbox"><div class="msico">${lv&&!top?'⭐':top.i}</div><small class="mskick">${lv&&!top?'Subiste de nivel':'Hito logrado'}</small>
   <h3>${lv&&!top?'Nivel '+lv.n+' · '+lv.name:top.t}</h3>
   <p>${lv&&!top?'Tu constancia te llevó más lejos. Así se construye el hábito.':'Lo lograste con tu constancia. Un paso más hacia tu mejor versión.'}</p>
   ${list.length?`<div class="mspts">+${list.reduce((a,m)=>a+(m.p||0),0)} puntos</div>`:''}
   ${more.length?`<div class="msmore">También lograste: ${more.map(m=>m.i+' '+m.t).join(' · ')}</div>`:''}
   ${lv&&top?`<div class="msmore">⭐ Y subiste al <b>Nivel ${lv.n} · ${lv.name}</b></div>`:''}
   <button class="btn solid" data-act="mshare" data-t="${esc(lv&&!top?'Nivel '+lv.n+' · '+lv.name:top.t)}" data-i="${lv&&!top?'⭐':top.i}" data-k="${lv&&!top?'Subí de nivel':'Hito logrado'}" style="width:100%;margin-top:14px;padding:13px">📤 Compartir en mis historias</button>
   <button class="btn" data-act="prog" style="width:100%;margin-top:8px">Ver mis hitos</button>
   <button class="btn" data-act="msclose" style="width:100%;margin-top:8px">Seguir</button>
   <button class="lblbtn" data-act="msmute" style="margin-top:8px;color:var(--gray)">${sndOn()?'🔔 Sonido activado':'🔕 Sonido apagado'}</button></div>`;
  document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('on'));confetti(el.firstChild,34);chime();buzz([40,60,40]);
  try{if(typeof isC==='function'&&isC()&&ME&&DB.insertChat){const txt=[].concat(list.map(m=>m.i+' '+m.t),lv?['⭐ Subió al Nivel '+lv.n+' · '+lv.name]:[]).join(' · ');DB.insertChat({client_id:ME.id,sender_id:ME.id,kind:'hito',body:'Hito logrado: '+txt}).catch(()=>{});}}catch(e){}
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('#msov [data-act]');
  if(!t)return;
  const a=t.dataset.act;
  if(a==='msmute'){try{localStorage.setItem('erre_mute',sndOn()?'1':'0');}catch(x){}t.textContent=sndOn()?'🔔 Sonido activado':'🔕 Sonido apagado';if(sndOn())chime('soft');return;}
  const ov=document.getElementById('msov');if(ov){ov.remove();msBusy=false;}
});
/* pasos: anillo + deslizador */
function stepsUpdate(first){
  const g=S.stepGoal,v=ts_,p=Math.min(1,v/g),C=2*Math.PI*68,arc=document.getElementById('sarc');if(!arc)return;
  arc.style.strokeDashoffset=(C*(1-p)).toFixed(1);const ok=v>=g;arc.classList.toggle('ok',ok);
  const num=document.getElementById('snum');if(num)num.textContent=v.toLocaleString('es-CO');
  const pc=document.getElementById('spct');if(pc)pc.textContent=Math.round(v/g*100)+'% de tu meta';
  const msg=document.getElementById('smsg');
  if(msg)msg.textContent=v<=0?'Mueve el deslizador o toca un botón':ok?(v>=g*1.25?'Día de campeón. Te pasaste de la meta 🔥':'¡Meta cumplida! 🎉'):v>=g*.7?`¡Casi! Te faltan ${(g-v).toLocaleString('es-CO')}`:v>=g*.35?'Buen ritmo, sigue sumando':'Cada paso suma 👟';
  const sl=document.getElementById('sslide');if(sl&&+sl.value!==v)sl.value=v;
  const box=document.getElementById('sring');if(box){const was=box.dataset.ok==='1';if(ok&&!was&&!first){box.classList.remove('bump');void box.offsetWidth;box.classList.add('bump');buzz(30);chime('soft');if(box.parentElement)confetti(box,18);}box.dataset.ok=ok?'1':'0';}
}
function showSteps(){
  const g=S.stepGoal,C=2*Math.PI*68,mx=Math.max(Math.ceil(g*1.6/500)*500,Math.ceil((ts_+2000)/500)*500);
  sheet(`<h3>Pasos diarios</h3><div class="sub">${fmtL(S.sel)} · meta: ${g.toLocaleString('es-CO')} pasos</div>
   <div class="sring" id="sring" data-ok="${ts_>=g?'1':'0'}"><svg viewBox="0 0 160 160"><circle class="bgc" cx="80" cy="80" r="68"/><circle id="sarc" class="arc" cx="80" cy="80" r="68" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}" transform="rotate(-90 80 80)"/></svg>
    <div class="sin"><span class="sfoot">👟</span><b id="snum">0</b><small id="spct"></small></div></div>
   <div class="smsg" id="smsg"></div>
   <input type="range" id="sslide" class="sslide" min="0" max="${mx}" step="100" value="${ts_}" aria-label="Pasos">
   <div class="chips" style="justify-content:center;margin-top:10px"><button class="chip" data-act="sstep" data-d="-500">−500</button><button class="chip" data-act="sstep" data-d="500">+500</button><button class="chip" data-act="sstep" data-d="1000">+1.000</button><button class="chip" data-act="sstep" data-d="2500">+2.500</button></div>
   <div class="wr" style="margin:10px 0"><input id="stype" inputmode="numeric" placeholder="O escribe el total del día: 8500"></div>
   <div class="note">⌚ Reloj o celular (Apple Salud, Google Fit, Garmin…): <b>próximamente</b>. Por ahora anota el total que ves en tu reloj.</div>
   <div class="wr" style="margin:10px 0"><input id="sgoal" inputmode="numeric" placeholder="Meta (pasos)" value="${g}"><button class="btn" data-act="sgoalsave">Cambiar meta</button></div>
   <button class="btn solid" data-act="sok" style="width:100%;padding:14px">Registrar ✓</button>`);
  stepsUpdate(true);
}
document.addEventListener('input',e=>{
  if(e.target.id==='sslide'){ts_=parseInt(e.target.value)||0;stepsUpdate();if(ts_%1000===0)buzz(8);}
  else if(e.target.id==='stype'){const v=parseInt(e.target.value);if(v>=0){ts_=v;stepsUpdate();}}
});
function celebrateSteps(){
  celebrateSteps0();const n=S.steps[S.sel],ok=n>=S.stepGoal,host=document.querySelector('#sheet .celeb');
  if(host){const b=host.querySelector('h3');if(b){let k=0;const end=n,st=Math.max(1,Math.round(end/30));const iv=setInterval(()=>{k=Math.min(end,k+st);b.textContent=k.toLocaleString('es-CO')+' pasos';if(k>=end)clearInterval(iv);},22);}
    if(ok){confetti(host,28);chime('soft');buzz([30,40,30]);}}
}

/* ---------- hoja previa al entrenamiento ---------- */
function preDur(d,wk){
  let min=6;
  ['main','acc'].forEach(k=>{const b=d.blocks.find(x=>x.k===k);if(!b)return;b.items.forEach(it=>{let p;try{p=presc(it);}catch(e){return;}const rs=(typeof restSecs==='function'?restSecs(it):90);min+=(p.sets||2)*(rs+40)/60;});});
  const wb=d.blocks.find(x=>x.k==='warm');if(wb)min+=Math.min(8,(wb.items||[]).length*1.2);
  return Math.max(15,Math.round(min/5)*5);
}
function preOpen(k){
  if(k!=='g_fuerza'&&k!=='g_cardio'&&k!=='g_calm')return false;
  if(S.fb&&S.fb[fbKey(k)])return false;
  if(ipActive()&&S.tw===k&&S.tgD===today())return false;
  const d=DAYS[S.day];if(!d)return false;
  if(k==='g_fuerza'){S.pv='g_fuerza';S.pvW=false;save();render();window.scrollTo(0,0);return true;}
  const P=PERIOD[S.program],wk=Math.min(S.week,P.weeks);
  let title,sub,desc;
  if(k==='g_fuerza'){
    const nM=(d.blocks.find(x=>x.k==='main')||{items:[]}).items.length,nA=(d.blocks.find(x=>x.k==='acc')||{items:[]}).items.length;
    title=`Rutina ${S.pos+1} · ${d.name}`;sub=`Semana ${wk} de ${P.weeks}`;
    desc=`Calentamiento, ${nM} ejercicios centrales y ${nA} accesorios. Mantén una técnica controlada y registra tus series.`;
  }else if(k==='g_calm'){
    const nC=((d.blocks.find(x=>x.k==='calm')||{items:[]}).items||[]).length;
    title='Vuelta a la calma';sub=`Semana ${wk} de ${P.weeks}`;
    desc=`${nC?nC+' estiramientos':'Estiramientos'} y respiración para bajar el ritmo y empezar a recuperar. Sin prisa: respira profundo en cada posición.`;
  }else{
    const t=cxTier(CARDIO[S.goal][wk-1]);
    title='Cardio de hoy';sub=`Semana ${wk} de ${P.weeks} · ${t?DUR[t]:'15–35 min'}`;
    desc=t?`${t} · Zona ${TIERZONE[t]}. Un ritmo en el que puedas mantener el control de tu respiración.`:'Semana de NEAT: movimiento suave en zonas 1–2, sin buscar intensidad.';
  }
  sheet(`<div class="prehd"><small>${k==='g_fuerza'?'Entrenamiento de fuerza':k==='g_calm'?'Vuelta a la calma':'Cardio'}</small><h3>${esc(title)}</h3><div class="presub">${esc(sub)}</div><p class="predesc">${esc(desc)}</p></div>
   <button class="btn solid" data-act="prestart" data-b="${k}" style="width:100%;padding:14px">${k==='g_fuerza'?'Comenzar entrenamiento':k==='g_calm'?'Comenzar vuelta a la calma':'Comenzar cardio'}</button>
   <button class="btn" data-act="prelist" data-b="${k}" style="width:100%;margin-top:8px">${k==='g_fuerza'?'Ver ejercicios':k==='g_calm'?'Ver estiramientos':'Ver opciones de cardio'}</button>`);
  return true;
}
function preList(k){
  const d=DAYS[S.day];let h='';
  if(k==='g_fuerza'){
    const BN={warm:'Calentamiento',main:'Rutina central',acc:'Accesorios'};
    ['warm','main','acc'].forEach(bk=>{const b=d.blocks.find(x=>x.k===bk);if(!b||!b.items.length)return;
      h+=`<div class="grp" style="margin-top:12px">${BN[bk]}</div>`+b.items.map((it,i)=>{const id=curEx(d,bk,i,it),e=E[id]||{};let p={};try{p=presc(it);}catch(x){}
        const meta=bk==='warm'?((it.fixed&&it.fixed.reps)||''):(p.sets?`${p.sets} series · ${p.reps||''} reps`:'');
        return `<div class="prerow">${typeof thumb==='function'?thumb(id):''}<span><b>${esc(e.n||id)}</b><small>${esc(meta)}</small></span></div>`;}).join('');});
  }else if(k==='g_calm'){
    const b=d.blocks.find(x=>x.k==='calm');
    h=((b&&b.items)||[]).map((it,i)=>{const id=curEx(d,'calm',i,it),e=E[id]||{},m=(it.fixed&&it.fixed.reps)||'';return `<div class="prerow">${typeof thumb==='function'?thumb(id):''}<span><b>${esc(e.n||id)}</b><small>${esc(m)}</small></span></div>`;}).join('')||'<div class="prerow"><span><b>Estiramientos y respiración</b></span></div>';
  }else{
    const dflt=d.cardioDefault;
    h=Object.entries(CMODS).sort((a,b)=>(b[0]===dflt)-(a[0]===dflt)).map(([id,x])=>`<div class="prerow${id===dflt?' coach':''}"><span><b>${esc(x.n)}</b>${id===dflt?'<small>Tu coach lo eligió para hoy</small>':''}</span>${id===dflt?'<em class="coachtag">Elegida por el coach hoy</em>':''}</div>`).join('');
  }
  sheet(`<h3>${k==='g_fuerza'?'Ejercicios de hoy':k==='g_calm'?'Estiramientos de hoy':'Opciones de cardio'}</h3><div class="presheet">${h}</div>
   <button class="btn solid" data-act="prestart" data-b="${k}" style="width:100%;padding:14px;margin-top:12px">${k==='g_fuerza'?'Comenzar entrenamiento':k==='g_calm'?'Comenzar vuelta a la calma':'Comenzar cardio'}</button>
   <button class="btn" data-act="preback" data-b="${k}" style="width:100%;margin-top:8px">Atrás</button>`);
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('#sheet [data-act^="pre"]');if(!t)return;const a=t.dataset.act,k=t.dataset.b;
  if(a==='prestart'){closeSheet();S.tg=k;save();render();window.scrollTo(0,0);}
  else if(a==='prelist')preList(k);
  else if(a==='preback')preOpen(k);
});
/* ---------- progreso: desplegables ---------- */
const MS_CATS=[['Entrenamientos',0,6],['Semanas completas',6,9],['Rachas',9,15],['Día perfecto',15,18],['Respiración',18,21],['Hábitos',21,24],['Alimentación',24,27],['Peso',27,30],['Pasos',30,33],['Cardio',33,36],['Fotos',36,38],['Tiempo con ERRE',38,41]];
function pgSec(key,title,badge,inner,def){
  const open=S.exp[key]===undefined?!!def:!!S.exp[key];
  return `<section class="pgs"><button class="pgh" data-act="pgtog" data-k="${key}"><span><b>${title}</b>${badge?`<small>${badge}</small>`:''}</span><i>${open?'⌃':'⌄'}</i></button>${open?`<div class="pgb">${inner}</div>`:''}</section>`;
}
function progBody(g,ms,nxt){
  const top=LEVELS[LEVELS.length-1],pctTotal=Math.min(100,Math.round(g.xp/top[0]*100));
  const lv=`<div class="note" style="margin:0 0 10px">Meta final: <b>${top[1]}</b> · ${top[0].toLocaleString('es-CO')} puntos. Llevas ${g.xp.toLocaleString('es-CO')} (${pctTotal}%).</div><div class="progress" style="margin:0 0 12px"><i style="width:${pctTotal}%"></i></div>
   <div class="lvl">${LEVELS.map((l,i)=>{const st=i<g.li?'done':i===g.li?'cur':'lock';return `<div class="lvr ${st}"><span class="lvn">${ICON('l'+i,18)}</span><span><b>${l[1]}</b><small>${i===0?'Desde el inicio':l[0].toLocaleString('es-CO')+' puntos'}${st==='cur'?' · estás aquí':''}${st==='lock'?' · te faltan '+(l[0]-g.xp).toLocaleString('es-CO'):''}</small></span></div>`;}).join('')}</div>
   <button class="lblbtn" data-act="lvinfo" style="color:var(--gray);margin-top:8px">¿Cómo se ganan puntos? ›</button>`;
  const stats=`<div class="stats"><div><small>Racha</small><b>${g.streak} d</b></div><div><small>Mejor racha</small><b>${g.best} d</b></div><div><small>Entrenamientos</small><b>${g.nT}</b></div></div>
   <div class="stats"><div><small>Esta semana</small><b>${g.wt}/${g.wp}</b></div><div><small>Días cumplidos</small><b>${g.okDays}</b></div><div><small>Días con meta de pasos</small><b>${g.stepsOk}</b></div></div>`;
  const nx=nxt?`<div class="nxt"><span class="mi">${nxt.i}</span><div><b>${nxt.t}</b><div class="progress" style="margin:6px 0 2px"><i style="width:${Math.round(nxt.v/nxt.n*100)}%"></i></div><small>${nxt.v} de ${nxt.n} · +${nxt.p||0} pts</small></div></div>`:'';
  const doneN=ms.filter(m=>m.v>=m.n).length;
  const MAC=[['🏋️ Entrenamiento',[['Fuerza','fu'],['Cardio','ca'],['Vuelta a la calma','vc']]],['🥗 Alimentación',[['Alimentación','al']]],['🌿 Hábitos',[['Hábitos','ha'],['Pasos diarios','pa'],['Peso','pe'],['Check-ins','ck']]],['🫁 Respiración',[['Respiración','re']]],['⭐ Adicionales',[['Semanas completas','sw'],['Rachas generales','rg'],['Día perfecto','dp'],['Fotos','fo'],['Tiempo con ERRE','te']]]];
  const RK={fu:[g.sF,g.bF],ca:[g.sC,g.bC],re:[g.sR,g.bR],ha:[g.sH,g.bH],al:[g.sA,g.bA],rg:[g.streak,g.best]};
  const item=m=>`<div class="m${m.v>=m.n?' on':''}"${m.v>=m.n?` data-act="mshare" data-t="${esc(m.t)}" data-i="${m.i}" data-k="Hito logrado"`:''}><span class="mi">${m.i}</span><b>${m.t}</b>${m.v>=m.n?`<small>Logrado ✓ · +${m.p||0} pts · Compartir ↗</small>`:`<small>+${m.p||0} pts · ${Math.min(m.v,m.n)} de ${m.n}</small>`}</div>`;
  const msx=MAC.map(([mn,subs])=>{const all=ms.filter(m=>subs.some(x=>x[1]===m.c)),d=all.filter(m=>m.v>=m.n).length;
    const inner=subs.map(([sn,ck])=>{const L=ms.filter(m=>m.c===ck);if(!L.length)return '';const r=RK[ck];
      return `<div class="mcat"><b>${sn}</b>${r?`<span>🔥 Racha ${r[0]||0} · mejor ${r[1]||0}</span>`:''}</div><div class="ms">${L.map(item).join('')}</div>`;}).join('');
    return pgSec('pg.m.'+mn,mn,`${d} de ${all.length}`,inner,false);}).join('');
  return `${nxt?`<h2 class="h2">Siguiente hito</h2>${nx}`:''}
   ${fidSince()&&PROFILE&&S.role!=='coach'?pgSec('pg.fid','Mi tiempo con ERRE',fidSpan(fidMonths(fidSince())),fidBody(),false):''}
   ${pgSec('pg.lv','Niveles',`Nivel ${g.li+1} de ${LEVELS.length} · ${g.name}`,lv,false)}
   ${pgSec('pg.st','Mis números',`Racha ${g.streak} d · ${g.nT} entrenamientos`,stats,false)}
   <h2 class="h2">Hitos <small style="font-weight:400;color:var(--gray)">${doneN} de ${ms.length}</small></h2>${msx}`;
}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pgtog"]');if(!t)return;const k=t.dataset.k;S.exp[k]=!(S.exp[k]===undefined?false:S.exp[k]);save();render();});

/* ---- borrador del editor de rutinas ---- */
const DRAFT_K='erre_rt_draft';
const draftGet=()=>{try{return JSON.parse(localStorage.getItem(DRAFT_K)||'null');}catch(e){return null;}};
const draftClear=()=>{try{localStorage.removeItem(DRAFT_K);}catch(e){}};
setInterval(()=>{try{if(typeof RT!=='undefined'&&RT.open&&RT.dirty&&!RT.xt&&!RT.xtn&&PROFILE&&PROFILE.role==='coach'){localStorage.setItem(DRAFT_K,JSON.stringify({kind:RT.kind,id:RT.id,cid:RT.cid,tkind:RT.tkind,folder:RT.folder,name:RT.name,days:RT.days,sel:RT.sel,at:Date.now(),me:ME&&ME.id}));}}catch(e){}},2500);
function draftBanner(){
  if(typeof RT!=='undefined'&&RT.open)return '';
  const d=draftGet();if(!d||!d.days||(ME&&d.me&&d.me!==ME.id))return '';
  const mins=Math.max(1,Math.round((Date.now()-d.at)/60000)),ago=mins<60?mins+' min':mins<1440?Math.round(mins/60)+' h':Math.round(mins/1440)+' d';
  return `<div class="draftbar"><span><b>Borrador sin terminar</b><small>${esc(d.name||'Sin nombre')} · hace ${ago}${d.kind==='client'?' · rutina de cliente':''}</small></span><button class="btn solid" data-act="draftgo">Continuar</button><button class="btn" data-act="draftno">Descartar</button></div>`;
}
document.addEventListener('click',async e=>{
  const t=e.target.closest&&e.target.closest('[data-act="draftgo"],[data-act="draftno"]');if(!t)return;e.stopPropagation();
  const d=draftGet();
  if(t.dataset.act==='draftno'){if(confirm('¿Descartar el borrador?')){draftClear();coachRender();}return;}
  if(!d)return;
  if(d.kind==='client'&&d.cid){try{await coachOpen(d.cid);}catch(x){}}
  rtOpen(d.kind,{tkind:d.tkind,folder:d.folder,id:d.id,cid:d.cid,name:d.name,days:d.days});RT.dirty=true;RT.sel=Math.min(d.sel||0,RT.days.length-1);rtShow();
},true);

/* ---- Esfuerzo por serie: 3 niveles (Fácil / Ideal / Máximo) como la app de Jeremy ---- */
const RLV=[{v:7,n:'Fácil',w:'Fácil',rir:'RIR 3 o más',d:'Podrías haber hecho al menos 3 repeticiones más',c:'#3FA796'},
  {v:8,n:'Ideal',w:'Ideal',rir:'RIR 1 a 3',d:'Podrías haber hecho entre 1 y 3 repeticiones más',c:'#D4A937'},
  {v:10,n:'Esfuerzo máximo',w:'Máx.',rir:'RIR 0',d:'No podrías hacer más repeticiones con buena técnica',c:'#C0392B'}];
const rpeLv=v=>!v?null:(v<=7?RLV[0]:v<=9?RLV[1]:RLV[2]);
function rpeFace(v){const L=rpeLv(Math.round(v||0));return L?`<span class="rdot" style="background:${L.c}"></span><span>${L.w}</span>`:'<span class="rdot nil"></span>';}
const RS={k:null,s:0,mark:false};
function rpeClose(){const e=document.getElementById('rpesh');if(e)e.remove();}
function rpeOpen(k,s,mark){
  rpeClose();RS.k=k;RS.s=s;RS.mark=mark;
  const cur=rpeLv(Math.round(((S.logs[k]||[])[s]||{}).rpe||0));
  const d=document.createElement('div');d.id='rpesh';
  d.innerHTML=`<div class="rpbg" data-act="rpclose"></div><div class="rpbox"><div class="rphd"><div><b>Calificar nivel de esfuerzo</b><small>${mark?'Obligatorio para completar la serie':'Cambia tu calificación de esta serie'}</small></div><button class="rpx" data-act="rpclose" aria-label="Cerrar">${ICON('close',20)}</button></div>
  ${RLV.map(L=>`<button class="rpo${cur&&cur.v===L.v?' on':''}" data-act="rppick" data-v="${L.v}" style="--c:${L.c}"><i></i><span><b>${L.n.toUpperCase()}</b>${L.d}<em>${L.rir}</em></span></button>`).join('')}
  <div class="rpft">${ICON('bulb',20)}<span>Tu calificación de esfuerzo es clave para decidir cuándo subir el peso. Mira tu "Última vez" y trata de superarla.</span></div></div>`;
  document.body.appendChild(d);
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act="rpeo"],[data-act="rppick"],[data-act="rpclose"]');if(!t)return;e.stopPropagation();e.preventDefault();
  const a=t.dataset.act;
  if(a==='rpclose'){rpeClose();return;}
  if(a==='rpeo'){rpeOpen(t.dataset.k,+t.dataset.s,false);return;}
  const k=RS.k,s=RS.s,mark=RS.mark;if(k==null)return;
  const L=S.logs[k]=S.logs[k]||[];L[s]=L[s]||{};L[s].rpe=+t.dataset.v;
  rpeClose();save();render();
  if(!L[s].done&&(mark||(L[s].kg!=null&&L[s].reps!=null))){const b=document.querySelector('[data-act="done"][data-k="'+k+'"][data-s="'+s+'"]');if(b)b.click();}
},true);

/* ---- entrenamiento en curso (como la app de Jeremy) ---- */
const IPN={g_fuerza:'Entrenamiento de fuerza',g_cardio:'Cardio',g_calm:'Vuelta a la calma'};
function ipActive(){return !!(S.tw&&S.tgD===today()&&!(S.fb&&S.fb[fbKey(S.tw)]));}
const ipTime=()=>{const s=Math.max(0,Math.round((Date.now()-(S.tgAt||Date.now()))/1000));return s>=60?Math.floor(s/60)+' min '+String(s%60).padStart(2,'0')+' s':s+' s';};
function ipBar(){
  if(!ipActive()||(S.tab==='entrenar'&&S.tg===S.tw))return '';
  return `<div class="ipbar"><i class="ipd"></i><span><b>${IPN[S.tw]||'Entrenamiento'}</b><em>${ipTime()}</em> · tus series quedan guardadas</span><button class="ipx" data-act="ipdel" aria-label="Descartar">${ICON('trash',18)}</button><button class="ipv" data-act="ipgo">Volver</button></div>`;
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='done'){const L=S.logs[t.dataset.k]||[],s=+t.dataset.s,l=L[s]||{};if(!l.done&&!l.rpe){e.stopPropagation();e.preventDefault();rpeOpen(t.dataset.k,s,true);return;}}
  else if(a==='prestart'){const k=t.dataset.b;if(S.tw!==k||S.tgD!==today()){S.tw=k;S.tgAt=Date.now();S.tgD=today();}}
  else if(a==='ipgo'){e.stopPropagation();S.tab='entrenar';S.tg=S.tw;save();render();window.scrollTo(0,0);}
  else if(a==='ipdel'){e.stopPropagation();{const nn=gRstN(S.tw);if(!confirm(nn?'Llevas '+nn+(nn===1?' serie registrada':' series registradas')+'. Si descartas el entrenamiento se perderá todo tu progreso y no se puede recuperar. Para seguir después, toca "Volver": tu progreso queda guardado.\n\n¿Descartar y perder el progreso?':'¿Descartar este entrenamiento en curso?\n\nSe perderá el progreso de esta sesión y no se puede recuperar.'))return;}
    const d=DAYS[S.day];if(d){const pre=S.sel+'|'+d.id+'|';S._logsDel=true;Object.keys(S.logs).forEach(k=>{if(k.indexOf(pre)===0)delete S.logs[k];});}
    S.tw=null;S.tgAt=null;if(S.tg===S.tw)S.tg=null;S.tg=null;save();render();}
},true);
setInterval(()=>{try{const b=document.querySelector('.ipbar em');if(b&&S.tgAt)b.textContent=ipTime();}catch(e){}},1000);

/* ---- última vez (ANTERIOR) por ejercicio ---- */
function prevLine(exId){
  try{const m=loggedLifts()[exId];if(!m)return '';const p=m.filter(x=>x.date<S.sel).pop();if(!p)return '';
    return `<div class="prevl">Última vez: <b>${p.kg} kg${p.reps?' × '+p.reps:''}</b> · ${fshort(p.date)}</div>`;}catch(e){return '';}
}

/* ======== Guía de técnica del ejercicio ======== */
const MUSL={pecho:'Pectorales',hombro:'Hombros',hombro_post:'Deltoide posterior',trapecio:'Trapecio',dorsal:'Dorsal ancho',lumbar:'Zona lumbar',biceps:'Bíceps',triceps:'Tríceps',antebrazo:'Antebrazos',abdomen:'Abdomen',oblicuos:'Oblicuos',cuadriceps:'Cuádriceps',aductores:'Aductores',gluteos:'Glúteos',isquios:'Isquiotibiales',gemelos:'Pantorrillas',gluteo_medio:'Glúteo medio'};
const MUSP={
'Empuje horizontal':[['pecho'],['hombro','triceps']],'Aperturas de pecho':[['pecho'],['hombro']],
'Empuje vertical':[['hombro'],['triceps','trapecio']],'Elevación lateral':[['hombro'],['trapecio']],
'Deltoide posterior':[['hombro_post'],['trapecio','dorsal']],'Trapecio':[['trapecio'],['hombro_post']],
'Tracción vertical':[['dorsal'],['biceps','hombro_post','antebrazo']],'Tracción horizontal':[['dorsal'],['trapecio','hombro_post','biceps']],
'Dorsal aislado':[['dorsal'],['triceps']],'Flexión de codo':[['biceps'],['antebrazo']],'Extensión de codo':[['triceps'],[]],
'Core':[['abdomen'],['oblicuos']],'Sentadilla':[['cuadriceps'],['gluteos','aductores']],'Zancada':[['cuadriceps','gluteos'],['isquios','aductores']],
'Bisagra de cadera':[['gluteos','isquios'],['lumbar']],'Curl femoral':[['isquios'],['gemelos']],'Extensión de rodilla':[['cuadriceps'],[]],
'Gemelos':[['gemelos'],[]],'Aducción':[['aductores'],[]],'Abducción':[['gluteo_medio'],['gluteos']],'Glúteo aislado':[['gluteos'],['isquios']],
'Metabólico':[['cuadriceps','gluteos'],['hombro','abdomen']]};
const INSTP={
'Empuje horizontal':[['Apoya la espalda y los pies con firmeza. Lleva las escápulas hacia atrás y abajo.','Baja el peso controlado hasta que los codos queden a unos 45–60° del torso.','Empuja hacia arriba exhalando, sin bloquear los codos de golpe.'],'Mantén las muñecas rectas y el pecho arriba durante todo el recorrido.'],
'Aperturas de pecho':[['Abre los brazos con una ligera flexión de codo que no cambie durante el movimiento.','Siente el estiramiento en el pecho sin que los hombros se adelanten.','Junta los brazos apretando el pecho al final.'],'Es aislamiento: usa un peso con el que controles todo el recorrido.'],
'Empuje vertical':[['Abdomen firme y costillas abajo.','Empuja el peso por encima de la cabeza sin arquear la espalda baja.','Baja controlado hasta que los codos queden a la altura de los hombros.'],'Si la zona lumbar se arquea, baja el peso y aprieta glúteos y abdomen.'],
'Elevación lateral':[['Codos ligeramente flexionados y hombros relajados, lejos de las orejas.','Sube los brazos hacia los lados hasta la altura de los hombros.','Baja lento, en 2-3 segundos, sin balancear el cuerpo.'],'Piensa en llevar los codos hacia afuera, no las manos.'],
'Deltoide posterior':[['Pecho firme y espalda neutra.','Abre los brazos llevando los codos atrás y afuera.','Aprieta un segundo atrás y regresa controlado.'],'Evita encoger los hombros: el trabajo es de la espalda alta.'],
'Trapecio':[['Cuello largo y brazos relajados.','Sube los hombros hacia las orejas en línea recta.','Pausa arriba y baja lento, sin rotar los hombros.'],'No inclines la cabeza hacia adelante.'],
'Tracción vertical':[['Agarra un poco más abierto que el ancho de los hombros.','Empieza bajando los hombros y llevando el pecho hacia la barra.','Tira de los codos hacia las costillas y sube y baja controlando todo el recorrido.'],'Evita balancearte; si no controlas la bajada, usa asistencia.'],
'Tracción horizontal':[['Pecho firme, espalda recta y abdomen activo.','Lleva los codos atrás, hacia las costillas, juntando las escápulas.','Regresa lento estirando los brazos sin mover el torso.'],'No uses impulso del torso: el movimiento sale de la espalda.'],
'Dorsal aislado':[['Hombros abajo y pecho firme.','Tira con los codos hacia las caderas, sintiendo el dorsal.','Regresa lento hasta estirar los brazos.'],'Imagina que tus manos son ganchos y mueves los codos.'],
'Flexión de codo':[['Codos pegados al torso y hombros quietos.','Sube el peso flexionando el codo, sin balancear el cuerpo.','Baja lento hasta extender casi por completo.'],'Si necesitas impulso, el peso es demasiado alto.'],
'Extensión de codo':[['Codos fijos, cerca del cuerpo (o junto a la cabeza si es overhead).','Extiende hasta estirar los brazos sin bloquear de golpe.','Regresa despacio manteniendo el codo en su lugar.'],'Solo se mueve el antebrazo; el hombro se queda quieto.'],
'Core':[['Abdomen activo y costillas hacia la pelvis.','Mueve solo lo que el ejercicio pide, sin tirar del cuello.','Exhala en el esfuerzo y no aguantes la respiración.'],'Calidad sobre cantidad: detente cuando pierdas la posición.'],
'Sentadilla':[['Pies a la anchura que te resulte cómoda, puntas ligeramente abiertas.','Baja llevando la cadera atrás y las rodillas en línea con los pies, espalda neutra.','Sube empujando el piso con todo el pie.'],'Baja solo hasta donde controles sin que la espalda baja se redondee.'],
'Zancada':[['Da un paso largo, torso erguido y abdomen firme.','Baja hasta que ambas rodillas formen ángulos cómodos; la rodilla de adelante sigue la línea del pie.','Empuja con el pie de adelante para volver.'],'Lleva la mayor parte del peso en la pierna de adelante.'],
'Bisagra de cadera':[['Pies al ancho de cadera y rodillas suaves.','Lleva la cadera hacia atrás con la espalda neutra y la carga cerca de las piernas.','Sube empujando la cadera adelante y aprieta los glúteos arriba.'],'La espalda nunca se redondea: si pasa, baja el peso.'],
'Curl femoral':[['Ajusta la máquina para que la rodilla quede alineada con su eje.','Flexiona llevando el talón hacia el glúteo sin levantar la cadera.','Regresa lento controlando la carga.'],'Evita el rebote al final del recorrido.'],
'Extensión de rodilla':[['Ajusta el respaldo para que la rodilla quede en el eje.','Extiende la pierna sin bloquear de golpe.','Baja lento, en 2-3 segundos.'],'Si la rodilla molesta, reduce el peso y avísale a tu coach.'],
'Gemelos':[['Apoya la parte delantera del pie en un borde estable.','Sube lo más alto posible y haz una pausa de 1 segundo arriba.','Baja lento hasta sentir el estiramiento.'],'El recorrido completo importa más que el peso.'],
'Aducción':[['Siéntate con la espalda apoyada.','Junta las piernas controlando el movimiento.','Regresa lento sin dejar caer la carga.'],'Evita abrir de golpe al final.'],
'Abducción':[['Mantén el torso estable y la espalda apoyada.','Abre desde la cadera, sin balancear el cuerpo.','Regresa lento sin soltar la tensión.'],'Para sentir más el glúteo, inclina un poco el torso hacia adelante.'],
'Glúteo aislado':[['Cadera estable y abdomen activo.','Lleva la pierna atrás o al lado desde el glúteo, no desde la espalda.','Pausa un segundo y regresa controlado.'],'Si sientes la espalda baja, reduce el recorrido.'],
'Metabólico':[['Mantén un ritmo que te permita conservar buena técnica.','Respira de forma constante.','Si pierdes la forma, descansa unos segundos y continúa.'],'La técnica va primero; la velocidad después.']};
const INSTD=[['Mira el video completo antes de empezar.','Mantén una técnica controlada en todo el recorrido.','Respira de forma constante y sin forzar.'],'Si algo duele (no cansancio), detente y avísale a tu coach.'];
function gdInfo(id){
  const e=E[id]||{},mp=MUSP[e.pat]||null,ip=INSTP[e.pat]||INSTD;
  const steps=e.inst?String(e.inst).split(/\n+/).map(x=>x.trim()).filter(Boolean):ip[0];
  return {p:mp?mp[0]:[],s:mp?mp[1]:[],steps,tip:e.tip||ip[1]};
}
function bodySVG(p,s){
  const f=k=>p.includes(k)?'#C0392B':s.includes(k)?'#EBA79E':'transparent';
  const body='#E9E4DA',ln='#CFC8BB';
  const fig=cx=>`<g fill="${body}" stroke="${ln}" stroke-width="1"><circle cx="${cx}" cy="14" r="9"/><rect x="${cx-17}" y="26" width="34" height="60" rx="12"/><rect x="${cx-27}" y="30" width="9" height="46" rx="4.5"/><rect x="${cx+18}" y="30" width="9" height="46" rx="4.5"/><rect x="${cx-16}" y="84" width="14" height="78" rx="7"/><rect x="${cx+2}" y="84" width="14" height="78" rx="7"/></g>`;
  const el=(cx,cy,rx,ry,k)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f(k)}"/>`;
  const F=45,B=135;
  return `<svg viewBox="0 0 180 170" class="gbody" aria-hidden="true">${fig(F)}${fig(B)}
   ${el(F-9,38,6,5,'hombro')}${el(F+9,38,6,5,'hombro')}${el(F-23,38,4.5,5,'hombro')}${el(F+23,38,4.5,5,'hombro')}
   ${el(F-8,44,8,6,'pecho')}${el(F+8,44,8,6,'pecho')}
   ${el(F,64,6,14,'abdomen')}${el(F-12,66,3.5,12,'oblicuos')}${el(F+12,66,3.5,12,'oblicuos')}
   ${el(F-23,50,3.5,9,'biceps')}${el(F+23,50,3.5,9,'biceps')}${el(F-23,68,3.5,8,'antebrazo')}${el(F+23,68,3.5,8,'antebrazo')}
   ${el(F-9,108,6,18,'cuadriceps')}${el(F+9,108,6,18,'cuadriceps')}${el(F,100,2.5,10,'aductores')}
   ${el(F-9,146,5,10,'gemelos')}${el(F+9,146,5,10,'gemelos')}
   ${el(B,34,10,5,'trapecio')}${el(B-14,38,4.5,5,'hombro_post')}${el(B+14,38,4.5,5,'hombro_post')}
   ${el(B-8,54,7,13,'dorsal')}${el(B+8,54,7,13,'dorsal')}${el(B,76,6,7,'lumbar')}
   ${el(B-23,50,3.5,9,'triceps')}${el(B+23,50,3.5,9,'triceps')}${el(B-23,68,3.5,8,'antebrazo')}${el(B+23,68,3.5,8,'antebrazo')}
   ${el(B-8,92,7,7,'gluteos')}${el(B+8,92,7,7,'gluteos')}${el(B-9,118,5.5,15,'isquios')}${el(B+9,118,5.5,15,'isquios')}${el(B-9,146,5,10,'gemelos')}${el(B+9,146,5,10,'gemelos')}
   <text x="${F}" y="168" text-anchor="middle" font-size="7" fill="#888">Frente</text><text x="${B}" y="168" text-anchor="middle" font-size="7" fill="#888">Espalda</text></svg>`;
}
const mcard=(k,p)=>`<div class="mc"><img src="musc/${k}.webp" alt="${MUSL[k]}" loading="lazy"><b>${MUSL[k]}</b><span class="gm ${p?'p':'s'}">${p?'PRINCIPAL':'SECUNDARIO'}</span></div>`;
function gdHist(id){
  const out=[];
  Object.keys(S.logs).forEach(k=>{const [date,did,bk,ii]=k.split('|'),d=DAYS.find(x=>x.id===did);if(!d)return;
    const sets=(S.logs[k]||[]).filter(x=>x&&(x.kg>0||x.reps>0));if(!sets.length)return;
    withDate(date,()=>{const b=d.blocks.find(x=>x.k===bk);if(!b||!b.items)return;const it=itemsOf(d,b)[+ii];if(!it)return;if(curEx(d,bk,+ii,it)===id)out.push({date,sets});});});
  return out.sort((a,b)=>a.date<b.date?1:-1);
}
function guideHTML(){
  const G=S.guideUI,id=G.id,e=E[id]||{},inf=gdInfo(id),tab=G.tab;
  const tabs=`<div class="gtabs"><button class="${tab==='tec'?'on':''}" data-act="gdtab" data-v="tec">▶ Guía de técnica</button><button class="${tab==='his'?'on':''}" data-act="gdtab" data-v="his">↺ Historial</button></div>`;
  let body='';
  if(tab==='tec'){
    const yt=e.yt?`<div class="gvid"><iframe src="https://www.youtube-nocookie.com/embed/${e.yt}?rel=0&playsinline=1" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen loading="lazy" title="${esc(e.n||'')}"></iframe></div><a class="gyt" href="https://youtu.be/${e.yt}" target="_blank" rel="noopener">Abrir en YouTube ↗</a>`
      :`<div class="gvid gnov"><b>Video próximamente</b><small>Tu coach aún no ha subido el video de este ejercicio.</small><a href="https://www.youtube.com/results?search_query=${encodeURIComponent((e.n||'')+' técnica')}" target="_blank" rel="noopener">Buscar en YouTube ↗</a></div>`;
    const mus=(inf.p.length||inf.s.length)?`<h2 class="h2" style="margin-top:18px">Grupos musculares</h2><div class="gmrow">${inf.p.map(k=>mcard(k,1)).join('')}${inf.s.map(k=>mcard(k,0)).join('')}</div>`:'';
    body=yt+mus+`<h2 class="h2" style="margin-top:18px">Instrucciones del ejercicio</h2>${inf.tip?`<div class="gtip">${ICON('bulb',20)}<span>${esc(inf.tip)}</span></div>`:''}<ol class="gst">${inf.steps.map((t,i)=>`<li><b>${String(i+1).padStart(2,'0')}</b><span>${esc(t)}</span></li>`).join('')}</ol>`;
  }else{
    const h=gdHist(id);
    body=h.length?h.map(x=>`<div class="ghs"><b>${cap(pd(x.date).toLocaleDateString('es-CO',{weekday:'short',day:'numeric',month:'short'}))}</b>${x.sets.map((s,i)=>`<div class="ghr"><span>Serie ${i+1}</span><em>${s.kg>0?s.kg+' kg':'—'}${s.reps?' × '+s.reps:''}${s.rpe?' · '+(rpeLv(Math.round(s.rpe))||{n:''}).n:''}</em></div>`).join('')}</div>`).join(''):`<div class="note" style="margin-top:14px">Aún no hay registros de este ejercicio. Cuando lo entrenes, aquí verás cada sesión.</div>`;
  }
  return `<div class="ghd"><button data-act="gdclose" aria-label="Volver">←</button><b>${esc(e.n||'')}</b></div>${tabs}<div class="gbody">${body}</div>`;
}
function guideRender(){let g=document.getElementById('guide');if(!S.guideUI){if(g)g.remove();document.body.classList.remove('gopen');return;}
  if(!g){g=document.createElement('div');g.id='guide';document.body.appendChild(g);}g.innerHTML=guideHTML();document.body.classList.add('gopen');}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='exguide'||(a==='video'&&t.dataset.ex)){e.stopPropagation();e.preventDefault();S.guideUI={id:t.dataset.ex,tab:'tec'};guideRender();const g=document.getElementById('guide');if(g)g.scrollTop=0;}
  else if(a==='gdclose'){e.stopPropagation();S.guideUI=null;guideRender();}
  else if(a==='gdtab'){e.stopPropagation();S.guideUI.tab=t.dataset.v;guideRender();}
},true);

/* ===== Mi cuenta ===== */
const AC={msg:'',ok:false,busy:false};
function acctClose(){const e=document.getElementById('acct');if(e)e.remove();}
function acctOpen(){
  acctClose();
  const isC=PROFILE&&PROFILE.role==='coach';
  const nm=isC?(PROFILE.full_name||''):((S.u&&S.u.name)||PROFILE.full_name||'');
  const em=(ME&&ME.email)||'';
  const d=document.createElement('div');d.id='acct';
  d.innerHTML=`<div class="acbg" data-act="acclose"></div><div class="acbox"><div class="achd"><b>Mi cuenta</b><button class="lblbtn" data-act="acclose">Cerrar</button></div>
  <div id="acmsg"></div>
  <label class="pfl">Nombre</label><input class="fld" id="acn" value="${esc(nm)}" autocomplete="name">
  <button class="btn" data-act="acname" style="width:100%;margin:8px 0 16px">Guardar nombre</button>
  <label class="pfl">Correo</label><input class="fld" id="ace" type="email" value="${esc(em)}" autocomplete="email">
  <div class="note" style="margin:6px 0">Al cambiarlo te llega un correo de confirmación. Hasta que lo confirmes sigues entrando con el actual.</div>
  <button class="btn" data-act="acemail" style="width:100%;margin-bottom:16px">Cambiar correo</button>
  <label class="pfl">Nueva contraseña (mínimo 8 caracteres)</label><input class="fld" id="acp1" type="password" autocomplete="new-password">
  <label class="pfl">Repite la contraseña</label><input class="fld" id="acp2" type="password" autocomplete="new-password">
  <button class="btn solid" data-act="acpass" style="width:100%;margin-top:8px">Cambiar contraseña</button></div>`;
  document.body.appendChild(d);
}
function acctMsg(t,ok){const m=document.getElementById('acmsg');if(m)m.innerHTML=t?`<div class="acm ${ok?'ok':'er'}">${esc(t)}</div>`:'';const b=document.querySelector('#acct .acbox');if(b)b.scrollTop=0;}
document.addEventListener('click',async e=>{
  const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='acct'){acctOpen();return;}
  if(a==='acclose'){acctClose();return;}
  if(!/^ac(name|email|pass)$/.test(a)||!ME)return;
  const v=id=>(document.getElementById(id)||{}).value||'';
  try{
    if(a==='acname'){
      const n=v('acn').trim();if(!n){acctMsg('Escribe tu nombre.',false);return;}
      if(PROFILE.role==='coach'){await DB.saveProfile(ME.id,{full_name:n});PROFILE.full_name=n;}
      else{S.u=S.u||{};S.u.name=n;PROFILE.full_name=n;save();try{await DB.saveProfile(ME.id,{full_name:n});}catch(x){}}
      acctMsg('Nombre actualizado ✓',true);
    }else if(a==='acemail'){
      const n=v('ace').trim().toLowerCase();
      if(!/^\S+@\S+\.\S+$/.test(n)){acctMsg('Escribe un correo válido.',false);return;}
      if(n===(ME.email||'').toLowerCase()){acctMsg('Ese ya es tu correo actual.',false);return;}
      await DB.setEmail(n);
      acctMsg('Te enviamos un correo de confirmación a '+n+'. Ábrelo y confirma el cambio.',true);
    }else{
      const p1=v('acp1'),p2=v('acp2');
      if(p1.length<8){acctMsg('La contraseña debe tener mínimo 8 caracteres.',false);return;}
      if(p1!==p2){acctMsg('Las contraseñas no coinciden.',false);return;}
      await DB.setPassword(p1);
      document.getElementById('acp1').value='';document.getElementById('acp2').value='';
      acctMsg('Contraseña cambiada ✓ Úsala la próxima vez que entres.',true);
    }
  }catch(x){acctMsg(/same|different/i.test(x.message||'')?'La nueva contraseña debe ser distinta a la actual.':(x.message||'No se pudo guardar. Intenta de nuevo.'),false);}
});

/* ===== Rehacer / reiniciar un entrenamiento ===== */
const GBX={get g_fuerza(){return GB.g_fuerza;},g_cardio:['cardio'],g_calm:['calm']};
function gRstHas(g){const d=DAYS[S.day];if(!d)return false;const fk=fbKey(g);if(S.fb&&S.fb[fk])return true;
  const bl=GBX[g]||[];if(Object.keys(S.logs||{}).some(k=>bl.some(b=>k.indexOf(S.sel+'|'+d.id+'|'+b+'|')===0)))return true;
  if(g==='g_cardio'){const c=(S.cardio||{})[cKey(d)];if(c&&(c.done||c.min||c.hr))return true;}
  if(g==='g_fuerza'&&S.warmFA&&S.warmFA[cKey(d)])return true;return false;}
function gRstN(g){const d=DAYS[S.day];if(!d)return 0;let n=0;(GBX[g]||[]).forEach(b=>{const pre=S.sel+'|'+d.id+'|'+b+'|';Object.keys(S.logs||{}).forEach(k=>{if(k.indexOf(pre)===0)(Array.isArray(S.logs[k])?S.logs[k]:[]).forEach(l=>{if(l&&(l.done||l.kg>0||l.reps>0||l.rpe))n++;});});});return n;}
function gRstBtn(g){if(!gRstHas(g))return '';const fin=!!(S.fb&&S.fb[fbKey(g)]);
  return `<button class="btn" data-act="grst" data-g="${g}" style="width:100%;margin-top:10px;color:var(--red-strong)">${fin?'Rehacer este entrenamiento':'Cancelar este entrenamiento'}</button>`;}
document.addEventListener('click',e=>{
  const t=e.target.closest('[data-act="grst"]');if(!t)return;e.stopPropagation();
  const g=t.dataset.g,d=DAYS[S.day];if(!d)return;
  const nn=gRstN(g),fin0=!!(S.fb&&S.fb[fbKey(g)]);
  if(!confirm(fin0?'¿Rehacer este entrenamiento? Se borra lo que registraste hoy en él (series, cardio y feedback) y queda como nuevo.':(nn?'Llevas '+nn+(nn===1?' serie registrada':' series registradas')+'. Si cancelas el entrenamiento las pierdes. Si solo quieres seguir después, usa "Volver" y tu progreso queda guardado.\n\n¿Cancelar y borrar este entrenamiento?':'¿Cancelar este entrenamiento?')))return;
  const fk=fbKey(g);
  S._logsDel=true;(GBX[g]||[]).forEach(b=>{const pre=S.sel+'|'+d.id+'|'+b+'|';Object.keys(S.logs||{}).forEach(k=>{if(k.indexOf(pre)===0)delete S.logs[k];});});
  if(g==='g_cardio'&&S.cardio&&S.cardio[cKey(d)]){const c=S.cardio[cKey(d)];delete c.done;delete c.min;delete c.hr;}
  if(g==='g_fuerza'&&S.warmFA)delete S.warmFA[cKey(d)];
  if(S.fb)delete S.fb[fk];
  if(S.chat)S.chat=S.chat.filter(m=>m.key!==fk);
  if(S.sum)delete S.sum[S.sel];
  if(S.tw===g){S.tw=null;S.tgAt=null;}
  try{fbd={};}catch(x){}
  save();render();toast('Entrenamiento reiniciado');
},true);

/* ---- dejar para después: aviso de progreso guardado ---- */
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act="gback"]');if(!t||!S.tg)return;
  const g=S.tg;if(g!=='g_fuerza'&&g!=='g_cardio'&&g!=='g_calm')return;
  if(S.fb&&S.fb[fbKey(g)])return;
  if(gRstN(g)>0)setTimeout(()=>toast('Progreso guardado. Retómalo cuando quieras desde la barra "Entrenamiento en curso".'),50);
},true);

/* ===== Contexto del pesaje y seguimiento de sueño (opcionales) ===== */
const fmtHM=h=>{const m=Math.round(h*60),H=Math.floor(m/60),M=m%60;return H+' h'+(M?' '+M+' min':'');};
const WNT=['Comí menos de lo normal','Me salté una comida','Comí de más','Tomé poca agua','Mucha sal o comida procesada','Alcohol','Dormí poco','Malestar estomacal','Estrés','Entrené fuerte','Viaje o cambio de rutina'];
const WN={tags:[]};
function wnHTML(){const e=(S.wnotes||{})[S.sel]||{};WN.tags=(e.tags||[]).slice();
  return `<details id="wnd" class="wnd"${(e.tags&&e.tags.length)||e.note?' open':''}><summary>Contexto de ayer <small>(opcional)</small></summary><div id="wnhint"></div>
   <div class="note" style="margin:6px 0">Si pesas distinto de lo normal, cuéntale a tu coach qué pasó. Lo verá en tu ficha, no te llega como mensaje.</div>
   <div class="chips wnc">${WNT.map(t=>`<button class="chip sl${WN.tags.includes(t)?' on':''}" data-act="wnt" data-v="${esc(t)}">${t}</button>`).join('')}</div>
   <textarea id="wnote" placeholder="Notas adicionales: por ejemplo, esta semana tuve malestar estomacal y comí poco.">${esc(e.note||'')}</textarea></details>`;}
function wnHint(){const h=document.getElementById('wnhint');if(!h)return;const l=lastWeight(S.sel);if(l==null||!(tw>0)){h.innerHTML='';return;}
  const dd=tw-l;if(Math.abs(dd)>=1){h.innerHTML=`<div class="note" style="border-color:#5B4B9A">Cambió ${dd>0?'+':'−'}${Math.abs(dd).toFixed(1)} kg frente a tu registro anterior. ¿Quieres contarle a tu coach por qué?</div>`;const d=document.getElementById('wnd');if(d&&!d.dataset.auto){d.open=true;d.dataset.auto='1';}}else h.innerHTML='';}
{const _wR=wRefresh;wRefresh=function(){_wR.apply(this,arguments);wnHint();};}

const SLQ=[['mala','Mala'],['regular','Regular'],['buena','Buena'],['excelente','Excelente']];
const SLE=[['baja','Baja'],['media','Media'],['alta','Alta']];
const SLC={mala:'#C0392B',regular:'#D4A937',buena:'#3E8E5A',excelente:'#2F7FBF',baja:'#C0392B',media:'#D4A937',alta:'#3E8E5A'};
const slHC=h=>h==null?'#8A857D':h<5?'#C0392B':h<6?'#D9822B':h<7?'#D4A937':h<=9?'#3E8E5A':'#2F7FBF';
const slHW=h=>h==null?'':h<5?'Muy poco':h<6?'Poco':h<7?'Justo':h<=9?'Ideal':'Bastante';
const SLT=['Me acosté tarde','Me desperté varias veces','Dormí con estrés','Cena pesada','Pantallas antes de dormir','Cafeína tarde','Dormí mejor de lo normal','Dormí en un lugar distinto'];
const SL={h:null,q:null,e:null,tags:[],note:''};
const stepCol=p=>p>=100?'#2E9D6B':'hsl('+Math.round(18+122*Math.pow(Math.max(0,Math.min(1,p/100)),1.7))+' 80% 46%)';
function sleepCard(){
  const e=(S.sleep||{})[S.sel],q=e&&e.q?(SLQ.find(x=>x[0]===e.q)||['',''])[1]:'',en=e&&e.e?(SLE.find(x=>x[0]===e.e)||['',''])[1]:'';
  const sum=e?[e.h!=null?fmtHM(e.h):'',q].filter(Boolean).join(' · '):'';
  return `<h2 class="h2" style="margin-top:18px">Opcional</h2><button class="tcard${e&&(e.h!=null||e.q)?' tdone2':''}" data-act="slopen" style="--c:#5B4B9A"><span class="bar"></span><span class="tb"><small style="color:#5B4B9A">Sueño</small><b>${e&&(e.h!=null||e.q)?'<i class="sdot" style="background:'+(e.q?SLC[e.q]:slHC(e.h))+'"></i>':''}${e?(sum||'Sueño registrado'):(S.sel===today()?'¿Cómo dormiste anoche?':'Registra cómo dormiste')}</b><em>${e?(en?'Energía '+en.toLowerCase():'Toca para editar'):'Opcional · te toma 20 segundos'}</em></span><span class="st${e?' ok':''}" style="${e?'background:#2E9D6B;border-color:#2E9D6B':'color:#5B4B9A'}">${e?'✓':ICON('moon',18)}</span></button>`;
}
function sleepRender(){
  const e=(S.sleep||{})[S.sel];
  sheet(`<h3>Tu sueño</h3><div class="sub">${S.sel===today()?'Anoche':fmtL(S.sel)} · todo es opcional</div>
  <div class="slh"><button data-act="slstep" data-d="-0.25" aria-label="Menos">−</button><div><b id="slv" style="color:${slHC(SL.h)}">${SL.h!=null?fmtHM(SL.h):'—'}</b><small>${SL.h!=null?'<span style="color:'+slHC(SL.h)+';font-weight:700">'+slHW(SL.h)+'</span> · de sueño':'de sueño'}</small></div><button data-act="slstep" data-d="0.25" aria-label="Más">+</button></div>
  <div class="chips">${[5,6,7,8,9].map(h=>`<button class="chip sl${SL.h===h?' on':''}" style="--c:${slHC(h)}" data-act="slh" data-v="${h}">${h} h</button>`).join('')}</div>
  <div class="lbl2">Calidad del sueño</div><div class="chips">${SLQ.map(x=>`<button class="chip sl${SL.q===x[0]?' on':''}" style="--c:${SLC[x[0]]}" data-act="slq" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
  <div class="lbl2">Tu energía hoy</div><div class="chips">${SLE.map(x=>`<button class="chip sl${SL.e===x[0]?' on':''}" style="--c:${SLC[x[0]]}" data-act="sle" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>
  <details class="wnd"${SL.tags.length||SL.note?' open':''}><summary>Más contexto <small>(opcional)</small></summary>
   <div class="chips" style="margin-top:8px">${SLT.map(t=>`<button class="chip sl${SL.tags.includes(t)?' on':''}" data-act="slt" data-v="${esc(t)}">${t}</button>`).join('')}</div>
   <textarea id="slnote" placeholder="Notas libres: por ejemplo, dormí poco pero dormí bien.">${esc(SL.note)}</textarea></details>
  <button class="btn solid" data-act="slsave" style="width:100%;padding:14px;margin-top:10px;background:#5B4B9A;border-color:#5B4B9A">Guardar sueño</button>${e?'<button class="btn" data-act="sldel" style="width:100%;margin-top:8px">Borrar este registro</button>':''}`);
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='wok'){const note=((document.getElementById('wnote')||{}).value||'').trim();S.wnotes=S.wnotes||{};
    if(WN.tags.length||note)S.wnotes[S.sel]={tags:WN.tags.slice(),note,w:tw};else delete S.wnotes[S.sel];return;}
  if(a==='wnt'){const v=t.dataset.v,i=WN.tags.indexOf(v);if(i>=0)WN.tags.splice(i,1);else WN.tags.push(v);t.classList.toggle('on');e.stopPropagation();return;}
  if(!/^(slopen|slstep|slh|slq|sle|slt|slsave|sldel)$/.test(a))return;
  e.stopPropagation();e.preventDefault();
  const grab=()=>{const n=document.getElementById('slnote');if(n)SL.note=n.value;};
  if(a==='slopen'){const x=(S.sleep||{})[S.sel]||{};SL.h=x.h!=null?x.h:null;SL.q=x.q||null;SL.e=x.e||null;SL.tags=(x.tags||[]).slice();SL.note=x.note||'';sleepRender();return;}
  grab();
  if(a==='slstep'){SL.h=Math.min(14,Math.max(2,(SL.h==null?7:SL.h)+(+t.dataset.d)));sleepRender();}
  else if(a==='slh'){SL.h=+t.dataset.v;sleepRender();}
  else if(a==='slq'){SL.q=SL.q===t.dataset.v?null:t.dataset.v;sleepRender();}
  else if(a==='sle'){SL.e=SL.e===t.dataset.v?null:t.dataset.v;sleepRender();}
  else if(a==='slt'){const v=t.dataset.v,i=SL.tags.indexOf(v);if(i>=0)SL.tags.splice(i,1);else SL.tags.push(v);sleepRender();}
  else if(a==='sldel'){if(S.sleep)delete S.sleep[S.sel];save();closeSheet();render();toast('Registro de sueño borrado');}
  else if(a==='slsave'){
    const note=SL.note.trim();if(SL.h==null&&!SL.q&&!SL.e&&!SL.tags.length&&!note){toast('Agrega al menos un dato');return;}
    S.sleep=S.sleep||{};S.sleep[S.sel]={h:SL.h,q:SL.q,e:SL.e,tags:SL.tags.slice(),note};save();closeSheet();render();toast('Sueño guardado ✓');try{if(lowSleepLow()&&!(S.lowE||{})[S.sel]&&lowCard())setTimeout(lowOpen,700);}catch(x){}}
},true);

/* ---- Fidelidad: antigüedad con ERRE (hitos de 1 mes a 3 años) ---- */
const FID=[[1,'1 mes','Arranque','Ya pasó tu primer mes. Lo difícil es empezar, y ya lo hiciste.'],
  [3,'3 meses','Constancia','Tres meses seguidos. Esto ya es un hábito.'],
  [6,'6 meses','Compromiso','Medio año entrenando. Gracias por la confianza.'],
  [12,'1 año','Fidelidad','Un año completo con ERRE. Gracias por la fidelidad, de verdad se nota.'],
  [24,'2 años','Pilar ERRE','Dos años. Eres uno de los pilares de ERRE. Gracias por confiar en el proceso.'],
  [36,'3 años','Leyenda ERRE','Tres años. Eres leyenda de ERRE.']];
const FIDB=['1m','3m','6m','1a','2a','3a'];

const FIDP=[
 ['s','<path d="M12 21v-9"/><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6z"/><path d="M12 14c0-3.5 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.5z"/>'],
 ['f','<path d="M12 2.5c.8 3.2 5.5 5.2 5.5 10.6a5.5 5.5 0 0 1-11 0c0-2.2 1-3.6 2.2-4.6.1 2 1 3 2.1 3.2-.8-3.6-.2-6.2 1.2-9.2z"/>'],
 ['s','<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>'],
 ['f','<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/>'],
 ['s','<path d="M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/><path d="M12 14v4M9 21h6M10 18h4"/>'],
 ['f','<path d="M3 8l4.5 4L12 4.5l4.5 7.5L21 8l-2 10.5H5z"/><path d="M5 21h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>']];
function fidIco(k,z){const [m,d]=FIDP[k];return `<svg class="fidsv" width="${z}" height="${z}" viewBox="0 0 24 24" fill="${m==='f'?'currentColor':'none'}" stroke="${m==='s'?'currentColor':'none'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;}
const FIDC=['#3FA796','#3B82C4','#7A5BC0','#D4A937','#C0392B','#E3B93C'];
function applyFid(){const b=document.body;if(!b)return;const ti=(S&&S.role!=='coach'&&PROFILE)?fidTier(fidMonths(fidSince())):-1;if(ti<0){delete b.dataset.fid;b.style.removeProperty('--fc');}else{b.dataset.fid=ti;b.style.setProperty('--fc',FIDC[ti]);}}
function fidTag(){const ti=(S&&S.role!=='coach'&&PROFILE)?fidTier(fidMonths(fidSince())):-1;return ti<0?'':`<span class="fidtag" style="--fc:${FIDC[ti]}">${FID[ti][2]} · ${FID[ti][1]}</span>`;}
function fidSince(p){p=p||PROFILE||{};return p.member_since||(p.created_at?bogota(p.created_at).date:null);}
function fidMonths(since){if(!since)return 0;const a=since.split('-').map(Number),b=today().split('-').map(Number);let m=(b[0]-a[0])*12+(b[1]-a[1]);if(b[2]<a[2])m--;return Math.max(0,m);}
function fidSpan(m){if(m<1)return 'Menos de 1 mes';const y=Math.floor(m/12),r=m%12;return [y?y+(y===1?' año':' años'):'',r?r+(r===1?' mes':' meses'):''].filter(Boolean).join(' y ');}
function fidTier(m){let i=-1;FID.forEach((f,k)=>{if(m>=f[0])i=k;});return i;}
function fidMon(s){const [y,m]=s.split('-').map(Number);return ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'][m-1]+' '+y;}
function fidBody(p){
  const since=fidSince(p);if(!since)return '';
  const m=fidMonths(since),ti=fidTier(m),nx=FID[ti+1];
  const plan=PNAME[(p||PROFILE||{}).plan]||'';
  return `<div class="fidbig"><span class="fidb big fk${ti}" style="--fc:${ti>=0?FIDC[ti]:'#999'}">${ti>=0?fidIco(ti,36):''}</span><div><b>${fidSpan(m)}</b><small>${ti>=0?FID[ti][2]+' · ':''}con Juanjo${plan?' en '+plan:''} desde ${fidMon(since)}</small></div></div>
   <div class="fidl">${FID.map((f,k)=>`<div class="fidr${k<=ti?' on':''}" style="--fc:${FIDC[k]}"><span class="fidb">${fidIco(k,18)}</span><span><b>${f[2]}</b><small>${k<=ti?'Logrado ✓':'En '+(f[0]-m)+(f[0]-m===1?' mes':' meses')}</small></span></div>`).join('')}</div>`;
}
function fidSec(){
  const since=fidSince();if(!since||!PROFILE||S.role==='coach')return '';
  return `<section class="sec fidsec" style="--fc:${FIDC[Math.max(0,fidTier(fidMonths(since)))]}"><div class="sec-h"><b>Mi tiempo con ERRE</b><em>desde ${fidMon(since)}</em></div>${fidBody()}</section>`;
}
function checkFid(){
  if(msBusy||!S||S.role==='coach'||!S.user||!PROFILE)return;
  const since=fidSince();if(!since)return;const ti=fidTier(fidMonths(since));if(ti<0)return;
  const seen=S.fidSeen==null?-1:S.fidSeen;if(ti<=seen)return;
  S.fidSeen=ti;store.set('erre_state',S);showFid(ti);
}
function showFid(ti){
  msBusy=true;const f=FID[ti];
  const el=document.createElement('div');el.id='msov';el.className='msov';
  el.innerHTML=`<div class="msbox"><div class="msico"><span class="fidb big fk${ti}" style="--fc:${FIDC[ti]}">${fidIco(ti,38)}</span></div><small class="mskick">Fidelidad ERRE</small>
   <h3>${f[1]} con ERRE · ${f[2]}</h3><p>${f[3]}</p>
   <button class="btn solid" data-act="msclose" style="width:100%;margin-top:14px;padding:13px">Seguir</button></div>`;
  document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('on'));confetti(el.firstChild,34);chime();buzz([40,60,40]);
  try{if(typeof isC==='function'&&isC()&&ME&&DB.insertChat)DB.insertChat({client_id:ME.id,sender_id:ME.id,kind:'hito',body:'Fidelidad: '+f[1]+' con ERRE · '+f[2]}).catch(()=>{});}catch(e){}
}
document.addEventListener('click',async e=>{
  const t=e.target.closest&&e.target.closest('[data-act="cpsince"]');if(!t)return;e.stopPropagation();
  const v=((document.getElementById('cpSince')||{}).value||'').trim();
  try{await DB.updateClient(CP.cid,{member_since:v||null});CP.d.profile.member_since=v||null;CP.err='';coachRender();toast('Fecha guardada ✓');}catch(x){CP.err='No se pudo guardar la fecha.';coachRender();}
},true);


/* ---- Calentamiento: recomendado del coach + follow along en desplegable; solo ejercicios con video ---- */
const FA_PRE=/^Calentamiento\s*Follow Along\s*\|\s*/i;
function faList(){return Object.keys(E).filter(k=>E[k].yt&&/Follow Along/i.test(E[k].n||'')&&!/ANTIGUO/i.test(E[k].n||''));}
const faName=k=>String((E[k]||{}).n||'').replace(FA_PRE,'');
function faZone(k){const n=faName(k);return /Inferior|Piernas|Glúteos/i.test(n)?'Tren inferior':/Superior|Tracciones|Empujes/i.test(n)?'Tren superior':'Cuerpo completo';}
function dayZone(d){let up=0,lo=0,pu=0,pl=0;(d.blocks||[]).forEach(b=>{if(b.k!=='main'&&b.k!=='acc')return;(b.items||[]).forEach((it,i)=>{const e=E[curEx(d,b.k,i,it)]||{},g=e.g||'';if(/Pecho|Hombro/.test(g)){up++;pu++;}else if(/Espalda/.test(g)){up++;pl++;}else if(/Brazos/.test(g))up++;else if(/Pierna|Glúteo/.test(g))lo++;});});
  return {z:up>lo?'sup':lo>up?'inf':'full',push:pu,pull:pl};}
function faRec(d){
  const L=faList();if(!L.length)return null;
  if(d.fa&&L.includes(d.fa))return d.fa;
  const dz=dayZone(d),f=re=>L.find(k=>re.test(faName(k)));
  let k=null;
  if(dz.z==='sup'){k=dz.push&&!dz.pull?f(/Empujes - Tren Superior/):dz.pull&&!dz.push?f(/Tracciones/):null;k=k||f(/Tren Superior - Torso/)||f(/Tren Superior/);}
  else if(dz.z==='inf')k=f(/Piernas y Glúteos/)||f(/Tren Inferior \(7/)||f(/Tren Inferior/);
  return k||f(/Cuerpo Completo \(8/)||L[0];
}
const faSel=d=>{const k=(S.faSel||{})[cKey(d)];return k&&E[k]&&E[k].yt?k:faRec(d);};
const faMin=k=>{const m=(E[k].n||'').match(/\((\d+) min\)/);return m?m[1]+' min':'';};
function faBody(d,dn){
  const rec=faRec(d);if(!rec)return `<div class="note">Tu coach aún no tiene videos de calentamiento cargados.</div>`;
  const sel=faSel(d),L=faList().filter(k=>k!==sel),zones=['Tren superior','Tren inferior','Cuerpo completo'];
  const tag=sel===rec?`<span class="rectag">Recomendado por tu coach</span>`:`<span class="rectag alt">Elegiste otro calentamiento</span><button class="lblbtn" data-act="farec" style="color:var(--gray);margin-left:8px">Volver al recomendado</button>`;
  const grp=zones.map(z=>{const r=L.filter(k=>faZone(k)===z);return r.length?`<div class="fazn">${z}</div>`+r.map(k=>`<button class="farow" data-act="fapick" data-id="${k}"><span class="fath"><img src="https://i.ytimg.com/vi/${E[k].yt}/hqdefault.jpg" alt="" loading="lazy"></span><span><b>${esc(faName(k))}</b><small>${faMin(k)||'Follow along'}</small></span></button>`).join(''):'';}).join('');
  return `<div class="farec">${tag}</div>
   <button class="fabig" data-act="faplay" data-id="${sel}"><img src="https://i.ytimg.com/vi/${E[sel].yt}/hqdefault.jpg" alt=""><span class="fapl">▶</span></button>
   <div class="fatit"><b>${esc(faName(sel))}</b><small>Hazlo conmigo en el video, de principio a fin${faMin(sel)?' · '+faMin(sel):''}</small></div>
   <button class="btn${dn?' solid':''}" data-act="wfa" style="width:100%">${dn?'Calentamiento hecho ✓':'Marcar como hecho'}</button>
   ${L.length?`<details class="faoth"><summary>Otros calentamientos follow along (${L.length})</summary>${grp}</details>`:''}`;
}
const warmVid=(d,b,i,it)=>{const e=E[curEx(d,b.k,i,it)]||{};return !!e.yt;};
function warmSep(d,b){
  const h=itemsOf(d,b).map((it,i)=>warmVid(d,b,i,it)?exHTML(d,b,i,it,presc(it),ikey(d,b.k,i),S.logs[ikey(d,b.k,i)]||[]):'').join('');
  return h||`<div class="note">Tu coach no agregó ejercicios de calentamiento con video para este día. Usa el follow along.</div>`;
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act="faplay"],[data-act="fapick"],[data-act="farec"]');if(!t)return;
  e.stopPropagation();e.preventDefault();const a=t.dataset.act,d=DAYS[S.day];
  if(a==='faplay'){const k=t.dataset.id;t.outerHTML=`<div class="fabig fapl2"><iframe src="https://www.youtube-nocookie.com/embed/${E[k].yt}?rel=0&playsinline=1&autoplay=1" allow="accelerometer; autoplay; encrypted-media; picture-in-picture" allowfullscreen title="${esc(E[k].n||'')}"></iframe></div>`;return;}
  if(!d)return;S.faSel=S.faSel||{};
  if(a==='fapick'){S.faSel[cKey(d)]=t.dataset.id;save();render();}
  else{delete S.faSel[cKey(d)];save();render();}
},true);


/* ---- Histórico y comentarios por ejercicio (menú ⋮) ---- */
const MESES=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const fdl=iso=>{const [y,m,d]=iso.split('-');return d+' '+MESES[+m-1]+' '+y;};
const exName=id=>(E[id]||{}).n||'Ejercicio';
const HX={id:null,m:null,mode:'kg'};
const shHead=(t,s)=>`<div class="exhh"><span><b>${esc(t)}</b>${s?`<small>${esc(s)}</small>`:''}</span><button class="exx" data-act="exclose" aria-label="Cerrar">✕</button></div>`;
function exMenuClose(){const e=document.getElementById('expop');if(e)e.remove();}
function exMenuOpen(id,btn){
  exMenuClose();const n=((S.excom||{})[id]||[]).length;
  const p=document.createElement('div');p.id='expop';p.className='expop';
  p.innerHTML=`<button class="epi" data-act="exhist" data-id="${id}"><span class="epic">${ICON('hist',18)}</span>Histórico</button><button class="epi" data-act="excom" data-id="${id}"><span class="epic">${ICON('cmt',18)}</span>Comentarios${n?'<em class="exdot"></em>':''}</button>`;
  document.body.appendChild(p);
  const r=btn.getBoundingClientRect(),w=p.offsetWidth,h=p.offsetHeight;
  let left=Math.min(Math.max(8,r.right-w),window.innerWidth-w-8),top=r.bottom+6;
  if(top+h>window.innerHeight-8)top=Math.max(8,r.top-h-6);
  p.style.left=left+'px';p.style.top=top+'px';requestAnimationFrame(()=>p.classList.add('on'));
}
document.addEventListener('click',e=>{if(!e.target.closest||e.target.closest('#expop')||e.target.closest('[data-act="exmenu"]'))return;exMenuClose();},true);
window.addEventListener('scroll',exMenuClose,{passive:true});
function exChart(pts,unit){
  if(!pts.length)return '';
  const W=300,H=150,pl=30,pr=14,pt=12,pb=26,mx=Math.max(...pts.map(p=>p.v),1),stp=[1,2,2.5,5,10,20,25,50,100,200].find(s=>s>=mx/4)||mx/4,top=stp*4;
  const X=i=>pts.length===1?(pl+(W-pl-pr)/2):pl+(W-pl-pr)*i/(pts.length-1),Y=v=>pt+(H-pt-pb)*(1-v/top);
  const grid=[0,1,2,3,4].map(i=>{const v=top*i/4;return `<line x1="${pl}" x2="${W-pr}" y1="${Y(v)}" y2="${Y(v)}" stroke="#e7e1d8"/><text x="${pl-6}" y="${Y(v)+3}" text-anchor="end" font-size="9" fill="#8a847a">${v%1?v.toFixed(1):v}</text>`;}).join('');
  const line=pts.map((p,i)=>(i?'L':'M')+X(i)+' '+Y(p.v)).join(' '),area=pts.length>1?line+` L${X(pts.length-1)} ${Y(0)} L${X(0)} ${Y(0)} Z`:'';
  const dots=pts.map((p,i)=>`<circle cx="${X(i)}" cy="${Y(p.v)}" r="4" fill="#fff" stroke="#1C1B19" stroke-width="1.5"/>`).join('');
  const lab=pts.length>1?`<text x="${X(0)}" y="${H-8}" text-anchor="middle" font-size="9" fill="#8a847a">${+pts[0].d.slice(8)}/${+pts[0].d.slice(5,7)}</text><text x="${X(pts.length-1)}" y="${H-8}" text-anchor="middle" font-size="9" fill="#8a847a">${+pts[pts.length-1].d.slice(8)}/${+pts[pts.length-1].d.slice(5,7)}</text>`:`<text x="${X(0)}" y="${H-8}" text-anchor="middle" font-size="9" fill="#8a847a">${+pts[0].d.slice(8)}/${+pts[0].d.slice(5,7)}</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" width="100%" role="img" aria-label="Gráfica de ${unit}">${grid}${area?`<path d="${area}" fill="rgba(192,57,43,.16)"/>`:''}<path d="${line}" fill="none" stroke="#1C1B19" stroke-width="1.4"/>${dots}${lab}</svg>`;
}
function exHistClose(){const e=document.getElementById('exhv');if(e)e.remove();document.body.classList.remove('gopen');}
function exHistOpen(id,keep){
  if(!keep){HX.id=id;HX.m=null;HX.mode='kg';}
  const h=gdHist(id),M=HX.mode,vol=x=>x.sets.reduce((s,q)=>s+(+q.kg||0)*(+q.reps||0),0),
    best=x=>M==='kg'?Math.max(0,...x.sets.map(s=>+s.kg||0)):M==='reps'?Math.max(0,...x.sets.map(s=>+s.reps||0)):vol(x),
    unit=M==='kg'?'kg':M==='reps'?'reps':'kg',
    months=[...new Set(h.map(x=>x.date.slice(0,7)))].sort();
  let host=document.getElementById('exhv');if(!host){host=document.createElement('div');host.id='exhv';document.body.appendChild(host);}
  document.body.classList.add('gopen');
  const nm=(S.user&&S.user.name)||'Tú',ini=esc(nm.trim().slice(0,1).toUpperCase());
  const head=`<div class="exvh"><button class="exx" data-act="exclose" aria-label="Volver">←</button><b>Histórico del ejercicio</b><button class="exx" data-act="exclose" aria-label="Cerrar">✕</button></div>
    <div class="exvt"><b>${esc(exName(id))}</b><span class="exvu"><i>${ini}</i>${esc(nm)}</span></div>`;
  if(!months.length){host.innerHTML=head+`<div class="note" style="margin:16px">Aún no hay registros de este ejercicio. Cuando anotes tus series, aquí verás tu peso, repeticiones y estadísticas por fecha.</div>`;return;}
  if(!HX.m||!months.includes(HX.m))HX.m=months[months.length-1];
  const inM=h.filter(x=>x.date.startsWith(HX.m)),asc=inM.slice().sort((a,b)=>a.date<b.date?-1:1);
  const tabs=months.map(m=>`<button class="exmt${m===HX.m?' on':''}" data-act="exhm" data-m="${m}">${MESES[+m.slice(5)-1].slice(0,3)} ${m.slice(2,4)}</button>`).join('');
  const pts=asc.map(x=>({d:x.date,v:best(x)}));
  const allSets=h.flatMap(x=>x.sets),bw=Math.max(0,...allSets.map(s=>+s.kg||0)),bs=allSets.reduce((o,s)=>((+s.kg||0)*(+s.reps||0)>(o.k*o.r)?{k:+s.kg||0,r:+s.reps||0}:o),{k:0,r:0}),tv=h.reduce((s,x)=>s+vol(x),0);
  const stat=(t,v,s)=>`<div class="exst"><small>${t}</small><b>${v}</b>${s?`<em>${s}</em>`:''}</div>`;
  const rows=inM.map(x=>`<details class="exhd"><summary>${fdl(x.date)} <b>(${Math.round(best(x)*10)/10} ${unit})</b></summary>${x.sets.map((s,i)=>`<div class="ghr"><span>Serie ${i+1}</span><em>${(+s.kg||0)>0?s.kg+' kg':'—'}${s.reps?' × '+s.reps:''}${s.rpe&&typeof rpeLv==='function'&&rpeLv(Math.round(s.rpe))?' · '+rpeLv(Math.round(s.rpe)).w:''}</em></div>`).join('')}</details>`).join('');
  const ttl=M==='kg'?['Peso (kg)','Peso máximo por día']:M==='reps'?['Repeticiones','Máximo de repeticiones por día']:['Volumen (kg)','Peso × repeticiones por día'];
  host.innerHTML=head+`<div class="exvb"><div class="exmts">${tabs}</div>
    <h3 class="exh3">Estadísticas</h3><div class="exsts">${stat('Mejor peso',bw?bw+' kg':'—')}${stat('Mejor serie',bs.k?bs.k+' kg × '+bs.r:'—')}${stat('Sesiones',h.length)}${stat('Volumen total',Math.round(tv).toLocaleString('es-CO')+' kg')}</div>
    <div class="exmode"><button class="chip${M==='kg'?' on':''}" data-act="exhmode" data-v="kg">Peso</button><button class="chip${M==='reps'?' on':''}" data-act="exhmode" data-v="reps">Repeticiones</button><button class="chip${M==='vol'?' on':''}" data-act="exhmode" data-v="vol">Volumen</button></div>
    <div class="exch"><b>${ttl[0]}</b><small>${ttl[1]}</small>${exChart(pts,ttl[0])}</div>
    <h3 class="exh3">Registros de ${MESES[+HX.m.slice(5)-1].toLowerCase()}</h3>${rows}</div>`;
}
function exComOpen(id){
  const L=((S.excom||{})[id]||[]);
  sheet(`<div class="exhs">`+shHead('Comentarios',exName(id))+(L.length?L.map((c,i)=>({c,i})).reverse().map(({c,i})=>`<div class="excm"><small>${fdl(c.d)}</small><p>${esc(c.t)}</p><button class="lblbtn" data-act="excdel" data-id="${id}" data-i="${i}" style="color:var(--gray)">Borrar</button></div>`).join(''):`<div class="note" style="margin:12px 0">Aún no hay comentarios. Escribe lo que quieras contarle a tu coach sobre este ejercicio: una molestia, una sensación, un ajuste.</div>`)+`<textarea id="exct" class="fld" rows="3" placeholder="Escribe un comentario para tu coach…"></textarea><button class="btn solid" data-act="excsave" data-id="${id}" style="width:100%;margin-top:8px;padding:12px">Guardar comentario</button></div>`);
}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act="exmenu"],[data-act="exhist"],[data-act="excom"],[data-act="exclose"],[data-act="exhm"],[data-act="exhmode"],[data-act="excsave"],[data-act="excdel"]');if(!t)return;
  e.stopPropagation();e.preventDefault();const a=t.dataset.act,id=t.dataset.id||t.dataset.ex;
  if(a==='exmenu'){if(document.getElementById('expop')){exMenuClose();}else exMenuOpen(id,t);}
  else if(a==='exhist'){exMenuClose();exHistOpen(id);}
  else if(a==='excom'){exMenuClose();exComOpen(id);}
  else if(a==='exclose'){closeSheet();exHistClose();}
  else if(a==='exhm'){HX.m=t.dataset.m;exHistOpen(HX.id,true);}
  else if(a==='exhmode'){HX.mode=t.dataset.v;exHistOpen(HX.id,true);}
  else if(a==='excsave'){const v=((document.getElementById('exct')||{}).value||'').trim();if(!v){toast('Escribe algo primero');return;}
    S.excom=S.excom||{};(S.excom[id]=S.excom[id]||[]).push({d:today(),t:v});save();exComOpen(id);toast('Comentario guardado ✓');render();}
  else if(a==='excdel'){const L=(S.excom||{})[id]||[];L.splice(+t.dataset.i,1);if(!L.length)delete S.excom[id];save();exComOpen(id);render();}
},true);

/* ---------- PWA: instalar app ---------- */
let PWA_EV=null;
const pwaStandalone=()=>{try{const m=q=>window.matchMedia('(display-mode: '+q+')').matches;const r=m('standalone')||m('fullscreen')||m('minimal-ui')||navigator.standalone===true||/[?&]source=pwa/.test(location.search);if(r){try{localStorage.setItem('pwaInst','1');}catch(x){}return true;}return localStorage.getItem('pwaInst')==='1';}catch(e){return false;}};
try{if(navigator.getInstalledRelatedApps)navigator.getInstalledRelatedApps().then(a=>{if(a&&a.length){try{localStorage.setItem('pwaInst','1');}catch(x){}}}).catch(()=>{});}catch(e){}
const pwaIOS=()=>/iphone|ipad|ipod/i.test(navigator.userAgent)&&!window.MSStream;
const pwaDismissed=()=>{try{return Date.now()-(+localStorage.getItem('pwaNo')||0)<60*864e5;}catch(e){return false;}};
const pwaRe=()=>{try{const l=document.getElementById('lgEmail');if(l){if(!l.value&&!LG.busy)showLogin();return;}if(S&&S.tab==='inicio')render();}catch(x){}};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();PWA_EV=e;try{localStorage.removeItem('pwaInst');}catch(x){}pwaRe();});/* si Chrome ofrece instalar, la app NO está instalada: se borra la marca vieja */
try{if(/[?&]pwa=reset/.test(location.search)){localStorage.removeItem('pwaInst');localStorage.removeItem('pwaNo');}}catch(e){}
window.addEventListener('appinstalled',()=>{PWA_EV=null;try{toast('App instalada ✓');render();}catch(x){}});
function pwaBar(){
  if(pwaStandalone()||pwaDismissed())return '';
  if(PWA_EV)return `<div class="pwab"><img src="icon-192.png" alt=""><span><b>Instala la app de ERRE</b>Ábrela como cualquier app, sin buscar el link.</span><button class="pwai" data-act="pwainstall">Instalar</button><button class="pwax" data-act="pwano" aria-label="Cerrar">✕</button></div>`;
  if(/android/i.test(navigator.userAgent)&&/; wv\)|Instagram|FBAN|FBAV|Line\/|TikTok|musical_ly/i.test(navigator.userAgent))return `<div class="pwab"><img src="icon-192.png" alt=""><span><b>Ábrela en Chrome para instalarla</b>Toca el menú <b style="display:inline">⋮</b> y elige <b style="display:inline">Abrir en Chrome</b>.</span><button class="pwax" data-act="pwano" aria-label="Cerrar">✕</button></div>`;
  if(/android/i.test(navigator.userAgent))return `<div class="pwab"><img src="icon-192.png" alt=""><span><b>Instala la app en tu celular</b>Toca el menú <b style="display:inline">⋮</b> de Chrome y elige <b style="display:inline">Instalar app</b>.</span><button class="pwax" data-act="pwano" aria-label="Cerrar">✕</button></div>`;
  if(pwaIOS())return `<div class="pwab"><img src="icon-192.png" alt=""><span><b>Instala la app en tu iPhone</b>Toca <b style="display:inline">Compartir</b> (el cuadro con flecha) y luego <b style="display:inline">Añadir a pantalla de inicio</b>.</span><button class="pwax" data-act="pwano" aria-label="Cerrar">✕</button></div>`;
  return '';
}
document.addEventListener('click',async e=>{const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(a==='pwainstall'&&PWA_EV){PWA_EV.prompt();try{await PWA_EV.userChoice;}catch(x){}PWA_EV=null;if(document.getElementById('lgEmail'))showLogin();else render();}
  else if(a==='pwano'){try{localStorage.setItem('pwaNo',String(Date.now()));}catch(x){}if(document.getElementById('lgEmail')||document.getElementById('lgCode'))showLogin();else render();}});
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));}

/* ---------- aviso de versión nueva ---------- */
const APP_VER='__APP_VER__';
let NEWV=false,_pcT=0,_away=0,_hidAt=0;document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')_hidAt=Date.now();else if(_hidAt){_away=Date.now()-_hidAt;_hidAt=0;setTimeout(()=>{_away=0;},8000);}});
async function pwaHard(){try{const ks=await caches.keys();await Promise.all(ks.map(k=>caches.delete(k)));}catch(e){}try{const r=await navigator.serviceWorker.getRegistration();if(r)await r.update();}catch(e){}location.replace(location.pathname+'?u='+Date.now());}
try{if(/[?&]u=\d+/.test(location.search))history.replaceState(history.state,'',location.pathname+location.hash);}catch(e){}
function pwaBanner(){if(document.getElementById('pwaUp'))return;const d=document.createElement('div');d.id='pwaUp';d.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:calc(84px + env(safe-area-inset-bottom,0px));width:calc(100% - 24px);max-width:456px;z-index:90;display:flex;align-items:center;gap:10px;padding:12px 14px;border-radius:14px;background:#1C1B19;color:#fff;box-shadow:0 6px 20px rgba(0,0,0,.25)';d.innerHTML='<span style="flex:1;font-size:13px;line-height:1.35"><b style="display:block;font-size:14px">Hay una versión nueva</b>Actualiza para ver lo último.</span><button id="pwaUpB" style="border:0;border-radius:99px;padding:9px 14px;font-weight:700;background:#C0392B;color:#fff;cursor:pointer">Actualizar</button><button id="pwaUpX" aria-label="Luego" style="border:0;background:transparent;color:#bbb;padding:6px;cursor:pointer">✕</button>';document.body.appendChild(d);document.getElementById('pwaUpB').onclick=()=>pwaHard();document.getElementById('pwaUpX').onclick=()=>d.remove();}
async function pwaCheck(){try{if(!navigator.onLine||location.protocol==='file:')return;const r=await fetch('index.html?v='+Date.now(),{cache:'no-store'});if(!r.ok)return;const t=await r.text(),m=t.match(/const APP_VER='([^']+)'/);if(m&&m[1]!==APP_VER&&m[1]!=='__APP_VER__'){if((performance.now()<25000||_away>=20000)&&!sessionStorage.getItem('erre_rl_'+m[1])){sessionStorage.setItem('erre_rl_'+m[1],'1');pwaHard();return;}NEWV=true;pwaBanner();}else if(m){NEWV=false;}}catch(e){}}
const pwaCheckT=()=>{const n=Date.now();if(n-_pcT<5000)return;_pcT=n;pwaCheck();};
setTimeout(pwaCheckT,1500);setInterval(pwaCheck,45*1000);['visibilitychange','focus','pageshow','online'].forEach(ev=>window.addEventListener(ev,()=>{if(document.visibilityState==='visible')pwaCheckT();}));
setInterval(()=>{try{if(!NEWV)return;document.querySelectorAll('.top .who small, .top small').forEach(s=>{if(s.querySelector('.newv'))return;const b=document.createElement('button');b.className='newv';b.setAttribute('data-act','pwaup');b.textContent='● Nueva versión';s.appendChild(b);});}catch(e){}},800);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pwaup"]');if(!t)return;e.stopPropagation();pwaHard();},true);

/* ---------- notificaciones push ---------- */
const PUSH={on:false};
const pushSupported=()=>('serviceWorker' in navigator)&&('PushManager' in window)&&('Notification' in window);
const pushB64=s=>{const r=(s+'='.repeat((4-s.length%4)%4)).replace(/-/g,'+').replace(/_/g,'/'),raw=atob(r);return Uint8Array.from([...raw].map(c=>c.charCodeAt(0)));};
function pushTo(to,title,body,tag){try{if(!DB.push||!to)return;DB.push({action:'notify',to,title,body:String(body||'').replace(/\s+/g,' ').slice(0,110),url:'./',tag:tag||'erre'});}catch(e){}}
function pushPlan(cid){try{const k='pushPlan_'+cid,last=+localStorage.getItem(k)||0;if(Date.now()-last<15*60*1000)return;localStorage.setItem(k,String(Date.now()));pushTo(cid,'Tu coach actualizó tu plan','Entra para ver lo nuevo','plan');}catch(e){}}
async function pushRefresh(){try{if(!pushSupported()||Notification.permission!=='granted'){PUSH.on=false;return;}const reg=await navigator.serviceWorker.getRegistration();PUSH.on=!!(reg&&await reg.pushManager.getSubscription());}catch(e){PUSH.on=false;}}
async function pushOn(){
  if(!pushSupported()||!DB.push){toast('Este dispositivo no permite avisos');return;}
  const perm=await Notification.requestPermission();if(perm!=='granted'){toast('No diste permiso para los avisos');return;}
  const k=await DB.push({action:'key'});if(!k||!k.key){toast('No se pudo activar. Intenta de nuevo.');return;}
  const reg=await navigator.serviceWorker.ready;let sub=await reg.pushManager.getSubscription();
  if(!sub)sub=await reg.pushManager.subscribe({userVisibleOnly:true,applicationServerKey:pushB64(k.key)});
  const j=sub.toJSON();await DB.upsert('push_subs',[{user_id:ME.id,endpoint:j.endpoint,p256dh:j.keys.p256dh,auth:j.keys.auth,ua:navigator.userAgent.slice(0,120)}],'endpoint');
  PUSH.on=true;toast('Avisos activados ✓');
}
async function pushOff(){try{const reg=await navigator.serviceWorker.getRegistration(),sub=reg&&await reg.pushManager.getSubscription();if(sub){const ep=sub.endpoint;await sub.unsubscribe();await DB.del('push_subs',{endpoint:ep});}}catch(e){}PUSH.on=false;toast('Avisos desactivados');}
function pushRow(){
  if(!pushSupported())return `<div class="note">${pwaIOS()&&!pwaStandalone()?'Para recibir avisos, instala la app: toca Compartir → Añadir a pantalla de inicio y ábrela desde ahí.':'Este navegador no permite avisos.'}</div>`;
  if(Notification.permission==='denied')return '<div class="note">Los avisos están bloqueados. Actívalos en los ajustes de tu celular para esta app.</div>';
  return `<div class="pfrow"><span><b>🔔 Avisos de tu coach</b><small>${PUSH.on?'Activados: mensajes y cambios en tu plan':'Recibe tus mensajes y cambios de plan'}</small></span><button class="btn${PUSH.on?'':' solid'}" data-act="pushtg" style="flex:none;padding:7px 12px">${PUSH.on?'Desactivar':'Activar'}</button></div>`;
}
const pushCoachBtn=()=>pushSupported()&&Notification.permission!=='denied'?`<button class="lblbtn" data-act="pushtg">🔔 Avisos: ${PUSH.on?'activados':'activar'}</button>`:'';
document.addEventListener('click',async e=>{const t=e.target.closest('[data-act="pushtg"]');if(!t)return;t.disabled=true;try{if(PUSH.on)await pushOff();else await pushOn();}catch(x){console.warn(x);toast('No se pudo cambiar los avisos');}try{if(PROFILE&&PROFILE.role==='coach')coachRender();else render();}catch(x){try{render();}catch(y){}}});


/* =====================================================================
   Cronómetro de intervalos + circuitos guardados (tipo Tabata)
   ===================================================================== */
const CIRC0={work:'#C0392B',rest:'#2E7D6B',prep:'#D98A12',cool:'#5B7FC7',done:'#1F1F1F'};
const cirCol=t=>((S&&S.cirColors)||{})[t]||CIRC0[t];
const CIRPAL=['#C0392B','#D98A12','#2E7D6B','#5B7FC7','#7B4FA8','#1F7A8C','#C2456B','#2F4B7C','#1F1F1F','#6B7D2E'];
const CIRNM={prep:'Prepárate',work:'Trabajo',rest:'Descanso',cool:'Cooldown'};
const CIRC=new Proxy({},{get:(o,k)=>cirCol(k)});
const cirLst=()=>Array.isArray(S.circuits)?S.circuits:[];
const cirNew=()=>({id:'c'+Date.now().toString(36),name:'',prep:10,rounds:1,restRound:0,cool:0,ex:[{n:'Ejercicio 1',w:35,r:15},{n:'Ejercicio 2',w:35,r:15},{n:'Ejercicio 3',w:35,r:15}]});
const cirFmt=x=>{x=Math.max(0,Math.round(x));const h=Math.floor(x/3600),m=Math.floor(x%3600/60),q=x%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(q).padStart(2,'0');};
function cirParse(v){v=String(v==null?'':v).trim().toLowerCase().replace(',','.');if(!v)return 0;let m;
  if(m=v.match(/^(\d+):(\d{1,2})$/))return +m[1]*60+ +m[2];
  if(m=v.match(/^(\d+(?:\.\d+)?)\s*(m|min|mins|minuto|minutos)$/))return Math.round(+m[1]*60);
  if(m=v.match(/^(\d+(?:\.\d+)?)\s*(s|seg|segs|segundo|segundos)?$/))return Math.round(+m[1]);return 0;}
const cirIn=x=>!x?'':(x%60===0&&x>=120?(x/60)+' min':String(x));
function cirSteps(c){
  const st=[],ex=c.ex.filter(e=>e&&(e.w>0)),R=Math.max(1,+c.rounds||1);
  if(!ex.length)return st;
  if(c.prep>0)st.push({t:'prep',d:c.prep,n:'Prepárate',nx:ex[0].n,r:0});
  for(let r=1;r<=R;r++){
    ex.forEach((e,i)=>{
      st.push({t:'work',d:e.w,n:e.n||('Ejercicio '+(i+1)),r,i,ne:ex.length,R});
      const lastEx=i===ex.length-1,lastRound=r===R;
      if(lastEx&&lastRound){if(c.cool>0)st.push({t:'cool',d:c.cool,n:'Vuelta a la calma',r,R});}
      else if(lastEx){const rr=c.restRound>0?c.restRound:(e.r||0);if(rr>0)st.push({t:'rest',d:rr,n:c.restRound>0?'Descanso entre vueltas':'Descanso',r,R,lr:1});}
      else if(e.r>0)st.push({t:'rest',d:e.r,n:'Descanso',r,R});
    });
  }
  st.forEach((x,k)=>{if(x.t!=='work'){const nxt=st.slice(k+1).find(y=>y.t==='work');x.nx=nxt?nxt.n:'';}});
  return st;
}
const cirTotal=c=>cirSteps(c).reduce((a,x)=>a+x.d,0);
function cirSummary(c){const ex=c.ex.filter(e=>e.w>0);if(!ex.length)return 'Sin ejercicios';
  const same=ex.every(e=>e.w===ex[0].w&&e.r===ex[0].r);
  return `${ex.length} ${ex.length===1?'ejercicio':'ejercicios'}${same?` · ${cirIn(ex[0].w)}${ex[0].r?'×'+ex[0].r+' s':''}`:''}${c.rounds>1?' · '+c.rounds+' vueltas':''} · ${cirFmt(cirTotal(c))}`;}
function cirEntry(d){
  const c=d&&d.circuit;
  return `<div class="cirbox"><div class="cirh"><b>⏱ Cronómetro de intervalos</b></div>
    ${c&&c.ex?`<div class="cirpro"><span><small>${isC()?'Tu coach programó':'Programado'}</small><b>${esc(c.name||'Circuito')}</b><em>${esc(cirSummary(c))}</em></span><button class="btn solid" data-act="cirrun" data-src="day">▶ Iniciar</button></div>`:''}
    <button class="btn" data-act="cirhome" style="width:100%;margin-top:8px">Abrir cronómetro y mis circuitos</button></div>`;
}
/* ---- pantalla de inicio del cronómetro ---- */
const CPRE=[
  ['Estándar 35×15',()=>Object.assign(cirNew(),{name:'Estándar 35×15',ex:[1,2,3,4,5].map(i=>({n:'Ejercicio '+i,w:35,r:15}))})],
  ['Tabata 20×10 (8)',()=>Object.assign(cirNew(),{name:'Tabata 20×10',ex:[{n:'Ejercicio',w:20,r:10}],rounds:8})],
  ['Zona 2 · 30 min',()=>Object.assign(cirNew(),{name:'Zona 2 · 30 min',prep:5,ex:[{n:'Cardio continuo',w:1800,r:0}]})],
  ['VO2 máx 4×4',()=>Object.assign(cirNew(),{name:'VO2 máx 4×4',prep:10,rounds:4,restRound:180,cool:300,ex:[{n:'Intervalo fuerte',w:240,r:0}]})]
];
function cirHome(){
  const L=cirLst(),dc=(typeof DAYS!=='undefined'&&DAYS[S.day])?DAYS[S.day].circuit:null;
  sheet(`<h3>⏱ Cronómetro de intervalos</h3><div class="sub">Trabajo y descanso por ejercicio, vueltas y cooldown. Estándar 35 s × 15 s.</div>
   ${dc?`<div class="cirpro" style="margin-top:12px"><span><small>${isC()?'Tu coach programó':'Programado'} para hoy</small><b>${esc(dc.name||'Circuito')}</b><em>${esc(cirSummary(dc))}</em></span><button class="btn solid" data-act="cirrun" data-src="day">▶ Iniciar</button></div>`:''}
   <div class="grp" style="margin-top:14px">Empezar rápido</div>
   <div class="chips">${CPRE.map((p,i)=>`<button class="chip" data-act="cirpre" data-i="${i}">${p[0]}</button>`).join('')}</div>
   <div class="grp" style="margin-top:14px">Mis circuitos guardados</div>
   ${L.length?L.map((c,i)=>`<div class="cirrow"><span><b>${esc(c.name||'Sin nombre')}</b><small>${esc(cirSummary(c))}</small></span><button class="btn solid sm" data-act="cirrun" data-src="s" data-i="${i}">▶</button><button class="btn sm" data-act="ciredit" data-src="s" data-i="${i}">✎</button></div>`).join(''):'<div class="note">Aún no tienes circuitos guardados. Crea uno y ponle nombre.</div>'}
   <button class="btn solid" data-act="cirpre" data-i="-1" style="width:100%;margin-top:12px;padding:13px">+ Crear circuito desde cero</button>
   <div class="grp" style="margin-top:16px">Colores del cronómetro</div>
   ${['prep','work','rest','cool'].map(k=>`<div class="cclr"><span>${CIRNM[k]}</span><div class="cirpal">${CIRPAL.map(c=>`<button class="csw${cirCol(k).toLowerCase()===c.toLowerCase()?' on':''}" style="background:${c}" data-act="circlr" data-k="${k}" data-c="${c}" aria-label="${c}"></button>`).join('')}<label class="cfree${CIRPAL.some(c=>c.toLowerCase()===cirCol(k).toLowerCase())?'':' on'}" title="Elegir cualquier color"><input type="color" class="cpick" data-cc="${k}" value="${cirCol(k)}"><span style="background:conic-gradient(#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)"></span></label></div></div>`).join('')}
   <button class="lblbtn" data-act="circlr" data-k="reset" style="margin-top:6px">↺ Restaurar colores originales</button>
   <button class="btn" data-act="close" style="width:100%;margin-top:8px">Cerrar</button>`);
}
/* ---- constructor ---- */
let CB=null;
const cirSt=v=>v<60?5:v<300?15:60;
const cirTm=(f,i,v)=>`<div class="cirtm"><button class="cirst" data-act="cbstep" data-f="${f}" data-i="${i}" data-d="-1" aria-label="Menos">−</button><button class="cirtv" id="cb_${f}_${i}" data-act="cbwheel" data-f="${f}" data-i="${i}">${cirFmt(v)}</button><button class="cirst" data-act="cbstep" data-f="${f}" data-i="${i}" data-d="1" aria-label="Más">+</button></div>`;
const cirGet=(f,i)=>f==='w'||f==='r'?(CB.c.ex[i][f]||0):(CB.c[f]||0);
function cirSet(f,i,v){v=Math.max(0,Math.min(v,f==='w'||f==='cool'||f==='restRound'?36000:3600));if(f==='w'||f==='r')CB.c.ex[i][f]=v;else CB.c[f]=v;}
function cirRefresh(){const c=CB.c;document.querySelectorAll('.cirtv').forEach(b=>{b.textContent=cirFmt(cirGet(b.dataset.f,+b.dataset.i));});
  const rr=document.getElementById('cb_rounds');if(rr)rr.textContent=c.rounds||1;
  const t=document.querySelector('.cirtot');if(t)t.innerHTML=`Duración total <b>${cirFmt(cirTotal(c))}</b> · ${c.ex.filter(x=>x.w>0).length} ejercicios${c.rounds>1?' × '+c.rounds+' vueltas':''}`;}
function cirBuilder(){
  const c=CB.c,tot=cirTotal(c);
  const rows=c.ex.map((e,i)=>`<div class="cirex"><div class="cirexh"><span class="cirn">${i+1}</span><input class="fld" data-cb="n" data-i="${i}" placeholder="Nombre del ejercicio" value="${esc(e.n||'')}"><span class="cirbt"><button class="rtb" data-act="cbmv" data-i="${i}" data-d="-1" aria-label="Subir">↑</button><button class="rtb" data-act="cbmv" data-i="${i}" data-d="1" aria-label="Bajar">↓</button><button class="rtb" data-act="cbdel" data-i="${i}" aria-label="Quitar">✕</button></span></div>
     <div class="cirexb"><div><small class="cw">TRABAJO</small>${cirTm('w',i,e.w||0)}</div><div><small class="cr">DESCANSO</small>${cirTm('r',i,e.r||0)}</div></div></div>`).join('');
  sheet(`<h3>${CB.ctx==='coach'?'Circuito del coach':'Circuito'}</h3>
   <label class="pfl">Nombre</label><input class="fld" data-cb="name" placeholder="Ej. Zona 2 con remo y ski" value="${esc(c.name||'')}">
   <div class="cirgrid"><div><small>INICIO</small>${cirTm('prep',0,c.prep||0)}</div>
     <div><small>VUELTAS DEL BLOQUE</small><div class="cirtm"><button class="cirst" data-act="cbrnd" data-d="-1" aria-label="Menos">−</button><span class="cirtv" id="cb_rounds">${c.rounds||1}</span><button class="cirst" data-act="cbrnd" data-d="1" aria-label="Más">+</button></div></div>
     <div><small>DESCANSO ENTRE VUELTAS</small>${cirTm('restRound',0,c.restRound||0)}</div>
     <div><small>COOLDOWN FINAL</small>${cirTm('cool',0,c.cool||0)}</div></div>
   <div class="note" style="margin:8px 0">Usa − y + (mantén presionado para ir más rápido) o toca el tiempo para deslizarlo.</div>
   <div class="grp">Ejercicios</div>${rows}
   <div class="chips" style="margin-top:10px"><button class="chip" data-act="cbadd">+ Ejercicio</button><button class="chip" data-act="cbadd5">+ 5 ejercicios</button><button class="chip" data-act="cball">Igualar todos al primero</button></div>
   <div class="cirtot">Duración total <b>${cirFmt(tot)}</b> · ${c.ex.filter(e=>e.w>0).length} ejercicios${c.rounds>1?' × '+c.rounds+' vueltas':''}</div>
   <div class="cirbtns"><button class="btn solid" data-act="cbrun">▶ Probar / iniciar</button><button class="btn solid" data-act="cbsave">${CB.ctx==='coach'?'Guardar en mi biblioteca':'Guardar circuito'}</button></div>
   ${CB.ctx==='coach'&&CB.onUse?`<button class="btn" data-act="cbuse" style="width:100%;margin-top:8px">Usar en este workout (sin guardar en biblioteca)</button>`:''}
   ${CB.del?`<button class="btn" data-act="cbdelc" style="width:100%;margin-top:8px;color:var(--red-strong)">Eliminar circuito</button>`:''}
   <button class="btn" data-act="cbclose" style="width:100%;margin-top:8px">Cerrar</button>`);
}
/* rueda para deslizar el tiempo (minutos : segundos) */
function cirWheel(f,i){
  const v=cirGet(f,i),m0=Math.floor(v/60),s0=v%60;let el=document.getElementById('cirwh');if(el)el.remove();
  el=document.createElement('div');el.id='cirwh';
  const col=(id,n,lab)=>`<div class="whc"><small>${lab}</small><div class="whs" id="${id}">${Array.from({length:n},(_,k)=>`<div class="whi">${String(k).padStart(2,'0')}</div>`).join('')}</div></div>`;
  el.innerHTML=`<div class="whbg" data-act="cbwx"></div><div class="whbox"><div class="whhd"><b>${f==='w'?'Tiempo de trabajo':f==='r'?'Tiempo de descanso':f==='prep'?'Tiempo de inicio':f==='cool'?'Cooldown':'Descanso entre vueltas'}</b><button class="btn solid sm" data-act="cbwok">Listo</button></div>
   <div class="whwrap"><div class="whsel"></div>${col('whM',100,'MIN')}<b class="whc2">:</b>${col('whS',60,'SEG')}</div></div>`;
  document.body.appendChild(el);el.dataset.f=f;el.dataset.i=i;
  const M=document.getElementById('whM'),S_=document.getElementById('whS');M.scrollTop=m0*44;S_.scrollTop=s0*44;
}
function cirWheelRead(){const el=document.getElementById('cirwh');if(!el)return;const m=Math.round(document.getElementById('whM').scrollTop/44),s=Math.round(document.getElementById('whS').scrollTop/44);cirSet(el.dataset.f,+el.dataset.i,m*60+s);el.remove();cirRefresh();}
/* mantener presionado − / + */
let CST=null;
function cirStepDo(f,i,d){cirSet(f,i,Math.max(0,cirGet(f,i)+d*cirSt(cirGet(f,i)-(d<0?1:0))));cirRefresh();}
document.addEventListener('pointerdown',e=>{const b=e.target.closest&&e.target.closest('[data-act="cbstep"],[data-act="cbrnd"]');if(!b||!CB)return;e.preventDefault();
  const act=()=>{if(b.dataset.act==='cbrnd'){CB.c.rounds=Math.max(1,Math.min(99,(CB.c.rounds||1)+(+b.dataset.d)));cirRefresh();}else cirStepDo(b.dataset.f,+b.dataset.i,+b.dataset.d);};
  act();clearTimeout(CST);let n=0;const loop=()=>{act();n++;CST=setTimeout(loop,n>10?45:100);};CST=setTimeout(loop,420);},true);
['pointerup','pointercancel','pointerleave'].forEach(t=>document.addEventListener(t,()=>{clearTimeout(CST);CST=null;},true));
function cirOpen(c,opts){CB=Object.assign({c:JSON.parse(JSON.stringify(c)),ctx:'client'},opts||{});cirBuilder();}
document.addEventListener('input',e=>{
  const i=e.target;if(!CB||!i.dataset||!i.dataset.cb)return;const f=i.dataset.cb;
  if(f==='name')CB.c.name=i.value;else if(f==='n')CB.c.ex[+i.dataset.i].n=i.value;
},true);
/* ---- ejecución ---- */
let CR=null,CAU=null,CIRA=null;
function cirBeep(f,d,v){if(S.cirMute)return;try{CAU=CAU||new (window.AudioContext||window.webkitAudioContext)();const o=CAU.createOscillator(),g=CAU.createGain();o.frequency.value=f;o.type='sine';g.gain.value=v||.25;o.connect(g);g.connect(CAU.destination);o.start();o.stop(CAU.currentTime+d);}catch(x){}}
function cirAudioBack(){try{if(CAU&&CAU.state!=='running')CAU.resume();}catch(e){}try{if(CIRA&&CIRA.paused&&CR&&!CR.paused)CIRA.play().catch(()=>{});}catch(e){}}
function cirSay(t,delay){try{if(S.cirVoice===false||S.cirMute||!window.speechSynthesis)return;clearTimeout(cirSay.t);cirSay.t=setTimeout(()=>{try{const u=new SpeechSynthesisUtterance(t);u.lang='es-CO';u.rate=1.05;u.volume=1;u.onend=u.onerror=()=>{[0,150,500].forEach(d=>setTimeout(cirAudioBack,d));};speechSynthesis.cancel();speechSynthesis.speak(u);}catch(e){}},delay||0);}catch(e){}}
const cirMinTxt=s=>{const m=Math.round(s/60);return m<=1?'un minuto':m+' minutos';};
function cirBuzz(p){try{navigator.vibrate&&navigator.vibrate(p);}catch(x){}}
async function cirWake(on){try{if(on&&navigator.wakeLock){CR.wl=await navigator.wakeLock.request('screen');}else if(CR&&CR.wl){CR.wl.release();CR.wl=null;}}catch(x){}}
function cirStart(c,reg){
  const st=cirSteps(c);if(!st.length){toast('Agrega al menos un ejercicio con tiempo de trabajo');return;}
  try{CAU=CAU||new (window.AudioContext||window.webkitAudioContext)();CAU.resume&&CAU.resume();}catch(x){}
  try{if(!CIRA){CIRA=new Audio('data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=');CIRA.loop=true;CIRA.setAttribute('playsinline','');}CIRA.play().catch(()=>{});}catch(x){}
  CR={c,st,i:0,paused:false,left:0,end:0,t0:Date.now(),beep:99,reg:reg};
  closeSheet();let el=document.getElementById('cirrun');if(el)el.remove();
  el=document.createElement('div');el.id='cirrun';document.body.appendChild(el);
  cirWake(true);cirGo(0,true);clearInterval(CR.iv);CR.iv=setInterval(cirTick,200);
}
function cirGo(k,first){
  if(!CR)return;if(k<0)k=0;
  if(k>=CR.st.length){return cirFinish();}
  CR.i=k;const s=CR.st[k];CR.end=Date.now()+s.d*1000;CR.beep=99;
  if(!first){cirBeep(s.t==='work'?1047:s.t==='rest'||s.t==='cool'?523:784,s.t==='work'?.5:.3,.45);cirBuzz(s.t==='work'?[200,80,200]:[120]);}
  CR.vm=0;try{cirSay({prep:'Prepárate',work:'Trabajo. '+(s.n||''),rest:'Descanso',cool:'Enfría'}[s.t]||'',first?0:600);}catch(e){}
  cirDraw();
}
function cirTick(){
  if(!CR||CR.paused)return;const s=CR.st[CR.i],left=Math.max(0,(CR.end-Date.now())/1000),sec=Math.ceil(left);
  if(sec>=1&&CR.beep!==sec&&(sec<=3||s.t==='prep')){CR.beep=sec;
    if(sec<=3)cirBeep(sec===1?784:659,.16,.4);else cirBeep(440,.05,.18);
    cirBuzz(sec<=3?[40]:[15]);}
  try{cirAudioBack();}catch(e){}
  try{
    if(sec===10&&s.d>=25&&s.t!=='prep'&&CR.vm!==10){CR.vm=10;cirSay('Diez segundos');}
    const totA=CR.st.reduce((a,x)=>a+x.d,0),doneA=CR.st.slice(0,CR.i).reduce((a,x)=>a+x.d,0)+(s.d-left),rem=Math.max(0,totA-doneA);
    const tt=document.getElementById('cirTot');if(tt)tt.textContent='Total restante '+cirFmt(rem);
    if(totA>=300&&!CR.said){const key=rem>=60?Math.floor(rem/(rem>=600?300:60)):0;const mk=rem>=600?Math.floor(rem/300)*300:Math.floor(rem/60)*60;if(rem>=60&&CR.lm===undefined)CR.lm=mk;else if(rem>=60&&mk<CR.lm){CR.lm=mk;cirSay('Quedan '+cirMinTxt(mk));}}
    if(totA>=120&&rem<=30&&!CR.s30){CR.s30=true;cirSay('Treinta segundos para terminar');}
  }catch(e){}
  if(left<=0.02){cirGo(CR.i+1);return;}
  const t=document.getElementById('cirT');if(t)t.textContent=cirFmt(sec);
  const pb=document.getElementById('cirP');if(pb){const done=CR.st.slice(0,CR.i).reduce((a,x)=>a+x.d,0)+(s.d-left);pb.style.width=Math.min(100,done/CR.st.reduce((a,x)=>a+x.d,0)*100)+'%';}
}
function cirDraw(){
  const el=document.getElementById('cirrun');if(!el||!CR)return;const s=CR.st[CR.i],col=CIRC[s.t],lab={prep:'PREPÁRATE',work:'TRABAJO',rest:'DESCANSO',cool:'COOLDOWN'}[s.t];
  const works=CR.st.filter(x=>x.t==='work').length,wi=CR.st.slice(0,CR.i+1).filter(x=>x.t==='work').length;
  el.style.background=col;{const h=String(col).replace('#',''),r=parseInt(h.slice(0,2),16),gg=parseInt(h.slice(2,4),16),bb=parseInt(h.slice(4,6),16),L=(0.299*r+0.587*gg+0.114*bb)/255;el.style.color=L>0.62?'#1C1B19':'#fff';el.classList.toggle('cirlight',L>0.62);}
  el.innerHTML=`<button class="cirmute" data-act="cirmute" aria-label="Sonido">${S.cirMute?'🔇':'🔊'}</button><button class="cirmute cirvoice${S.cirVoice===false?' off':''}" data-act="cirvoice" aria-label="Voz">🗣</button><div class="cirtop"><b>${esc(CR.c.name||'Circuito')}</b><span>${s.R>1&&s.r?`Vuelta ${s.r}/${s.R} · `:''}${s.t==='work'?`Ejercicio ${wi}/${works}`:''}</span></div>
   <div class="cirlab">${lab}</div><div class="cirbig" id="cirT">${cirFmt(Math.ceil(Math.max(0,(CR.paused?CR.left:CR.end-Date.now())/1000)))}</div>
   <div class="cirnm">${s.t==='work'?esc(s.n):esc(s.n)}</div>
   ${s.nx?`<div class="cirnx">Sigue: <b>${esc(s.nx)}</b></div>`:'<div class="cirnx">Último paso</div>'}
   <div class="cirremain" id="cirTot"></div><div class="cirpb"><i id="cirP"></i></div>
   <div class="circtl"><button data-act="cirprev" aria-label="Anterior">⏮</button><button class="cirpp" data-act="cirpause" aria-label="Pausa">${CR.paused?'▶':'⏸'}</button><button data-act="cirnext" aria-label="Saltar">⏭</button></div>
   <button class="cirx" data-act="cirquit">Salir</button>`;
}
function cirFinish(){
  if(!CR)return;clearInterval(CR.iv);cirWake(false);const tot=Math.round((Date.now()-CR.t0)/1000),el=document.getElementById('cirrun');
  cirBeep(990,.5,.4);cirBuzz([300,100,300,100,500]);CR.done=true;
  el.style.background=CIRC.done;
  el.innerHTML=`<div class="cirtop"><b>${esc(CR.c.name||'Circuito')}</b></div><div class="cirlab">¡LISTO!</div><div class="cirbig">${cirFmt(cirTotal(CR.c))}</div><div class="cirnm">Circuito completado</div>
   <div class="circtl" style="flex-direction:column;gap:10px;width:100%;padding:0 24px">${(typeof DAYS!=='undefined'&&DAYS[S.day]&&S.sel===today())?`<button class="btn solid" data-act="cirreg" style="width:100%;padding:14px">Registrar ${Math.max(1,Math.round(cirTotal(CR.c)/60))} min en mi cardio de hoy</button>`:''}<button class="btn" data-act="circlose" style="width:100%;padding:14px">Cerrar</button></div>`;
}
function cirEnd(){try{CIRA&&CIRA.pause();}catch(x){}if(CR){clearInterval(CR.iv);cirWake(false);}CR=null;const el=document.getElementById('cirrun');if(el)el.remove();}
/* ---- clicks ---- */
document.addEventListener('click',async e=>{
  const t=e.target.closest&&e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act;
  if(!/^(cir|cb)/.test(a))return;e.stopPropagation();
  const L=cirLst(),i=+t.dataset.i;
  if(a==='cirhome'){cirHome();}
  else if(a==='cirpre'){const c=i<0?cirNew():CPRE[i][1]();cirOpen(c,{ctx:'client'});}
  else if(a==='cirrun'){const c=t.dataset.src==='day'?DAYS[S.day].circuit:L[i];if(c)cirStart(c);}
  else if(a==='ciredit'){cirOpen(L[i],{ctx:'client',del:true});}
  else if(a==='cirpause'&&CR){if(CR.paused){CR.paused=false;CR.end=Date.now()+CR.left;}else{CR.paused=true;CR.left=Math.max(0,CR.end-Date.now());}cirDraw();}
  else if(a==='circlr'){if(t.dataset.k==='reset')S.cirColors={};else{S.cirColors=S.cirColors||{};S.cirColors[t.dataset.k]=t.dataset.c;}save();cirHome();}
  else if(a==='cirvoice'){S.cirVoice=S.cirVoice===false?true:false;save();t.classList.toggle('off',S.cirVoice===false);try{if(S.cirVoice===false)speechSynthesis.cancel();else cirSay('Voz activada');}catch(x){}}
  else if(a==='cirmute'){S.cirMute=!S.cirMute;save();t.textContent=S.cirMute?'🔇':'🔊';}
  else if(a==='cirnext'&&CR){cirGo(CR.i+1);}
  else if(a==='cirprev'&&CR){cirGo(CR.i-1);}
  else if(a==='cirquit'){if(confirm('¿Salir del cronómetro?'))cirEnd();}
  else if(a==='circlose'){cirEnd();}
  else if(a==='cirreg'){try{const d=DAYS[S.day],k=cKey(d);S.cardio[k]=Object.assign({},S.cardio[k],{min:Math.max(1,Math.round(cirTotal(CR.c)/60)),done:true});save();}catch(x){}cirEnd();render();toast('Cardio registrado ✓');}
  else if(a==='cbstep'||a==='cbrnd'){/* se maneja con pointerdown */}
  else if(a==='cbwheel'){cirWheel(t.dataset.f,+t.dataset.i);}
  else if(a==='cbwok'){cirWheelRead();}
  else if(a==='cbwx'){const w=document.getElementById('cirwh');if(w)w.remove();}
  else if(a==='cball'){const f=CB.c.ex[0];if(f){CB.c.ex.forEach(x=>{x.w=f.w;x.r=f.r;});cirRefresh();toast('Igualados al primero');}}
  else if(a==='cbadd'){const l=CB.c.ex[CB.c.ex.length-1]||{w:35,r:15};CB.c.ex.push({n:'Ejercicio '+(CB.c.ex.length+1),w:l.w,r:l.r});cirBuilder();}
  else if(a==='cbadd5'){for(let q=0;q<5;q++){const l=CB.c.ex[CB.c.ex.length-1]||{w:35,r:15};CB.c.ex.push({n:'Ejercicio '+(CB.c.ex.length+1),w:l.w,r:l.r});}cirBuilder();}
  else if(a==='cbdel'){CB.c.ex.splice(i,1);cirBuilder();}
  else if(a==='cbmv'){const j=i+(+t.dataset.d);if(j<0||j>=CB.c.ex.length)return;const x=CB.c.ex.splice(i,1)[0];CB.c.ex.splice(j,0,x);cirBuilder();}
  else if(a==='cbrun'){cirStart(CB.c);}
  else if(a==='cbclose'){if(CB&&CB.ctx==='client')cirHome();else closeSheet();CB=null;}
  else if(a==='cbsave'){const c=CB.c;if(!(c.name||'').trim()){toast('Ponle un nombre al circuito');return;}
    if(CB.ctx==='client'){const l=cirLst().slice(),ix=l.findIndex(x=>x.id===c.id);if(ix>=0)l[ix]=c;else l.push(c);S.circuits=l;save();toast('Circuito guardado ✓');CB=null;cirHome();}
    else{try{const r=await DB.saveCircuit(c);c.dbid=r&&r.id||c.dbid;if(CB.onSave)CB.onSave(c);toast('Guardado en tu biblioteca ✓');CB=null;closeSheet();}catch(x){toast('No se pudo guardar. Intenta de nuevo.');}}}
  else if(a==='cbuse'){if(CB.onUse)CB.onUse(CB.c);CB=null;closeSheet();}
  else if(a==='cbdelc'){if(!confirm('¿Eliminar este circuito?'))return;const c=CB.c;
    if(CB.ctx==='client'){S.circuits=cirLst().filter(x=>x.id!==c.id);save();CB=null;cirHome();}
    else{try{if(c.dbid)await DB.delCircuit(c.dbid);if(CB.onDel)CB.onDel(c);CB=null;closeSheet();}catch(x){toast('No se pudo eliminar.');}}}
},true);


/* ===== Compartir hito (imagen para historias / WhatsApp / Instagram) ===== */
function msCard(i,title,kick,name){
  return new Promise(res=>{
    const W=1080,H=1920,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');
    const g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#1C1B19');g.addColorStop(1,'#34211B');x.fillStyle=g;x.fillRect(0,0,W,H);
    x.fillStyle='rgba(230,71,122,.10)';x.beginPath();x.arc(W-120,260,420,0,7);x.fill();x.fillStyle='rgba(59,130,196,.10)';x.beginPath();x.arc(100,H-300,460,0,7);x.fill();
    const draw=(img)=>{
      if(img){x.save();x.beginPath();x.roundRect?x.roundRect(W/2-90,170,180,180,42):x.rect(W/2-90,170,180,180);x.clip();x.drawImage(img,W/2-90,170,180,180);x.restore();}
      x.textAlign='center';x.fillStyle='#fff';
      x.font='300px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';x.fillText(i,W/2,930);
      x.fillStyle='#E8B64C';x.font='700 46px system-ui,-apple-system,Segoe UI,sans-serif';
      let t0=(kick||'Hito logrado').toUpperCase().split('').join(String.fromCharCode(8202));x.fillText(t0,W/2,1090);
      x.fillStyle='#fff';x.font='800 96px system-ui,-apple-system,Segoe UI,sans-serif';
      const words=String(title).split(' '),lines=[];let cur='';words.forEach(w=>{const t=cur?cur+' '+w:w;if(x.measureText(t).width>W-200&&cur){lines.push(cur);cur=w;}else cur=t;});if(cur)lines.push(cur);
      lines.slice(0,3).forEach((l,q)=>x.fillText(l,W/2,1230+q*112));
      x.fillStyle='rgba(255,255,255,.75)';x.font='500 48px system-ui,-apple-system,Segoe UI,sans-serif';
      if(name)x.fillText(name,W/2,1230+Math.min(lines.length,3)*112+40);
      x.fillStyle='#fff';x.font='800 44px system-ui,-apple-system,Segoe UI,sans-serif';x.fillText('ERRE ACADEMY',W/2,1740);
      x.fillStyle='rgba(255,255,255,.6)';x.font='500 34px system-ui,-apple-system,Segoe UI,sans-serif';x.fillText('Método Complete · Entrena con sistema',W/2,1792);
      try{c.toBlob(b=>res(b),'image/png');}catch(e){res(null);}
    };
    const im=new Image();im.onload=()=>draw(im);im.onerror=()=>draw(null);im.src='icon-192.png';
  });
}
async function msShare(t,i,kick){
  toast('Preparando tu imagen…');
  const nm=(S.user&&S.user.name||'').split(' ')[0],blob=await msCard(i,t,kick,nm);
  const txt=i+' '+(kick||'Hito logrado')+': '+t+' en ERRE Complete 💪';
  if(blob){
    const f=new File([blob],'erre-hito.png',{type:'image/png'});
    try{if(navigator.canShare&&navigator.canShare({files:[f]})){await navigator.share({files:[f],text:txt});return;}}catch(e){if(e&&e.name==='AbortError')return;}
    const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='erre-hito.png';document.body.appendChild(a);a.click();a.remove();
    toast('Imagen guardada. Súbela a tus historias o estados 💪');return;
  }
  try{if(navigator.share){await navigator.share({text:txt});return;}}catch(e){}
  toast('No se pudo crear la imagen en este navegador');
}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="mshare"]');if(!t)return;e.stopPropagation();msShare(t.dataset.t,t.dataset.i,t.dataset.k);},true);

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="mstest"]');if(!t)return;msBusy=false;showMilestone([{i:'🏆',t:'Hito de prueba · ERRE'}],null);});

document.addEventListener('pointerdown',()=>{try{const A=window.AudioContext||window.webkitAudioContext;if(A){const c=window._ac=window._ac||new A();if(c.state==='suspended')c.resume();}}catch(e){}},{once:true,passive:true});

/* ---------- récord personal ---------- */
function prShow(ex,kg){
  const old=document.getElementById('prbar');if(old)old.remove();
  const el=document.createElement('div');el.id='prbar';el.className='prbar';
  el.innerHTML=`<span class="prico">🏅</span><span class="prtx"><b>¡Récord personal!</b><small>${esc(ex)} · ${kg} kg</small></span><button class="prsh" data-act="mshare" data-t="${esc('Récord: '+ex+' · '+kg+' kg')}" data-i="🏅" data-k="Récord personal">Compartir</button><button class="prx" data-act="prclose" aria-label="Cerrar">✕</button>`;
  document.body.appendChild(el);requestAnimationFrame(()=>el.classList.add('on'));try{chime();buzz([30,50,30]);}catch(e){}
  clearTimeout(prShow.t);prShow.t=setTimeout(()=>{el.classList.remove('on');setTimeout(()=>el.remove(),300);},9000);
}
document.addEventListener('click',e=>{
  const x=e.target.closest&&e.target.closest('[data-act="prclose"]');if(x){const b=document.getElementById('prbar');if(b)b.remove();return;}
  const t=e.target.closest&&e.target.closest('[data-act="done"]');if(!t||typeof loggedLifts!=='function')return;
  try{
    const k=t.dataset.k,s=+t.dataset.s,cur=(S.logs[k]||[])[s];if(!cur||!cur.done||!(cur.kg>0))return;
    const [date,did,bk,ii]=k.split('|'),d=DAYS.find(q=>q.id===did);if(!d)return;
    const ex=withDate(date,()=>{const b=d.blocks.find(q=>q.k===bk);if(!b)return null;const it=itemsOf(d,b)[+ii];return it?curEx(d,bk,+ii,it):null;});if(!ex)return;
    const prior=(loggedLifts()[ex]||[]).filter(q=>q.date!==date);if(!prior.length)return;
    const best=Math.max(...prior.map(q=>q.kg)),seen=(S.prs=S.prs||{})[ex]||0;
    if(cur.kg>best&&cur.kg>seen){S.prs[ex]=cur.kg;save();prShow(ex,cur.kg);}
  }catch(x){console.warn('pr',x);}
});

/* ---------- insignia en el ícono ---------- */
function badgeSet(n){try{if(!('setAppBadge' in navigator))return;if(n>0)navigator.setAppBadge(n).catch(()=>{});else navigator.clearAppBadge().catch(()=>{});}catch(e){}}
function badgeCalc(){try{
  if(PROFILE&&PROFILE.role==='coach'){const last={};(CP.inbox||[]).forEach(m=>{if(m.client_id&&!last[m.client_id])last[m.client_id]=m;});let n=0;Object.keys(last).forEach(id=>{const m=last[id],rd=+localStorage.getItem('cpread_'+id)||0;if(m.sender_id===id&&m.kind!=='hito'&&new Date(m.created_at).getTime()>rd)n++;});badgeSet(n);}
  else if(S&&S.chat){badgeSet(Math.max(0,S.chat.filter(m=>m.from==='coach').length-(S.chatRead||0)));}
}catch(e){}}
setInterval(badgeCalc,6000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')badgeCalc();});

/* ---------- agarre y ancho ---------- */
const GRIPS={
 g:[['prono','Prono','Palmas hacia adelante (nudillos arriba). Trabaja más la parte alta y ancha de la espalda; el bíceps ayuda menos.'],
    ['supino','Supino','Palmas hacia ti. El bíceps ayuda más y se siente más la parte baja del dorsal.'],
    ['neutro','Neutro','Palmas enfrentadas. La posición más cómoda para hombros y codos; buen punto medio.']],
 w:[['ancho','Ancho','Manos más separadas que los hombros. Más énfasis en el ancho de la espalda.'],
    ['medio','Medio','Manos al ancho de los hombros. Es la opción estándar.'],
    ['cerrado','Cerrado','Manos más juntas que los hombros. Más recorrido y más trabajo de brazos.']],
 f:[['junto','Juntos','Pies juntos o a menos de un ancho de hombros. Más trabajo de cuádriceps.'],
    ['hombros','Hombros','Pies al ancho de los hombros. Es la opción estándar.'],
    ['ancho','Anchos','Pies más abiertos que los hombros, puntas algo hacia afuera. Más glúteo y aductores.']]};
function gripKind(n){n=String(n||'').toLowerCase();
  const neutro=/neutro|mancuerna a una mano|unilateral/.test(n);
  if(/jal[oó]n|dominada|remo|pull-?down|pulldown/.test(n)&&!/ergómetro|ergometro/.test(n))return {g:!neutro,w:/jal[oó]n|dominada|remo con barra|remo en polea/.test(n)&&!neutro};
  if(/press plano|press de pecho|press banca|press de banca/.test(n))return {g:false,w:true};
  if(/prensa|sentadilla|hack/.test(n)&&!/búlgara|bulgara|unilateral|una pierna/.test(n))return {g:false,w:false,f:true};
  return null;}
function gripSvg(t,v){
  const s='stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  if(t==='g'){
    const hand=(x,mode)=>mode==='prono'?`<rect x="${x}" y="14" width="22" height="26" rx="8" ${s}/><circle cx="${x+5}" cy="18" r="1.6" fill="currentColor"/><circle cx="${x+11}" cy="17" r="1.6" fill="currentColor"/><circle cx="${x+17}" cy="18" r="1.6" fill="currentColor"/>`
      :mode==='supino'?`<rect x="${x}" y="14" width="22" height="26" rx="8" ${s}/><path d="M${x+5} 28q6 5 12 0M${x+7} 22q4 3 8 0" ${s}/>`
      :`<rect x="${x+6}" y="12" width="10" height="30" rx="5" ${s}/><path d="M${x+11} 12v-4" ${s}/>`;
    return `<svg viewBox="0 0 120 54" width="100%" height="54">${hand(18,v)}${hand(80,v)}<path d="M4 47h112" ${s}/></svg>`;}
  if(t==='w'){const gap={ancho:92,medio:60,cerrado:30}[v];const x1=60-gap/2,x2=60+gap/2;
    return `<svg viewBox="0 0 120 54" width="100%" height="54"><path d="M6 30h108" ${s}/><circle cx="${x1}" cy="30" r="6" fill="currentColor"/><circle cx="${x2}" cy="30" r="6" fill="currentColor"/><path d="M42 46v-8M78 46v-8M42 42h36" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3 3" fill="none"/></svg>`;}
  const gap={junto:14,hombros:36,ancho:64}[v],x1=60-gap/2,x2=60+gap/2,tilt=v==='ancho'?10:v==='junto'?0:4;
  return `<svg viewBox="0 0 120 54" width="100%" height="54"><rect x="8" y="6" width="104" height="42" rx="6" ${s} opacity=".5"/><rect x="${x1-9}" y="14" width="14" height="26" rx="5" ${s} transform="rotate(${-tilt} ${x1-2} 27)"/><rect x="${x2-5}" y="14" width="14" height="26" rx="5" ${s} transform="rotate(${tilt} ${x2+2} 27)"/></svg>`;}
function gripSug(n){n=String(n||'').toLowerCase();const o={};
  if(/neutro|mancuerna a una mano|unilateral/.test(n))o.g='neutro';
  else if(/remo/.test(n))o.g='neutro';else if(/jal[oó]n|dominada|pull-?down|pulldown/.test(n))o.g='prono';
  if(/jal[oó]n|dominada/.test(n))o.w='ancho';else if(/remo|press/.test(n))o.w='medio';
  o.f='hombros';return o;}
function gripRow(exId){try{
  const x=E[exId];if(!x)return '';const k=gripKind(x.n);if(!k)return '';
  const cur=(S.grips||{})[exId]||{},sg=gripSug(x.n);
  const row=(t,lab)=>{const o=GRIPS[t];return `<div class="grprow"><span class="grpl">${lab} <button class="lblbtn" data-act="gripinfo" data-t="${t}" data-ex="${exId}">ⓘ</button></span><div class="chips">${o.map(([v,n])=>`<button class="chip${cur[t]===v?' on':''}${sg[t]===v?' sug':''}" data-act="gripset" data-t="${t}" data-v="${v}" data-ex="${exId}">${n}</button>`).join('')}</div></div>`;};
  return `<div class="grp">${k.g?row('g','Agarre'):''}${k.w?row('w','Ancho'):''}${k.f?row('f','Pies'):''}<small class="grpleg"><i></i> Sugerido para este ejercicio</small></div>`;}catch(e){return '';}}
document.addEventListener('click',e=>{
  const t=e.target.closest&&e.target.closest('[data-act="gripset"],[data-act="gripinfo"]');if(!t)return;e.stopPropagation();
  const ex=t.dataset.ex,ty=t.dataset.t;
  if(t.dataset.act==='gripset'){S.grips=S.grips||{};const c=S.grips[ex]=S.grips[ex]||{};c[ty]=c[ty]===t.dataset.v?undefined:t.dataset.v;save();render();return;}
  const lab={g:'Agarre',w:'Ancho de agarre',f:'Postura de pies'}[ty];
  sheet(`<h3>${lab}</h3><div class="sub">Elige una opción y la app la recordará para este ejercicio.</div>${GRIPS[ty].map(([v,n,d])=>`<div class="grpi"><div class="grpsv">${gripSvg(ty,v)}</div><div><b>${n}</b><div class="sub2">${d}</div></div></div>`).join('')}<button class="btn" data-act="close" style="width:100%;margin-top:10px">Cerrar</button>`);
},true);

document.addEventListener('input',e=>{const i=e.target;if(!i||!i.classList||!i.classList.contains('cpick'))return;S.cirColors=S.cirColors||{};S.cirColors[i.dataset.cc]=i.value;try{save();}catch(x){}},true);
document.addEventListener('change',e=>{const i=e.target;if(!i||!i.classList||!i.classList.contains('cpick'))return;S.cirColors=S.cirColors||{};S.cirColors[i.dataset.cc]=i.value;try{save();}catch(x){}cirHome();},true);

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="freeedit"],[data-act="freedel"]');if(!t)return;e.stopPropagation();
  if(S.freeOk!==true)return;const L=((S.ctasks&&S.ctasks.tasks)||[]);
  if(t.dataset.act==='freedel'){if(!confirm('¿Eliminar este entreno? No se puede deshacer.'))return;S.ctasks={tasks:L.filter(x=>x.id!==t.dataset.id)};cxSync();save();render();return;}
  const old=t.dataset.id&&L.find(x=>x.id===t.dataset.id&&x.self);const day=old?JSON.parse(JSON.stringify(old.day)):cpBlankDay();
  rtOpen('client',{cid:ME.id,name:old?(old.title||''):'',days:[day]});RT.self=true;RT.xtn={date:S.sel,id:old?old.id:cpTid()};RT.dirty=!!old?false:true;RT.sel=0;RT.bt=day.blocks.some(b=>!b.cardio&&b.items&&b.items.length)?'fu':'warm';rtShow();},true);

document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="cpfreeok"]');if(!t)return;e.stopPropagation();
  const bl=(CP.d.blobs||[]).find(x=>x.key==='freeOk'),nx=!(bl&&bl.value===true);
  try{await DB.upsert('client_data',[{client_id:CP.cid,key:'freeOk',value:nx,updated_at:new Date().toISOString()}],'client_id,key');if(bl)bl.value=nx;else CP.d.blobs.push({key:'freeOk',value:nx});coachRender();toast(nx?'Entreno libre activado ✓':'Entreno libre desactivado');}catch(x){toast('No se pudo cambiar');}},true);

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="cpcopy"]');if(!t)return;e.stopPropagation();const v=t.dataset.v;try{navigator.clipboard.writeText(v).then(()=>toast('Correo copiado ✓'),()=>toast(v));}catch(x){toast(v);}},true);
function tzSync(){try{if(!ME||!PROFILE||PROFILE.role!=='client')return;const z=Intl.DateTimeFormat().resolvedOptions().timeZone;if(z&&S.tz!==z){S.tz=z;save();}}catch(e){}}
setTimeout(tzSync,4000);setInterval(tzSync,60000);

/* PostHog (opcional): se activa solo si config.js trae ph:"phc_..." */
(function(){const c=window.ERRE_CFG||{};if(!c.ph)return;let ready=false;const q=[],ph=()=>window.posthog;
  const cap=(n,p)=>{if(ready){try{ph().capture(n,p);}catch(e){}}else if(q.length<50)q.push([n,p]);};window.phCap=cap;
  setTimeout(()=>{const s=document.createElement('script');s.async=true;s.src=(c.phAssets||'https://us-assets.i.posthog.com')+'/static/array.js';
    s.onload=()=>{try{ph().init(c.ph,{api_host:c.phHost||'https://us.i.posthog.com',person_profiles:'identified_only',autocapture:false,capture_pageview:false,disable_session_recording:true,persistence:'localStorage'});ph().register({app_ver:(typeof verTag==='function'?verTag():'')});ready=true;q.splice(0).forEach(a=>ph().capture(a[0],a[1]));cap('app_open');}catch(e){}};document.head.appendChild(s);},2500);
  let idd=false;setInterval(()=>{if(idd||!ready||typeof ME==='undefined'||!ME||!PROFILE)return;try{ph().identify(ME.id,{role:PROFILE.role,plan:PROFILE.plan});idd=true;}catch(e){}},4000);
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act]');if(t&&t.dataset.act)cap('ui_'+t.dataset.act);},true);
  window.addEventListener('error',e=>cap('app_error',{msg:String(e.message||'').slice(0,200),src:String(e.filename||'').split('/').pop(),line:e.lineno}));
  window.addEventListener('unhandledrejection',e=>cap('app_error',{msg:String((e.reason&&e.reason.message)||e.reason||'').slice(0,200),kind:'promise'}));
})();

/* volumen semanal por grupo muscular */
function volData(){
  const m0=monOf(today()),w1=addD(m0,-7),out={};
  Object.keys(S.logs||{}).forEach(k=>{const [date,did,bk,ii]=k.split('|');if(date<w1||bk==='warm'||bk==='calm'||bk==='cardio')return;
    const n=(S.logs[k]||[]).filter(x=>x&&x.done).length;if(!n)return;
    const d=DAYS.find(x=>x.id===did)||(did==='free'?FREE:null);if(!d)return;
    withDate(date,()=>{const b=d.blocks.find(x=>x.k===bk);if(!b)return;const it=itemsOf(d,b)[+ii];if(!it)return;
      const ex=curEx(d,bk,+ii,it),g=(E[ex]||{}).g;if(!g||/Calentamiento|Estiramiento|Otros/.test(g))return;
      const o=out[g]=out[g]||{a:0,b:0};if(date>=m0)o.a+=n;else o.b+=n;});});
  return out;
}
function volCard(){try{
  const o=volData(),gs=Object.keys(o).sort((x,y)=>(o[y].a-o[x].a)||(o[y].b-o[x].b));
  if(!gs.length)return '';const mx=Math.max(20,...gs.map(g=>Math.max(o[g].a,o[g].b)));
  return `<h2 class="h2" style="margin-top:4px">Series por grupo muscular</h2><div class="sub2" style="margin:0 0 8px">Series completadas esta semana (barra) y la semana pasada (marca).</div><div class="volc">${gs.map(g=>{const a=o[g].a,b=o[g].b;return `<div class="volr"><span class="volg">${esc(g)}</span><div class="volb"><i style="width:${Math.round(a/mx*100)}%"></i>${b?`<u style="left:${Math.round(b/mx*100)}%"></u>`:''}</div><b>${a}</b></div>`;}).join('')}</div><div class="sub2" style="margin:6px 0 14px">Guía general: entre 10 y 20 series por semana para cada músculo que quieres hacer crecer. ${isC()?'Tu coach lo ajusta contigo.':''}</div>`;}catch(e){return '';}}


/* ---------- lecciones cortas ---------- */
let LESS=null,LESSBUSY=false;
const LTAGS=['Técnica','Nutrición','Mentalidad','Recuperación','Ciencia'];
async function lessonsLoad(force){if(LESSBUSY)return;if(LESS&&!force)return;LESSBUSY=true;try{LESS=await DB.lessons();}catch(e){LESS=LESS||[];}LESSBUSY=false;try{if(PROFILE&&PROFILE.role==='coach'){if(CP.sec==='lecc'&&CP.view==='list'&&!(typeof RT!=='undefined'&&RT.open))coachRender(true);}else if(S.tab==='inicio'&&!document.querySelector('#sheet.on,.sheet.on'))render();}catch(e){}}
function lessonToday(){const L=(LESS||[]).filter(x=>x.active);if(!L.length)return null;return L[Math.floor(Date.parse(S.sel+'T12:00:00Z')/864e5)%L.length];}
function lesAv(){try{const c=window.coachAvState&&window.coachAvState();if(c&&c.cl&&c.cl.u)return `<img class="lesav" src="${c.cl.u}" alt="">`;}catch(e){}return '<i class="lesav">J</i>';}
function lessonCard(){try{if(S.sel!==today())return '';if(LESS===null){lessonsLoad();return '';}const l=lessonToday();if(!l)return '';
  const pr=String(l.body||'').replace(/\s+/g,' ').slice(0,90);
  return `<button class="lescard les-min" data-act="lesopen" data-id="${l.id}">${lesAv()}<span class="lesx"><small>Lección del día · de Juanjo</small><b>${esc(l.title)}</b></span><em>›</em></button>`;}catch(e){return '';}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="lesopen"]');if(!t)return;e.stopPropagation();const l=(LESS||[]).find(x=>x.id===t.dataset.id);if(!l)return;
  sheet(`<small class="lestag">Lección del día · ${esc(l.tag)}</small><h3>${esc(l.title)}</h3><div class="lesbody">${String(l.body||'').split(/\n+/).map(p=>`<p>${esc(p)}</p>`).join('')}</div><div class="lessig">${lesAv()}<span><b>${esc((window.coachAvState&&coachAvState().cl&&coachAvState().cl.n)||'Juanjo Herrera')}</b><small>Tu coach</small></span></div><button class="btn" data-act="close" style="width:100%;margin-top:10px">Cerrar</button>`);},true);
function cpLessonsPage(){const L=LESS||[],f=CP.ls;
  const form=f?`<section class="sec"><div class="sec-h"><b>${f.id?'Editar lección':'Nueva lección'}</b></div><label class="pfl">Tema</label><div class="chips">${LTAGS.map(x=>`<button class="chip${f.tag===x?' on':''}" data-act="cpltag" data-v="${x}">${x}</button>`).join('')}</div><label class="pfl">Título</label><input class="fld" id="clT" value="${esc(f.title)}" placeholder="Ej. Por qué el descanso también es entrenamiento" maxlength="90"><label class="pfl" style="margin-top:8px">Texto (1 minuto de lectura)</label><textarea class="fld" id="clB" rows="7" placeholder="Escribe en párrafos cortos. Una idea por lección.">${esc(f.body)}</textarea>${f.err?`<div class="note" style="color:var(--red-strong)">${f.err}</div>`:''}<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" data-act="cplcancel" style="flex:1">Cancelar</button><button class="btn solid" data-act="cplsave" style="flex:2"${f.busy?' disabled':''}>${f.busy?'Guardando…':'Guardar lección'}</button></div></section>`:`<button class="btn solid" data-act="cplnew" style="width:100%;margin:10px 0">+ Nueva lección</button>`;
  return `<div class="cphead"><h2 class="h2" style="margin:0">Lecciones</h2><em class="cpcount">${L.length}</em></div><div class="note" style="margin:8px 0">Cada día, tus clientes ven una lección corta en Inicio. Rotan en orden: si tienes 30 activas, no se repite una en 30 días.</div>${form}${LESS===null?'<p class="lead">Cargando…</p>':L.length?L.slice().reverse().map(l=>`<div class="lesrow${l.active?'':' off'}"><div><small>${esc(l.tag)}${l.active?'':' · En pausa'}</small><b>${esc(l.title)}</b></div><span><button class="chip" data-act="cpledit" data-id="${l.id}">Editar</button> <button class="chip" data-act="cpltog" data-id="${l.id}">${l.active?'Pausar':'Activar'}</button> <button class="chip" data-act="cpldel" data-id="${l.id}">Eliminar</button></span></div>`).join(''):'<div class="note">Aún no hay lecciones. Crea la primera.</div>'}`;}
document.addEventListener('input',e=>{const t=e.target;if(!CP.ls||!t||!t.id)return;if(t.id==='clT')CP.ls.title=t.value;else if(t.id==='clB')CP.ls.body=t.value;});
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act^="cpl"]');if(!t)return;const a=t.dataset.act;if(!['cplnew','cpledit','cpltag','cplcancel','cplsave','cpltog','cpldel'].includes(a))return;e.stopPropagation();
  const find=id=>(LESS||[]).find(x=>x.id===id);
  if(a==='cplnew'){CP.ls={tag:'Técnica',title:'',body:''};coachRender();return;}
  if(a==='cpledit'){const l=find(t.dataset.id);if(l){CP.ls={id:l.id,tag:l.tag,title:l.title,body:l.body,active:l.active};coachRender();window.scrollTo(0,0);}return;}
  if(a==='cpltag'){CP.ls.tag=t.dataset.v;coachRender();return;}
  if(a==='cplcancel'){CP.ls=null;coachRender();return;}
  if(a==='cplsave'){const f=CP.ls;if(!f.title.trim()||!f.body.trim()){f.err='Falta el título o el texto.';coachRender();return;}f.busy=true;f.err='';coachRender();
    try{await DB.saveLesson({id:f.id,title:f.title.trim(),body:f.body.trim(),tag:f.tag,active:f.active!==false},ME.id);CP.ls=null;await lessonsLoad(true);toast('Lección guardada ✓');}catch(x){f.busy=false;f.err='No se pudo guardar.';}coachRender();return;}
  if(a==='cpltog'){const l=find(t.dataset.id);if(!l)return;try{await DB.saveLesson({id:l.id,title:l.title,body:l.body,tag:l.tag,active:!l.active},ME.id);await lessonsLoad(true);}catch(x){toast('No se pudo cambiar');}coachRender();return;}
  if(a==='cpldel'){if(!confirm('¿Eliminar esta lección? No se puede deshacer.'))return;try{await DB.delLesson(t.dataset.id);await lessonsLoad(true);toast('Eliminada');}catch(x){toast('No se pudo eliminar');}coachRender();}},true);

/* botón atrás (móvil y PC): navegar hacia atrás dentro de la app en vez de salir */
let _nvLast=null,_nvBusy=false;
function nvSnap(){try{if(typeof PROFILE==='undefined'||!PROFILE)return null;const sh=document.getElementById('sheet');const so=!!(sh&&sh.classList.contains('on'));
  if(PROFILE.role==='coach')return {r:1,sec:CP.sec,v:CP.view,cid:CP.cid||null,tab:CP.tab||null,rt:(typeof RT!=='undefined'&&RT.open)?1:0,sh:so};
  return {r:0,t:S.tab,p:S.profile||false,c:!!S.chatOpen,g:S.tg||null,s:(S.prog&&S.prog.seg)||null,sh:so};}catch(e){return null;}}
const nvSig=s=>JSON.stringify(s);
let _nvAct=false;['click','touchend','keydown'].forEach(ev=>document.addEventListener(ev,()=>{_nvAct=true;},{capture:true,passive:true}));
function nvSync(){if(_nvBusy||!_nvAct)return;const s=nvSnap();if(!s)return;const sg=nvSig(s);
  if(_nvLast===null){_nvLast=sg;try{history.replaceState({erre:1,guard:1},'');history.pushState({erre:1,snap:s},'');}catch(e){}return;}
  if(sg!==_nvLast){_nvLast=sg;try{history.pushState({erre:1,snap:s},'');}catch(e){}}}
document.addEventListener('click',()=>setTimeout(nvSync,80),true);setInterval(nvSync,500);
let _nvArm=false;
window.addEventListener('popstate',e=>{const st=e.state;if(st&&st.erre&&st.guard){const cs=nvSnap();if(!cs)return;try{history.pushState({erre:1,snap:cs},'');}catch(x){}_nvLast=nvSig(cs);
    if(_nvArm){_nvArm=false;sheet(`<h3>¿Salir de la app?</h3><div class="sub">Tu progreso está guardado.</div><button class="btn solid" data-act="nvstay" style="width:100%;margin-top:8px">Quedarme</button><button class="btn" data-act="nvexit" style="width:100%;margin-top:8px">Salir</button>`);}
    else{_nvArm=true;toast('Toca atrás otra vez para salir');setTimeout(()=>{_nvArm=false;},3000);}return;}
  if(!st||!st.erre||!st.snap)return;const s=st.snap,cur=nvSnap();if(!cur||cur.r!==s.r)return;_nvBusy=true;
  try{
    const sh=document.getElementById('sheet');if(sh&&sh.classList.contains('on')&&!s.sh)closeSheet();
    if(s.r===1){
      if(cur.rt&&!s.rt){const bk=document.querySelector('[data-act="rtback"]');if(bk){bk.click();}
        if(typeof RT!=='undefined'&&RT.open){history.pushState({erre:1,snap:cur},'');_nvBusy=false;return;}}
      CP.sec=s.sec||CP.sec;
      if(s.v==='client'&&s.cid&&CP.cid===s.cid&&CP.d){CP.view='client';CP.tab=s.tab||CP.tab;}else{CP.view='list';}
      if(CP.sec==='chat')cpInboxLoad();clearInterval(CP.poll);coachRender();
    }else{
      S.tab=s.t;S.profile=s.p;S.chatOpen=s.c;S.tg=s.g;if(s.s&&S.prog)S.prog.seg=s.s;save();render();
    }
  }catch(x){}
  setTimeout(()=>{_nvLast=nvSig(nvSnap());_nvBusy=false;},150);});

document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="nvstay"],[data-act="nvexit"]');if(!t)return;e.stopPropagation();
  if(t.dataset.act==='nvstay'){closeSheet();return;}
  _nvBusy=true;closeSheet();try{history.go(-2);}catch(x){}setTimeout(()=>{_nvBusy=false;try{window.close();}catch(x){}},400);},true);

/* sin zoom con pellizco (iOS ignora user-scalable) */
['gesturestart','gesturechange','gestureend'].forEach(ev=>document.addEventListener(ev,e=>e.preventDefault(),{passive:false}));
document.addEventListener('touchmove',e=>{if(e.touches&&e.touches.length>1)e.preventDefault();},{passive:false});



/* Chat con el coach: icono del botón y pantalla para Basic */
var CHATIC='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z"/></svg>';
chatLocked=function(){
  const R=(bg,ic,t,d)=>`<div class="clk-row"><div class="clk-ic" style="background:${bg}">${ic}</div><div><b>${t}</b><span>${d}</span></div></div>`;
  return `<button class="lblbtn" data-act="chatback" style="color:var(--gray);margin:2px 0 10px">‹ Volver</button>
  <div class="clk-hero"><span class="clk-tag">Solo en Complete</span><h2>Habla 1 a 1 con tu coach</h2><p>Mensajes directos con Juanjo: dudas, molestias y tus notas de cada entrenamiento.</p>
   <div class="clk-b cb">¿Cómo sentiste la sesión de hoy?</div><div class="clk-b mb">Pesado en sentadilla, pero salió 💪</div><div class="clk-b cb">Perfecto, subimos 2,5 kg el lunes.</div></div>
  ${R('#F5E4E0','💬','Chat directo con tu coach','Tus dudas y notas de entrenamiento le llegan a él, sin grupos ni ruido.')}
  ${R('#E4EEE6','🎯','Programa hecho para ti','Tu mesociclo según tu anamnesis, lesiones y objetivo.')}
  ${R('#E8E9F4','🏋️','Pesos de referencia y ajustes','Cargas sugeridas y cambios apenas hay una molestia.')}
  ${R('#F6EFD9','📞','Llamada 1:1 cada ~45 días','Revisión de objetivos y ajustes más profundos.')}
  <button class="clk-cta" data-act="upsell">Conocer Complete</button><div class="clk-sub">Sigues con tu plan Basic mientras decides.</div>`;
};

/* Chat con el coach: tarjeta compacta, mensajes anclados abajo */
chatView=function(){
  return `<button class="lblbtn" data-act="chatback" style="color:var(--gray);margin:2px 0 8px">‹ Volver</button>
  <div class="cw"><div class="cwh"><i>J</i><div><b>Juanjo · tu coach</b><span>Mensajes directos 1 a 1</span></div></div>
   <div class="cwm" id="cwm">${threadHTML('client')}</div>
   <div class="chatin"><input id="chatIn" placeholder="Escribe un mensaje…"><button data-act="send">Enviar</button></div></div>`;
};
(function(){const r0=render;render=function(){const x=r0.apply(this,arguments);try{if(S.chatOpen){const m=document.getElementById('cwm');if(m)m.scrollTop=m.scrollHeight;}}catch(e){}return x;};})();

/* Planes: una pestaña por plan, tarjeta de precio y beneficios con ícono */
var PLSEL=null;
const PLD={
 basic:{n:'Basic',cls:'pb',precio:'Desde $24',per:' USD / mes · precio fundador',tag:'Autoguiado · Fundador',txt:'Tu programa por nivel y bloque, con progresión automática. Entrenas a tu ritmo.',
  r:[['#E8E9F4','🎯','Programa por nivel y bloque','Principiante, Intermedio o Avanzado',1],['#E4EEE6','📅','Hasta 5 días de fuerza','Mesociclos de 5 semanas',1],['#F6EFD9','🎥','Videos de cada ejercicio','Para que lo hagas bien',1],['#F5E4E0','💬','Chat con tu coach','',0],['#F6EFD9','📞','Llamada 1:1','',0]]},
 complete:{n:'Complete',cls:'pc',precio:'$400',per:' USD · fundador (antes $500)',tag:'Coaching 1:1 · Fundador',txt:'El mismo método, pero con tu coach diseñando y ajustando tu programa para ti.',
  r:[['#F5E4E0','💬','Chat directo con tu coach','Dudas y notas de cada sesión',1],['#E4EEE6','🎯','Programa a tu medida','Según tu anamnesis y lesiones',1],['#E8E9F4','🏋️','Pesos de referencia y ajustes','Cambios si hay una molestia',1],['#F6EFD9','📸','Tu coach comenta tus fotos','',1],['#F6EFD9','📞','Llamada 1:1 cada ~45 días','Revisión de objetivos',1]]},
 elite:{n:'Elite',cls:'pe',precio:'$1.000',per:' USD · premium',tag:'Acompañamiento cercano',txt:'Todo Complete, con más contacto directo de tu coach durante la semana.',
  r:[['#F5E4E0','✅','Todo lo de Complete','',1],['#F6EFD9','📞','Llamada 1:1 cada 30 días','El doble de seguimiento',1],['#E4EEE6','🔔','Check-ins más frecuentes','',1],['#E8E9F4','⚡','Ajuste de carga en la semana','Sin esperar al domingo',1]]}
};
plansView=function(){
  const cur=tier(),sel=PLSEL||(cur==='basic'?'complete':cur),P=PLD[sel];
  const seg=['basic','complete','elite'].map(k=>`<button class="${sel===k?'on ':''}${k==='complete'?'pc':''}" data-act="plsel" data-v="${k}">${PLD[k].n}${cur===k?'<i></i>':''}</button>`).join('');
  const rows=P.r.map(x=>`<div class="plr${x[4]?'':' no'}"><div class="ic" style="background:${x[0]}">${x[1]}</div><span>${x[2]}${x[3]?`<small>${x[3]}</small>`:''}</span><i class="ok">${x[4]?'✓':'—'}</i></div>`).join('');
  const msg=`Hola Juanjo, soy ${(S.user&&S.user.name)||''}. Estoy en ${TN[cur]} y quiero pasar a ${P.n}.`;
  const cta=sel===cur?`<div class="clk-sub" style="margin-top:10px"><b>Este es tu plan actual</b></div>`:`${PLAN_EXTRA[sel]?planBtns(sel,msg):`<a class="plcta" href="${planLink(sel,msg)}" target="_blank" rel="noopener">Quiero ${P.n}</a>`}<div class="clk-sub">${sel==='basic'?'Pagas seguro en Whop con el mismo correo de tu cuenta.':'Se abre un WhatsApp directo con tu coach.'}</div>`;
  return `<button class="lblbtn" data-act="plback" style="color:var(--gray);margin:2px 0 4px">‹ Volver</button>
   <h2 class="h2" style="margin-top:2px">Elige tu plan</h2><div class="sub2">Todos usan el Método Complete. Cambia cuánto te acompaña tu coach.</div>
   <div class="pls">${seg}</div>
   <div class="plh ${P.cls}"><small>${P.tag}${sel===cur?' · Tu plan':''}</small><b>${P.precio}<em>${P.per}</em></b><p>${P.txt}</p></div>
   ${rows}${cta}
   <details class="pldet"><summary>Ver comparación completa</summary>${plansTable()}</details>`;
};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="plsel"]');if(!t)return;e.stopPropagation();PLSEL=t.getAttribute('data-v');render();},true);

function plansTable(){try{const m=plansView0().match(/<table[\s\S]*<\/table>/);return m?m[0]:'';}catch(e){return '';}}

/* Planes en Inicio: tres fichas de precio que abren la pantalla de planes */
(function(){const hv0=homeView;homeView=function(){const cur=tier();
  const T=(k,p)=>`<button class="pht ${PLD[k].cls}" data-act="plgo" data-v="${k}">${cur===k?'<em>Tu plan</em>':''}<b>${PLD[k].n}</b><span>${p}</span></button>`;
  return hv0.apply(this,arguments)+`<div class="phsp"></div><details class="phm"${PHOPEN?' open':''}><summary><span><b>Planes ERRE</b><small>Tu plan: ${PLD[cur].n}</small></span><i>▾</i></summary><div class="sub2" style="margin-top:10px">Toca uno para ver qué incluye.</div><div class="phg">${T('basic','$29 / mes')}${T('complete','$500')}${T('elite','$1.000')}</div></details>`;};})();
var PHOPEN=false;document.addEventListener('toggle',e=>{if(e.target&&e.target.classList&&e.target.classList.contains('phm'))PHOPEN=e.target.open;},true);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="plgo"]');if(!t)return;e.stopPropagation();PLSEL=t.getAttribute('data-v');S.planFrom=(S.profile&&S.profile!=='plans')?S.profile:false;S.profile='plans';S.chatOpen=false;save();render();window.scrollTo(0,0);},true);

/* Planes en la pantalla de entrada (sin cuenta): mismo diseño que dentro de la app */
var PLPUB='complete';
var plansPublic1=function(){
  const P=PLD[PLPUB],seg=['basic','complete','elite'].map(k=>`<button class="${PLPUB===k?'on ':''}${k==='complete'?'pc':''}" data-act="plpub" data-v="${k}">${PLD[k].n}</button>`).join('');
  const rows=P.r.map(x=>`<div class="plr${x[4]?'':' no'}"><div class="ic" style="background:${x[0]}">${x[1]}</div><span>${x[2]}${x[3]?`<small>${x[3]}</small>`:''}</span><i class="ok">${x[4]?'✓':'—'}</i></div>`).join('');
  const msg=`Hola Juanjo, quiero información del plan ${P.n} de ERRE.`;
  return `<div class="plpub"><div class="pltt">Elige tu membresía</div><div class="sub2">Mira qué incluye cada plan.</div>
   <div class="pls">${seg}</div>
   <div class="plh ${P.cls}"><small>${P.tag}</small><b>${P.precio}<em>${P.per}</em></b><p>${P.txt}</p></div>
   ${rows}${PLAN_EXTRA[PLPUB]?planBtns(PLPUB,msg):`<a class="plcta" href="${planLink(PLPUB,msg)}" target="_blank" rel="noopener">Quiero ${P.n}</a>`}<div class="clk-sub">${PLPUB==='basic'?'Pagas seguro en Whop con el mismo correo de tu cuenta.':'Se abre un WhatsApp directo con tu coach.'}</div></div>`;
};
plansPublic=function(mode){
  if(mode!=='pend')return plansPublic1();
  const pb=PLAN_INFO.basic,msg='Hola Juanjo, quiero información del plan Basic de ERRE.';PLPUB='complete';
  return `<div class="plhero"><span class="plbadge">Precio fundador</span><b class="plhn">ERRE Basic</b><div class="plpr">$24 USD<em>/mes</em></div><div class="plfree">7 días gratis para empezar</div><p class="plsub">${pb.t}</p><ul>${pb.b.map(x=>`<li>${x}</li>`).join('')}</ul>${planBtns('basic',msg)}</div>
    <details class="plmore"><summary>¿Quieres coaching 1:1? Ver Complete</summary>${plansPublic1()}</details>`;
};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="plpub"]');if(!t)return;e.stopPropagation();PLPUB=t.getAttribute('data-v');try{const y=window.scrollY;if(typeof ME!=='undefined'&&ME&&PROFILE&&PROFILE.status==='pending')$('#app').innerHTML=pendingView();else showLogin();window.scrollTo(0,y);}catch(x){}},true);

/* Perfil: tarjeta "Mi plan" con el diseño de planes */
function planMine(){const cur=tier(),P=PLD[cur];
  const rows=P.r.filter(x=>x[4]).slice(0,3).map(x=>`<div class="plr"><div class="ic" style="background:${x[0]}">${x[1]}</div><span>${x[2]}</span><i class="ok">✓</i></div>`).join('');
  const up=cur==='basic'?`<button class="up" data-act="plgo" data-v="complete">Pasar a Complete</button>`:cur==='complete'?`<button data-act="plgo" data-v="elite">Conocer Elite</button>`:'';
  return `<div class="pmn"><div class="plh ${P.cls}"><small>Mi plan</small><b>${P.n}</b><p>${P.txt}</p></div>${rows}<div class="pmb"><button data-act="plgo" data-v="${cur}">Ver todos los planes</button>${up}</div></div>`;}


/* ---------- Fuerza: series diarias por grupo (con prioridad) e histórico por ejercicio ---------- */
const PGR=['Pecho','Espalda','Hombro','Brazos','Pierna','Glúteo','Core'];
const PRI={alta:{lo:4,hi:6,n:'Alta',c:'#C0392B'},media:{lo:2,hi:4,n:'Media',c:'#E08A2E'},baja:{lo:0,hi:2,n:'Baja',c:'#5B7FC7'}};
const prioOf=g=>{const v=S.prio&&S.prio[g];return PRI[v]?v:'media';};
const fzn=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
var FZ={g:'Todos',q:'',d:null};
function fzData(){
  const days={},ex={};
  Object.keys(S.logs||{}).forEach(k=>{const [date,did,bk,ii]=k.split('|');if(bk==='warm'||bk==='calm'||bk==='cardio')return;
    const sets=(S.logs[k]||[]).filter(x=>x&&x.done);if(!sets.length)return;
    const d=DAYS.find(x=>x.id===did)||(did==='free'&&typeof FREE!=='undefined'?FREE:null);if(!d)return;
    withDate(date,()=>{const b=d.blocks.find(x=>x.k===bk);if(!b)return;const it=itemsOf(d,b)[+ii];if(!it)return;
      const id=curEx(d,bk,+ii,it),e=E[id]||{};
      if(e.g&&PGR.includes(e.g)){const o=days[date]=days[date]||{};o[e.g]=(o[e.g]||0)+sets.length;}
      const w=sets.filter(x=>x.kg>0||x.reps).map(x=>({kg:+x.kg||0,reps:+x.reps||0}));
      if(w.length&&e.n){const a=ex[id]=ex[id]||[],f=a.find(r=>r.date===date);if(f)f.sets=f.sets.concat(w);else a.push({date,sets:w});}});});
  Object.values(ex).forEach(a=>a.sort((x,y)=>x.date<y.date?-1:1));
  return {days,ex};
}
const fzDate=d=>d===today()?'Hoy':cap(pd(d).toLocaleDateString('es-CO',{weekday:'short',day:'numeric'})).replace('.','');
function fzSeries(){
  const {days}=fzData(),dates=Object.keys(days).sort().reverse();
  if(!dates.length)return emptyCard('Aún no hay series registradas','Cuando marques series en Entrenar, aquí verás cuántas hiciste por grupo muscular.');
  const sel=FZ.d&&days[FZ.d]?FZ.d:dates[0],hasP=S.prio&&Object.keys(S.prio).length,coach=PROFILE&&PROFILE.role==='coach';
  const rows=Object.keys(days[sel]).sort((a,b)=>days[sel][b]-days[sel][a]).map(g=>{
    const n=days[sel][g],p=PRI[prioOf(g)],st=n<p.lo?'low':n>p.hi?'high':'ok',ex=st==='low'?p.lo-n:n-p.hi,col=st==='ok'?'#2E9D6B':st==='low'?(ex>=2?'#3B6FB6':'#5B9BD5'):(ex>=3?'#C0392B':ex===2?'#E08A2E':'#D9A21B'),mx=Math.max(8,n);
    const msg=st==='ok'?'En rango ✓':st==='low'?'Te faltaron '+(p.lo-n):'De más: '+(n-p.hi);
    return `<div class="fzr"><div class="fzh"><b>${g}</b>${hasP?`<span class="fzt" style="--c:${p.c}">${p.n}</span>`:''}<em>${n} serie${n>1?'s':''}</em></div>
     <div class="fzb"><u style="left:${p.lo/mx*100}%;width:${Math.max(.05,(p.hi-p.lo)/mx)*100}%"></u><i style="width:${n/mx*100}%;background:${col}"></i></div>
     <small style="color:${col}"><b>Objetivo ${p.lo}–${p.hi}</b> · ${msg}</small></div>`;}).join('');
  const chips=dates.slice(0,6).map(d=>`<button class="chip${d===sel?' on':''}" data-act="fzd" data-v="${d}">${fzDate(d)}</button>`).join('');
  const lb=(k,t)=>`<button class="fzt" style="--c:${PRI[k].c}" data-act="fzpri" data-v="${k}">${t} ⓘ</button>`;
  const leg=hasP?lb('alta','Alta 4–6')+lb('media','Media 2–4')+lb('baja','Baja 0–2'):lb('media','Referencia: 2–4 series por grupo');
  return `<h2 class="h2" style="margin-top:4px">Series por grupo</h2><div class="sub2" style="margin:0 0 8px">Series de trabajo de cada sesión contra el rango por prioridad.</div>
   <div class="chips" style="margin-bottom:8px">${chips}</div><div class="fzleg">${leg}</div>${rows}`;
}
function fzList(){
  const {ex}=fzData(),q=fzn(FZ.q).trim();
  let ids=Object.keys(ex).filter(id=>{const e=E[id]||{};if(FZ.g!=='Todos'&&e.g!==FZ.g)return false;
    return !q||fzn(e.n).includes(q)||fzn(e.mus||e.s).includes(q)||fzn(e.g).includes(q);});
  if(!ids.length)return `<div class="sub2" style="padding:10px 2px">No encontré ejercicios con ese filtro.</div>`;
  const last=id=>ex[id][ex[id].length-1],order=g=>{const i=PGR.indexOf(g);return i<0?99:i;};
  ids.sort((a,b)=>order(E[a].g)-order(E[b].g)||(last(b).date<last(a).date?-1:1));
  let cur='',h='';
  ids.forEach(id=>{const e=E[id],l=last(id),top=l.sets.reduce((a,s)=>(s.kg>a.kg||(s.kg===a.kg&&s.reps>a.reps))?s:a,l.sets[0]);
    if(e.g!==cur){cur=e.g;h+=`<div class="fzg">${cur}</div>`;}
    h+=`<button class="fzx" data-act="fzex" data-v="${id}"><span><b>${e.n}</b><small>${e.mus||e.s||e.g} · ${ex[id].length} sesión${ex[id].length>1?'es':''}</small></span><em>${top.kg?top.kg+' kg':''}${top.reps?' × '+top.reps:''}</em><i>›</i></button>`;});
  return h;
}
function fzEjer(){
  const {ex}=fzData(),gs=PGR.filter(g=>Object.keys(ex).some(id=>(E[id]||{}).g===g));
  if(!Object.keys(ex).length)return '';
  return `<h2 class="h2">Mis ejercicios</h2><div class="sub2" style="margin:0 0 8px">Toca un ejercicio para ver su historia de cargas y repeticiones.</div>
   <div class="chips" style="margin-bottom:8px">${['Todos'].concat(gs).map(g=>`<button class="chip${FZ.g===g?' on':''}" data-act="fzg" data-v="${g}">${g}</button>`).join('')}</div>
   <input id="fzq" class="fld" placeholder="Buscar ejercicio o músculo (ej. isquios)" value="${esc(FZ.q)}" style="margin-bottom:8px"><div id="fzlist">${fzList()}</div>`;
}
function fuerzaNew(){return fzSeries()+fzEjer();}
function fzSheet(id){
  const {ex}=fzData(),a=ex[id];if(!a)return;const e=E[id];
  const tops=a.map(r=>r.sets.reduce((m,s)=>s.kg>m?s.kg:m,0)),best=a.reduce((b,r)=>{r.sets.forEach(s=>{if(s.kg>b.kg||(s.kg===b.kg&&s.reps>b.reps))b={kg:s.kg,reps:s.reps,date:r.date};});return b;},{kg:0,reps:0,date:''});
  let chart='';if(a.length>=2&&Math.max(...tops)>0){const W=300,H=90,mn=Math.min(...tops),mx=Math.max(...tops),sp=mx-mn||1,px=i=>8+i*(W-16)/(a.length-1),py=v=>H-12-(v-mn)/sp*(H-30);
    chart=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;margin:6px 0 2px"><polyline fill="none" stroke="#C0392B" stroke-width="2.5" points="${tops.map((v,i)=>px(i)+','+py(v)).join(' ')}"/>${tops.map((v,i)=>`<circle cx="${px(i)}" cy="${py(v)}" r="3.5" fill="#C0392B"/>`).join('')}<text x="8" y="${H-1}" font-size="10" fill="#5A554E">${fzDate(a[0].date)}</text><text x="${W-8}" y="${H-1}" font-size="10" fill="#5A554E" text-anchor="end">${fzDate(a[a.length-1].date)}</text></svg><div class="sub2" style="margin:0 0 6px">Tu serie más pesada de cada sesión.</div>`;}
  const hist=a.slice().reverse().map(r=>`<div class="fzs"><b>${cap(pd(r.date).toLocaleDateString('es-CO',{weekday:'short',day:'numeric',month:'short'})).replace('.','')}</b><span>${r.sets.map(s=>`<i>${s.kg?s.kg+'×':''}${s.reps||'—'}</i>`).join('')}</span></div>`).join('');
  sheet(`<h3>${e.n}</h3><div class="sub">${e.mus||e.s||e.g} · ${e.eq||''}</div>
   <div class="stats"><div><small>Mejor serie</small><b>${best.kg?best.kg+' kg':'—'}${best.reps?' × '+best.reps:''}</b></div><div><small>Sesiones</small><b>${a.length}</b></div><div><small>Última</small><b>${fzDate(a[a.length-1].date)}</b></div></div>
   ${chart}<div class="fzhist">${hist}</div><button class="btn" data-act="close" style="width:100%;margin-top:10px">Cerrar</button>`);
}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="fzd"],[data-act="fzg"],[data-act="fzex"]');if(!t)return;e.stopPropagation();
  const a=t.dataset.act,v=t.dataset.v;if(a==='fzex'){fzSheet(v);return;}if(a==='fzd')FZ.d=v;else FZ.g=v;const y=window.scrollY;render();window.scrollTo(0,y);},true);
document.addEventListener('input',e=>{if(e.target&&e.target.id==='fzq'){FZ.q=e.target.value;const l=document.getElementById('fzlist');if(l)l.innerHTML=fzList();}},true);

/* Coach: prioridad por grupo en la ficha */
function prioSec(){try{
  const bl=(CP.d.blobs||[]).find(x=>x.key==='prio'),pr=(bl&&bl.value)||{};
  const row=g=>{const v=PRI[pr[g]]?pr[g]:'media';return `<div class="prr"><b>${g}</b><div class="prs">${['alta','media','baja'].map(k=>`<button class="${v===k?'on':''}" style="--c:${PRI[k].c}" data-act="cpprio" data-g="${g}" data-v="${k}">${PRI[k].n}</button>`).join('')}</div></div>`;};
  return `<section class="sec"><div class="sec-h"><b>Prioridad por grupo muscular</b></div><div class="note" style="margin-bottom:8px">Define cuántas series por sesión espera ver la app en cada grupo: <b>Alta 4–6 · Media 2–4 · Baja 0–2</b>. Por defecto todos están en Media. El cliente lo ve en Progreso → Fuerza.</div>${PGR.map(row).join('')}</section>`;}catch(e){return '';}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="cpprio"]');if(!t)return;e.stopPropagation();
  const bl=(CP.d.blobs||[]).find(x=>x.key==='prio'),pr=Object.assign({},(bl&&bl.value)||{});pr[t.dataset.g]=t.dataset.v;
  try{await DB.upsert('client_data',[{client_id:CP.cid,key:'prio',value:pr,updated_at:new Date().toISOString()}],'client_id,key');if(bl)bl.value=pr;else CP.d.blobs.push({key:'prio',value:pr});coachRender();}catch(x){toast('No se pudo guardar');}},true);

/* Infográfico de cada prioridad */
const PRID={
 alta:{t:'Lo que más quieres desarrollar',d:'Son los grupos donde buscamos el mayor estímulo. Aquí se concentra el trabajo más pesado y con más volumen de tu sesión.',ej:'Ej. un básico de 3 series + 1 o 2 accesorios.',ic:'🔥'},
 media:{t:'Desarrollo constante',d:'Grupos que seguimos trabajando bien, sin quitarle protagonismo a los de prioridad alta. Es el punto de partida de todos.',ej:'Ej. un ejercicio de 3 series, o dos de 2.',ic:'⚖️'},
 baja:{t:'Mantener sin gastar energía',d:'Grupos que mantenemos con poco volumen para que no se pierdan, dejando energía y recuperación para los prioritarios. Puede haber sesiones con 0 series.',ej:'Ej. un ejercicio de 2 series, o ninguno.',ic:'🌿'}
};
function fzPri(k){
  const P=PRI[k],D=PRID[k],mx=8,gs=PGR.filter(g=>prioOf(g)===k),hasP=S.prio&&Object.keys(S.prio).length;
  const dots=Array.from({length:mx},(_,i)=>{const n=i+1,on=n>=Math.max(1,P.lo)&&n<=P.hi;return `<i style="${on?`background:${P.c};border-color:${P.c}`:''}">${n}</i>`;}).join('');
  const seg=['alta','media','baja'].map(x=>`<button class="${x===k?'on ':''}" style="${x===k?`background:${PRI[x].c}`:''}" data-act="fzpri" data-v="${x}">${PRI[x].n}</button>`).join('');
  sheet(`<h3>Prioridad ${P.n.toLowerCase()}</h3><div class="pls" style="margin:8px 0 10px">${seg}</div>
   <div class="plh" style="background:${P.c}"><small>${D.ic} ${D.t}</small><b>${P.lo}–${P.hi} <em>series por sesión</em></b><p>${D.d}</p></div>
   <div class="fzdots">${dots}</div><div class="sub2" style="text-align:center;margin:4px 0 10px">Las series de color son el rango objetivo${P.lo===0?' (0 también vale)':''}.</div>
   <div class="plr"><div class="ic" style="background:#F6EFD9">🏋️</div><span>Cómo se ve en una sesión<small>${D.ej}</small></span></div>
   <div class="plr"><div class="ic" style="background:#E4EEE6">🎯</div><span>${hasP?'Tus grupos con esta prioridad':'Tus grupos'}<small>${hasP?(gs.length?gs.join(' · '):'Ninguno por ahora'):'Tu coach puede marcar cuáles son prioridad alta o baja.'}</small></span></div>
   <div class="plr"><div class="ic" style="background:#E8E9F4">📊</div><span>Cómo leer tu barra<small><b style="color:#2E9D6B">Verde</b>: en rango · <b style="color:#E08A2E">Ámbar</b>: te faltaron series · <b style="color:#8A847B">Gris</b>: de más</small></span></div>
   <button class="btn" data-act="close" style="width:100%;margin-top:6px">Cerrar</button>`);
}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="fzpri"]');if(!t)return;e.stopPropagation();fzPri(t.dataset.v);},true);


/* ---------- ACCESO / VENCIMIENTO (Whop) ---------- */
const GRACE_D=3,RENEW_URL=WHOP_RENEW;
let ACC={row:null,state:'ok'};
function accState(r){if(!r||!r.paid_until)return 'ok';const e=new Date(r.paid_until).getTime(),n=Date.now();if(n<=e)return 'ok';if(r.period==='cortesia')return 'expired';if(n<=e+GRACE_D*86400000)return 'grace';if(r.whop_status==='past_due'&&r.payment_failed_at&&n<new Date(r.payment_failed_at).getTime()+5*86400000)return 'grace';return 'expired';}
const accFmt=d=>d?new Date(d).toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric',timeZone:'America/Bogota'}):'';
async function accessFetch(){try{const em=String((ME&&ME.email)||'').toLowerCase();if(!em||!DB.accessMine)return null;return await DB.accessMine(em);}catch(e){return null;}}
async function accessGate(){ // si falla, NUNCA bloquea
  try{ACC.row=await accessFetch();ACC.state=accState(ACC.row);}catch(e){ACC.state='ok';}
  return false;}
function accessView(){
  const nm=esc((PROFILE.full_name||'').split(' ')[0]||''),r=ACC.row||{};
  const msg=encodeURIComponent('Hola Juanjo, quiero renovar mi plan ('+(ME.email||'')+').');
  const act=RENEW_URL?`<a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:14px;text-decoration:none" href="${RENEW_URL}" target="_blank" rel="noopener">Renovar mi plan</a>`
   :`<a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:14px;text-decoration:none" href="https://wa.me/${COACH_WA}?text=${msg}" target="_blank" rel="noopener">Renovar mi plan</a>`;
  return authHead()+`<h2 class="h2" style="margin-top:14px">${nm?nm+', t':'T'}u ${r.period==='cortesia'?'cortesía terminó':'plan venció'}</h2><p class="lead">Tu acceso ${r.period==='cortesia'?'de cortesía ':''}terminó el ${accFmt(r.paid_until)}. ${r.period==='cortesia'?'Para continuar, escríbele a tu coach o activa un plan':'Renueva para seguir entrenando'}: tu historial, tus cargas y tu programa se quedan guardados y retomas donde lo dejaste.</p>${act}
   <button class="btn" data-act="accchk" style="width:100%;padding:14px;margin-top:10px">Ya renové: revisar</button>
   <button class="lblbtn" data-act="pendout" style="display:block;margin:12px auto 0;color:var(--gray)">Cerrar sesión</button>`;}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="accchk"]');if(!t)return;e.stopPropagation();
  t.disabled=true;try{ACC.row=await accessFetch();ACC.state=accState(ACC.row);if(ACC.state==='expired'){toast('Aún no vemos tu pago. Puede tardar unos minutos.');t.disabled=false;}else{const dd=document.getElementById('pvsh');if(dd)dd.remove();await startClient();}}catch(x){t.disabled=false;toast('No pudimos revisar. Intenta de nuevo.');}},true);
// aviso en Inicio durante los días de gracia
(function(){const hv1=homeView;homeView=function(){const h=hv1.apply(this,arguments);
  const r=ACC.row||{},fail=!!(r.payment_failed_at&&r.whop_status==='past_due');
  if(ACC.state!=='grace'&&!fail)return h;
  const MANAGE='https://whop.com/@me/settings/memberships';
  if(fail){return `<div class="accb"><b>No pudimos procesar tu pago</b><span>Actualiza tu tarjeta para no perder el acceso.</span><a href="${MANAGE}" target="_blank" rel="noopener" style="font-weight:700;color:inherit;text-decoration:underline;white-space:nowrap">Actualizar tarjeta</a></div>`+h;}
  const left=Math.max(0,Math.ceil((new Date(r.paid_until).getTime()+GRACE_D*86400000-Date.now())/86400000));
  return `<div class="accb"><b>Tu plan venció el ${accFmt(r.paid_until)}</b><span>Te quedan ${left} día${left===1?'':'s'} de gracia. Renueva para no perder el acceso.</span></div>`+h;};})();
// Acceso y pago: «empieza» + periodo → vence (suma meses calendario; 31 ene + 1 mes = 28/29 feb)
const ACC_M={mensual:1,trimestral:3,anual:12};
function accAddM(ds,n){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(ds||'');if(!m)return '';let y=+m[1],mo=+m[2]-1+n,d=+m[3];y+=Math.floor(mo/12);mo=((mo%12)+12)%12;const last=new Date(Date.UTC(y,mo+1,0)).getUTCDate();d=Math.min(d,last);return y+'-'+String(mo+1).padStart(2,'0')+'-'+String(d).padStart(2,'0');}
function accStartOf(v,per){return ACC_M[per]&&v?accAddM(v,-ACC_M[per]):'';}
function accCalc(){const s=(document.getElementById('accS')||{}).value,p=(document.getElementById('accP')||{}).value,D=document.getElementById('accD');if(s&&ACC_M[p]&&D)D.value=accAddM(s,ACC_M[p]);}
document.addEventListener('change',e=>{const i=e.target&&e.target.id;if(i==='accS'||i==='accP')accCalc();},true);
// coach: ficha del cliente → Acceso
function accSec(){try{
  const cid=CP.cid;if(!cid)return '';
  if(!CP.acc||CP.acc.cid!==cid){CP.acc={cid,row:undefined};
    (DB.accessOf?DB.accessOf(cid):Promise.resolve(null)).then(r=>{CP.acc={cid,row:r||null};try{coachRender(true);}catch(x){}}).catch(()=>{CP.acc={cid,row:null};});
    return '<section class="sec"><div class="sec-h"><b>Acceso y pago</b></div><div class="note">Cargando…</div></section>';}
  const r=CP.acc.row,st=accState(r),lab={ok:r&&r.paid_until?'Activo':'Activo · sin vencimiento',grace:'En días de gracia',expired:'Vencido'}[st],col={ok:'#2E9E5B',grace:'#E8A317',expired:'#E5484D'}[st];
  const v=r&&r.paid_until?new Date(r.paid_until).toLocaleDateString('en-CA',{timeZone:'America/Bogota'}):'';
  const per=(r&&r.period)||'';
  return `<section class="sec"><div class="sec-h"><b>Acceso y pago</b></div>
   <div class="pfrow"><span><b style="color:${col}">${lab}</b><small>${r?`${r.period==='cortesia'?'🎁 Cortesía':(r.source==='whop'?'Whop':'Manual')} · ${r.tier||''}${per&&per!=='manual'?' · '+per:''}${r.paid_until?' · vence '+accFmt(r.paid_until):''}${r.whop_status==='trialing'?' · en prueba':''}${r.cancel_at_period_end?' · CANCELADA (no se renueva)':''}`:'Sin registro de pago todavía'}</small></span></div>
   <div class="note" style="margin:10px 0 6px"><b>🎁 Cortesía</b> · acceso con todas las funciones del plan que elijas, sin cobro ni renovación. Termina el día que pongas.</div>
   <select class="fld" id="crtP">${[['basic','Basic'],['complete','Complete'],['elite','Elite']].map(o=>`<option value="${o[0]}"${((CP.d.profile&&CP.d.profile.plan)||'basic')===o[0]?' selected':''}>${o[1]}</option>`).join('')}</select>
   <label class="pfl">Termina el (hasta las 11:59 pm)</label><input class="fld" type="date" id="crtD" value="${r&&r.period==='cortesia'?v:''}">
   <button class="btn" data-act="crtsave" style="width:100%;margin:8px 0 14px">${r&&r.period==='cortesia'?'Cambiar cortesía':'Dar cortesía'}</button>
   <label class="pfl">Empieza el</label><input class="fld" type="date" id="accS" value="${accStartOf(v,per)}">
   <label class="pfl">Periodo</label><select class="fld" id="accP">${[['','—'],['mensual','Mensual (1 mes)'],['trimestral','Trimestral (3 meses)'],['anual','Anual (12 meses)'],['unico','Pago único'],['cuotas','En cuotas']].map(o=>`<option value="${o[0]}"${per===o[0]?' selected':''}>${o[1]}</option>`).join('')}</select>
   <label class="pfl">Vence el (hasta las 11:59 pm) <small style="color:var(--gray)">· se calcula solo, puedes cambiarlo</small></label><input class="fld" type="date" id="accD" value="${v}">
   <div class="note" style="margin-top:6px">Con Whop conectado esto se llena solo en cada pago. Aquí pones cuándo empieza y el periodo, y el vencimiento se calcula solo (puedes corregirlo a mano). Dejar el vencimiento vacío = sin vencimiento. Tras vencer hay ${GRACE_D} días de gracia.</div>
   <button class="btn solid" data-act="accsave" style="width:100%;margin-top:8px">Guardar acceso</button></section>`;}catch(e){return '';}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="crtsave"]');if(!t)return;e.stopPropagation();
  try{const d=(document.getElementById('crtD')||{}).value||'',pl=(document.getElementById('crtP')||{}).value||'basic',r=CP.acc&&CP.acc.row,tdy=new Date().toLocaleDateString('en-CA',{timeZone:'America/Bogota'});
    if(!d||d<tdy){toast('Elige una fecha de fin (hoy o después)');return;}
    const nmp={basic:'Basic',complete:'Complete',elite:'Elite'}[pl],who=((CP.d.profile&&CP.d.profile.full_name)||'esta persona').split(' ')[0];
    if(!confirm('¿Dar a '+who+' acceso de cortesía al plan '+nmp+' hasta el '+d+'?'+(r&&r.source==='whop'&&r.period!=='cortesia'?'\n\nOjo: tiene un plan pagado por Whop; la cortesía reemplaza su fecha de vencimiento aquí.':'')+'\n\nAl terminar se le pedirá continuar con un plan.'))return;
    if(((CP.d.profile&&CP.d.profile.plan)||'')!==pl){await DB.updateClient(CP.cid,{plan:pl});CP.d.profile.plan=pl;}
    const row={email:r&&r.email,tier:pl,period:'cortesia',paid_until:new Date(d+'T23:59:00-05:00').toISOString(),source:'manual'};
    const full=await DB.accessSave(row,CP.cid);try{DB.logAct(CP.cid,'cli','Cortesía '+nmp+' hasta '+d);}catch(x){}
    CP.acc={cid:CP.cid,row:Object.assign({},r||{},full)};coachRender(true);toast('Cortesía activada');}catch(x){console.warn(x);toast('No se pudo guardar');}},true);
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="accsave"]');if(!t)return;e.stopPropagation();
  try{const d=(document.getElementById('accD')||{}).value||'',p=(document.getElementById('accP')||{}).value||null;
    const r=CP.acc&&CP.acc.row;
    const row={email:r&&r.email,tier:(CP.d.profile&&CP.d.profile.plan)||'basic',period:p||'manual',paid_until:d?new Date(d+'T23:59:00-05:00').toISOString():null,source:'manual'};
    const full=await DB.accessSave(row,CP.cid);
    CP.acc={cid:CP.cid,row:Object.assign({},r||{},full)};coachRender(true);toast('Acceso guardado');}catch(x){console.warn(x);toast('No se pudo guardar');}},true);


/* ---------- ASIGNACIÓN AUTOMÁTICA DE PROGRAMA BASIC (selector en la base) ---------- */
const FOCN={balanceado:'Cuerpo balanceado',gluteo:'Glúteo y pierna',torso:'Torso'};
const FOCD=sx=>sx==='Mujer'?'gluteo':'balanceado';
async function basicAssign(){
  try{const o=S.ob,f=(o&&o.form)||{};if(!(o&&o.plan==='basic')||!DB.assignBasic||!S.user)return;
    const focus=f.focus||FOCD(f.sex);
    const r=await DB.assignBasic(focus,S.user.days,S.user.level);
    S.assigned=r;await loadClientRoutine(ME.id);save();try{render();}catch(e){}}
  catch(e){console.warn('assignBasic',e);S.assignErr=String((e&&e.message)||e);}
}
(function(){const os0=obSubmit;obSubmit=function(){
  try{if(S.ob&&S.ob.plan==='basic'&&S.ob.form&&!S.ob.form.focus)S.ob.form.focus=FOCD(S.ob.form.sex);}catch(e){}
  const r=os0.apply(this,arguments);if(r!==false&&S.ob&&S.ob.step==='done')basicAssign();return r;};})();


/* ---------- REGISTRO PASO A PASO + MI PERFIL DESPLEGABLE + CAMBIAR PROGRAMA ---------- */
(function(){const st=document.createElement('style');st.textContent=`
.wzp{display:flex;align-items:center;gap:10px;margin:6px 0 14px}.wzp small{color:var(--gray);font-size:12px;white-space:nowrap}.wzb{flex:1;height:6px;border-radius:99px;background:var(--line);overflow:hidden}.wzb i{display:block;height:100%;background:var(--red-strong,#C0392B);border-radius:99px;transition:width .25s}
.wzq{font-size:22px;line-height:1.2;margin:4px 0 6px}.wzs{color:var(--gray);font-size:14px;margin:0 0 14px}
.wzn{display:flex;gap:10px;margin-top:18px}.wzn .btn{flex:1;padding:14px}
details.sec.acc{padding:0}details.acc>summary{list-style:none;display:flex;justify-content:space-between;align-items:center;padding:16px 14px;cursor:pointer;font-family:'Archivo';font-stretch:125%;font-weight:600;text-transform:uppercase;letter-spacing:.04em;font-size:13px;-webkit-user-select:none;user-select:none}
details.acc>summary::-webkit-details-marker{display:none}details.acc>summary::after{content:'›';font-size:20px;line-height:1;color:var(--gray);transform:rotate(90deg);transition:transform .2s}details.acc[open]>summary::after{transform:rotate(-90deg)}
details.acc>summary small{display:block;font-family:inherit;font-stretch:100%;font-weight:400;text-transform:none;letter-spacing:0;color:var(--gray);font-size:12px;margin-top:2px}
.accbody{padding:0 14px 14px;border-top:1px solid var(--line)}
#acct details.acc{border:1px solid var(--line);border-radius:14px;margin-bottom:10px;background:var(--card)}`;document.head.appendChild(st);})();

/* --- registro visual: siluetas, días, nivel, horario --- */
function bodySvg(k,zone){
  const U=(zone==='all'||zone==='upper')?' on':'',L=(zone==='all'||zone==='lower')?' on':'',H=zone==='all'?' on':'';
  const f=k==='f',tor=f?'M27 36Q27 30 36 30L64 30Q73 30 73 36L65 80L35 80Z':'M22 36Q22 30 32 30L68 30Q78 30 78 36L70 98L30 98Z';
  const hip=f?'M35 80L65 80L73 110L27 110Z':'';
  const arm=f?'M23 38Q16 40 16 48L17 90Q18 96 23 96Q28 96 28 90L29 44Z':'M16 38Q10 40 10 48L12 88Q13 94 19 94Q24 94 24 88L24 44Z';
  const y0=f?110:98,leg=`M${f?28:30} ${y0}L49 ${y0}L47 178Q47 184 41 184Q35 184 35 178Z`;
  return `<svg viewBox="0 0 100 190" aria-hidden="true"><circle class="bz${H}" cx="50" cy="16" r="11"/><path class="bz${U}" d="${tor}"/>${hip?`<path class="bz${L}" d="${hip}"/>`:''}<path class="bz${U}" d="${arm}"/><path class="bz${U}" d="${arm}" transform="translate(100 0) scale(-1 1)"/><path class="bz${L}" d="${leg}"/><path class="bz${L}" d="${leg}" transform="translate(100 0) scale(-1 1)"/></svg>`;
}
const SUNI={sun:'<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="7"/><g stroke-width="2.5" stroke-linecap="round"><path d="M20 4v5M20 31v5M4 20h5M31 20h5M8.7 8.7l3.5 3.5M27.8 27.8l3.5 3.5M31.3 8.7l-3.5 3.5M12.2 27.8l-3.5 3.5"/></g></svg>',
 dusk:'<svg viewBox="0 0 40 40"><path d="M9 28a11 11 0 0 1 22 0Z"/><g stroke-width="2.5" stroke-linecap="round"><path d="M4 33h32M20 8v5M7 15l3.5 3.5M33 15l-3.5 3.5"/></g></svg>',
 moon:'<svg viewBox="0 0 40 40"><path d="M26 6a14 14 0 1 0 8 25A12 12 0 0 1 26 6Z"/></svg>'};
const obVisCss=document.createElement('style');obVisCss.textContent=`
.bz{fill:#D3CEC6;transition:fill .2s}.bz.on{fill:var(--red-strong,#C0392B)}
.gog{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:6px}
.goc{position:relative;border:2px solid var(--line);border-radius:18px;background:var(--card);display:flex;flex-direction:column;align-items:center;gap:4px;padding:18px 8px 14px;font-family:inherit;color:inherit;cursor:pointer;transition:all .15s}
.goc svg{width:46px;height:46px;fill:#B9B3AA;stroke:#B9B3AA;margin-bottom:4px;transition:all .2s}.goc.on svg{fill:var(--red-strong,#C0392B);stroke:var(--red-strong,#C0392B);transform:scale(1.12)}
.goc.on{border-color:var(--red-strong,#C0392B);background:var(--red-tint,#FBEDEA)}.goc:active{transform:scale(.97)}
.goc b{font-size:16px;font-weight:700}.goc small{color:var(--gray);font-size:12px;text-align:center;line-height:1.25}
.gck{position:absolute;top:8px;right:10px;font-style:normal;background:var(--red-strong,#C0392B);color:#fff;width:20px;height:20px;border-radius:50%;font-size:12px;display:flex;align-items:center;justify-content:center}
.gom{margin-top:14px;padding:14px 16px;border-radius:14px;background:var(--ink,#1C1B19);color:#fff;font-size:15px;font-weight:600;line-height:1.35;animation:gomIn .35s ease}
@keyframes gomIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
.wzhalf{display:inline-block;background:var(--ink,#1C1B19);color:#fff;font-size:12px;font-weight:700;padding:5px 12px;border-radius:99px;margin:4px 0 2px}
.gdiff{text-align:center;margin-top:10px;color:var(--gray);font-size:15px}.gdiff b{color:var(--red-strong,#C0392B);font-size:18px}
.phg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:6px}.phs{border:2px dashed var(--line);border-radius:16px;background:var(--card);aspect-ratio:3/4;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;overflow:hidden;position:relative}
.phs.has{border-style:solid;border-color:var(--red-strong,#C0392B)}.phs img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.phs svg{width:54px;height:102px;opacity:.55}.phs b{font-size:12px;position:relative;background:rgba(255,255,255,.85);padding:2px 8px;border-radius:99px}.phc{font-size:10px;color:var(--gray);position:relative}
.smc{display:flex;gap:14px;align-items:center;border:2px solid var(--red-strong,#C0392B);border-radius:20px;padding:14px;background:linear-gradient(180deg,var(--red-tint,#FBEDEA),var(--card,#fff))}
.smf svg{width:60px;height:114px}.smb{flex:1}.smr{padding:7px 0;border-bottom:1px solid var(--line)}.smr:last-child{border:0}.smr small{display:block;color:var(--gray);font-size:11px;text-transform:uppercase;letter-spacing:.06em}.smr b{font-size:15px}
.sxg{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px}
.sxc,.fzc,.lvc,.tmc{border:2px solid var(--line);border-radius:18px;background:var(--card);display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px 6px 12px;font-family:inherit;color:inherit;cursor:pointer;transition:border-color .15s,background .15s,transform .1s}
.sxc:active,.fzc:active,.lvc:active,.tmc:active{transform:scale(.97)}
.sxc.on,.fzc.on,.lvc.on,.tmc.on{border-color:var(--red-strong,#C0392B);background:var(--red-tint,#FBEDEA)}
.sxc svg{width:78px;height:148px}.sxc b,.fzc b,.lvc b,.tmc b{font-size:15px;font-weight:700}
.fzg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:6px}.fzc{padding:12px 4px 10px}.fzc svg{width:56px;height:106px}.fzc b{font-size:13px;text-align:center;line-height:1.15}
.fzc small{color:var(--gray);font-size:11px;text-align:center;line-height:1.2}
.dgr{display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-top:6px}
.ddc{aspect-ratio:1;border-radius:50%;border:2px solid var(--line);background:var(--card);font-weight:700;font-size:13px;font-family:inherit;color:inherit;padding:0;cursor:pointer;transition:all .15s}
.ddc.on{background:var(--red-strong,#C0392B);border-color:var(--red-strong,#C0392B);color:#fff;transform:scale(1.06)}
.dsum{margin-top:14px;padding:12px 14px;border-radius:14px;background:var(--card);border:1px solid var(--line);font-size:14px}.dsum b{font-size:17px}
.lvg,.tmg{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:6px}
.lvc svg{width:44px;height:36px}.lvc svg rect{fill:#D3CEC6}.lvc svg rect.on{fill:var(--red-strong,#C0392B)}
.tmc svg{width:38px;height:38px;fill:#B9B3AA;stroke:#B9B3AA}.tmc.on svg{fill:var(--red-strong,#C0392B);stroke:var(--red-strong,#C0392B)}
`;document.head.appendChild(obVisCss);

const GICO={bajar:'<svg viewBox="0 0 48 48"><path d="M24 6c3 7 11 11 11 21a11 11 0 0 1-22 0c0-5 3-8 5-11 1 3 3 4 4 4-1-5 0-10 2-14Z"/></svg>',
 complete:'<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke-width="3"/><circle cx="24" cy="24" r="10" fill="none" stroke-width="3"/><circle cx="24" cy="24" r="3.5" stroke="none"/></svg>',
 aumentar:'<svg viewBox="0 0 48 48"><path d="M4 20h4v8H4zM9 16h5v16H9zM34 16h5v16h-5zM40 20h4v8h-4zM14 22h20v4H14z"/></svg>',
 salud:'<svg viewBox="0 0 48 48"><path d="M24 41S6 30 6 18a9 9 0 0 1 18-3 9 9 0 0 1 18 3c0 12-18 23-18 23Z"/></svg>'};
const GMSG={bajar:'Vamos a bajar grasa cuidando tu músculo. Constancia, no sufrimiento.',complete:'Más músculo, menos grasa y un cuerpo que rinde. Tu mejor versión.',aumentar:'Vamos a construir masa muscular de verdad, sesión a sesión.',salud:'Más energía, mejor movimiento y un cuerpo que responde.'};
const GSUB={bajar:'Menos grasa, más definición',complete:'Recomponer: músculo arriba, grasa abajo',aumentar:'Ganar masa muscular',salud:'Energía y movimiento'};
function goalCards(f){const gl=f.goals||[],m=gl.includes(f.main)?f.main:gl[0];
  return `<div class="gog">${GOALS.map(g=>`<button class="goc${gl.includes(g[0])?' on':''}" data-act="obgoal" data-v="${g[0]}">${GICO[g[0]]}<b>${g[1]}</b><small>${GSUB[g[0]]||g[2]}</small>${gl.includes(g[0])?'<i class="gck">✓</i>':''}</button>`).join('')}</div>`+
  (m?`<div class="gom">${GMSG[m]}</div>`:'')+(gl.length>1?lab('¿Cuál es tu prioridad principal?')+chipsH('main',gl.map(x=>[x,GN[x]]),f.main):'');}

const NMT=['¿Cuándo naciste?','¿Cuánto pesas hoy?','¿Cuál es tu objetivo?','¿Cuánto te gustaría pesar?','¿Qué días puedes entrenar?','¿Cuál es tu nivel?'];
function nmT(t,f){const n=String(f.name||'').trim().split(/\s+/)[0];if(!n||NMT.indexOf(t)<0)return t;return esc(n.charAt(0).toUpperCase()+n.slice(1))+', ¿'+t.charAt(1).toLowerCase()+t.slice(2);}
function goalDiff(f){const a=+f.weight,b=+f.goalW;if(!(a>0&&b>0))return '';const d=Math.round((b-a)*10)/10;if(!d)return 'Mantener tu peso actual.';return `<b>${Math.abs(d).toString().replace('.',',')} kg ${d<0?'menos':'más'}</b> que hoy`;}
(function(){const r0=rlSet;rlSet=function(f){const x=r0.apply(this,arguments);if(f==='goalW'){const e=document.querySelector('[data-gd]');if(e)e.innerHTML=goalDiff(S.ob.form);}return x;};})();
function poseSvg(k,sx){
  if(k==='side')return `<svg viewBox="0 0 100 190" aria-hidden="true"><circle class="bz" cx="52" cy="16" r="11"/><path class="bz" d="M38 30Q62 30 62 42L58 98L40 98Q35 62 38 30Z"/><path class="bz" d="M46 38Q58 42 58 54L56 90Q55 96 49 96Q45 96 45 90Z"/><path class="bz" d="M42 98L58 98L55 178L66 182Q68 188 62 188L46 188Q42 188 42 182Z"/></svg>`;
  const b=bodySvg(sx==='Mujer'?'f':'m','none');
  return k==='back'?b.replace('</svg>','<path d="M50 32L50 96" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".8"/><path d="M36 44Q42 52 48 48M64 44Q58 52 52 48" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".7"/></svg>'):b;}
function obPhotos(){const mk=monthKey(),r=PH[mk]||{},sx=(S.ob&&S.ob.form&&S.ob.form.sex)||'';
  return `<div class="phg">${[['front','De frente'],['side','De lado'],['back','De espalda']].map(a=>`<label class="phs${r[a[0]]?' has':''}">${r[a[0]]?`<img src="${r[a[0]]}" alt="${a[1]}">`:poseSvg(a[0],sx)}<input type="file" accept="image/*" data-obph="${a[0]}" hidden><b>${a[1]}</b><span class="phc">📷 Toca para subir</span></label>`).join('')}</div><p class="hint">Con buena luz y ropa deportiva. Si hoy no quieres, sigue: la puedes subir después en tu progreso.</p>`;}
document.addEventListener('change',e=>{const k=e.target&&e.target.dataset&&e.target.dataset.obph;if(!k)return;e.stopPropagation();const fl=e.target.files&&e.target.files[0];if(!fl)return;
  resize(fl,url=>{const mk=monthKey();PH[mk]=Object.assign({d:today()},PH[mk]||{});PH[mk][k]=url;store.set('erre_photos',PH);try{SYNC.photos();}catch(x){}render();});},true);
function obSummary(o){const f=o.form||{},ks=f.sex==='Mujer'?'f':'m',fk=f.focus||(f.sex==='Mujer'?'gluteo':'balanceado'),zn={balanceado:'all',gluteo:'lower',torso:'upper'}[fk]||'all',wd=(f.wd||[]).slice().sort((a,b)=>a-b);
  const row=(a,b)=>`<div class="smr"><small>${a}</small><b>${b}</b></div>`,gl=(f.goals&&f.goals.length?f.goals:['complete']).map(x=>GN[x]).join(' + ');
  return `<div class="smc"><div class="smf">${bodySvg(ks,zn)}</div><div class="smb">${row('Objetivo',gl)}${(f.main==='bajar'||f.main==='aumentar')&&f.goalW?row('Meta de peso',String(f.goalW).replace('.',',')+' kg'):''}${row('Entrenas',wd.length+' día'+(wd.length===1?'':'s')+' · '+wd.map(i=>DNL[i]).join(' · '))}${row('Nivel',f.level||'Principiante')}${row('Énfasis',FOCN[fk]||'Cuerpo balanceado')}</div></div>`;}
function sexCards(f){return `<div class="sxg">${[['Mujer','f'],['Hombre','m']].map(a=>`<button class="sxc${f.sex===a[0]?' on':''}" data-act="obset" data-f="sex" data-v="${a[0]}">${bodySvg(a[1],'all')}<b>${a[0]}</b></button>`).join('')}</div>`;}
function focusCards(f){const k=f.sex==='Mujer'?'f':'m',fk=f.focus||(f.sex==='Mujer'?'gluteo':'balanceado');
  return `<div class="fzg">${[['balanceado','Cuerpo completo','Sin énfasis','all'],['gluteo','Glúteo y pierna','Más pierna','lower'],['torso','Torso','Espalda, pecho, brazos','upper']].map(g=>`<button class="fzc${fk===g[0]?' on':''}" data-act="obset" data-f="focus" data-v="${g[0]}">${bodySvg(k,g[3])}<b>${g[1]}</b><small>${g[2]}</small></button>`).join('')}</div>`;}
function dayCircles(f){const w=f.wd||[],ds=w.slice().sort((a,b)=>a-b);
  return `<div class="dgr">${DNL.map((n,i)=>`<button class="ddc${w.includes(i)?' on':''}" data-act="obwd" data-v="${i}">${n}</button>`).join('')}</div><div class="dsum">${ds.length?`<b>${ds.length} día${ds.length>1?'s':''}</b> a la semana · ${ds.map(i=>DNL[i]).join(' · ')}`:'Toca los días en que puedes entrenar.'}</div>`;}
function levelCards(f){return `<div class="lvg">${[['Principiante',1],['Intermedio',2],['Avanzado',3]].map(a=>`<button class="lvc${f.level===a[0]?' on':''}" data-act="obset" data-f="level" data-v="${a[0]}"><svg viewBox="0 0 44 36">${[1,2,3].map(i=>`<rect class="${i<=a[1]?'on':''}" x="${(i-1)*15}" y="${36-i*11}" width="11" height="${i*11}" rx="3"/>`).join('')}</svg><b>${a[0]}</b></button>`).join('')}</div>`;}
function timeCards(f){return `<div class="tmg">${[['Mañana','sun'],['Tarde','dusk'],['Noche','moon']].map(a=>`<button class="tmc${f.time===a[0]?' on':''}" data-act="obset" data-f="time" data-v="${a[0]}">${SUNI[a[1]]}<b>${a[0]}</b></button>`).join('')}</div>`;}

/* --- registro por pasos --- */
(function(){
  const rend0=renderOnboarding;
  function steps(o){
    const f=o.form||{},full=o.type==='full',L=[];
    const err=()=>'';
    L.push({t:'¿Cómo te llamas?',s:'Empecemos por lo básico.',b:()=>lab('Tu nombre')+inp('name',f.name,'Nombre')+lab('Sexo')+sexCards(f),
      ok:()=>!(f.name||'').trim()?'Escribe tu nombre.':!f.sex?'Elige tu sexo.':''});
    L.push({t:'¿Cuándo naciste?',s:'Con tu edad ajustamos mejor tu plan.',b:()=>{const v=(f.yy&&f.mm&&f.dd)?`${String(f.yy).padStart(4,'0')}-${String(f.mm).padStart(2,'0')}-${String(f.dd).padStart(2,'0')}`:'';const mx=new Date().getFullYear()-10;return `<input class="fld wzdate" type="date" data-obdate="1" min="1920-01-01" max="${mx}-12-31" value="${v}">`;},
      ok:()=>{const dd=+f.dd,mm=+f.mm,yy=+f.yy;if(!(dd&&mm&&yy))return 'Elige tu fecha de nacimiento.';const t=new Date(yy,mm-1,dd);if(t.getDate()!==dd||t.getMonth()!==mm-1||t.getFullYear()!==yy||yy<1920||yy>new Date().getFullYear()-10)return 'Revisa tu fecha de nacimiento.';return '';}});
    L.push({t:'¿Cuánto mides?',s:'Desliza la regla, usa − y +, o escríbelo. Ajusta a tu estatura real.',b:()=>rulerH('height','cm',120,230,1,170,0),
      ok:()=>!(+f.height>=100&&+f.height<=230)?'Indica tu estatura.':''});
    L.push({t:'¿Cuánto pesas hoy?',s:'Desliza la regla, usa − y +, o escríbelo. Ajusta a tu peso real.',b:()=>rulerH('weight','kg',30,200,0.1,70,1),
      ok:()=>!(+f.weight>=30&&+f.weight<=300)?'Indica tu peso.':''});
    L.push({t:'¿Cuál es tu objetivo?',s:'Puedes elegir más de uno.',b:()=>goalCards(f),ok:err});
    if(f.main==='bajar'||f.main==='aumentar'){const w0=+f.weight||70,dg=f.main==='bajar'?-5:3;L.push({t:'¿Cuánto te gustaría pesar?',s:f.main==='bajar'?'Una meta concreta te da algo que medir. La puedes ajustar después.':'Una meta concreta te da algo que medir. La puedes ajustar después.',b:()=>rulerH('goalW','kg',30,200,0.1,Math.max(30,Math.round(w0+dg)),1)+`<div class="gdiff" data-gd="1">${goalDiff(f)}</div>`,ok:()=>''});}
    L.push({t:o.plan==='basic'?'¿En qué te quieres enfocar?':'¿Dónde quieres notar más cambio?',s:o.plan==='basic'?'Siempre trabajas todo el cuerpo; esto cambia el énfasis. Lo puedes cambiar después en tu perfil.':'Siempre trabajas todo el cuerpo; tu coach lo tendrá en cuenta al armar tu programa.',b:()=>focusCards(f),ok:err});
    L.push({t:o.plan==='complete'?'Tu experiencia entrenando':'¿Cuál es tu nivel?',s:'',b:()=>levelCards(f)+`<p class="hint">${LV[f.level]||''}</p><button class="lblbtn" data-act="oblv" style="color:var(--red-strong)">${o.lvl?'Ocultar ▴':'¿No sabes cuál elegir? ▾'}</button>${o.lvl?`<div class="note">${Object.entries(LV).map(([k,v])=>`<b>${k}:</b> ${v}`).join('<br>')}</div>`:''}`,ok:err});
    L.push({t:'¿Qué días puedes entrenar?',s:'',b:()=>dayCircles(f)+(o.plan==='basic'?'<p class="hint">En Basic entrenas hasta 5 días de fuerza; los demás son descanso activo.</p>':''),ok:()=>(f.wd||[]).length<1?'Elige al menos un día para entrenar.':''});
    if(full) L.push({t:'Tu horario',s:'',b:()=>lab('Tiempo por sesión')+chipsH('session',[['45','45 min'],['60','60 min'],['90','90 min']],f.session)+lab('¿Cuándo prefieres entrenar?')+timeCards(f),ok:err});
    L.push({t:'¿Cómo nos conociste?',s:'Opcional. Nos ayuda a saber dónde encontrarte. Puedes saltar este paso.',b:()=>chipsH('src',['Instagram','YouTube','TikTok','WhatsApp','Un amigo o conocido','Juanjo Herrera (coach)','Una IA (ChatGPT, Claude…)','Otro'],f.src)+(f.src==='Otro'?inp('srcTxt',f.srcTxt,'¿Cuál?'):''),ok:()=>''});
    L.push({t:'Tu salud',s:'Tu coach lo revisa antes de asignarte ejercicios.',b:()=>lab('¿Tienes alguna molestia o lesión?')+chipsH('pain',['No','Sí'],f.pain)+(f.pain==='Sí'?inp('painTxt',f.painTxt,'¿Dónde y desde cuándo?'):'')+(f.sex==='Mujer'?lab('¿Estás embarazada?')+chipsH('preg',['No','Sí'],f.preg)+(f.preg==='Sí'?lab('¿Cuántas semanas llevas?')+inp('pregW',f.pregW,'Semanas (1 a 42)')+lab('¿Tu médico/a te autorizó a hacer ejercicio?')+chipsH('pregOk',['Sí','Aún no'],f.pregOk)+'<p class="hint">Adaptamos tu entrenamiento, el cardio y la alimentación.</p>':''):'')+(full?lab('Cirugías o condiciones médicas')+area('medical',f.medical,'Si no tienes, déjalo en blanco'):''),ok:err});
    if(full) L.push({t:'Tu día a día',s:'',b:()=>lab('Sueño promedio')+chipsH('sleep',['Menos de 6 h','6-7 h','7-8 h','Más de 8 h'],f.sleep)+lab('Estrés')+chipsH('stress',['Bajo','Medio','Alto'],f.stress)+lab('Comidas al día')+chipsH('meals',['2','3','4','5 o más'],f.meals)+lab('Restricciones o alergias alimentarias')+area('diet',f.diet,'Si no tienes, déjalo en blanco'),ok:err});
    L.push({t:'Tu foto de inicio',s:'Opcional. Es privada: solo tú y tu coach la ven. Dentro de unas semanas la comparas con tu avance. Puedes saltar este paso.',b:()=>obPhotos(),ok:()=>''});
    L.push({t:'Tu plan está casi listo',s:'Revisa que todo esté bien y crea tu plan.',b:()=>obSummary(o),ok:()=>''});
    return L;
  }
  renderOnboarding=function(){
    const o=S.ob;if(!o||o.step!=='form')return rend0.apply(this,arguments);
    const L=steps(o),n=L.length;o.fi=Math.max(0,Math.min(o.fi||0,n-1));const s=L[o.fi],last=o.fi===n-1;
    const f=o.form||{},head=`<header class="top">${logo('#C0392B')}<div class="who"><h1 style="font-size:16px">ERRE Complete</h1><small>Método Complete</small></div></header>`;
    $('#app').innerHTML=head+`<button class="lblbtn" data-act="obprev" style="color:var(--gray);margin:6px 0 0">‹ Atrás</button>
     <div class="wzp"><div class="wzb"><i style="width:${Math.round((o.fi+1)/n*100)}%"></i></div><small>Paso ${o.fi+1} de ${n}</small></div>
     ${(o.fi===Math.ceil(n/2)&&n>6)?'<div class="wzhalf">💪 Vas por la mitad</div>':last?'<div class="wzhalf">🏁 Último paso</div>':''}<h2 class="h2 wzq">${nmT(s.t,f)}</h2>${s.s?`<p class="wzs">${s.s}</p>`:''}${s.b()}
     ${o.err?`<div class="note" style="background:var(--red-tint);color:var(--red-strong);margin-top:12px">${o.err}</div>`:''}
     <div class="wzn"><button class="btn solid" data-act="${last?'obsubmit':'obnext'}">${last?'Crear mi plan':'Siguiente'}</button></div>`;
  };
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="obnext"],[data-act="obprev"]');if(!t||!S.ob||S.ob.step!=='form')return;e.stopPropagation();
    const o=S.ob,L=steps(o);
    if(t.dataset.act==='obprev'){o.err='';if((o.fi||0)>0)o.fi--;else o.step='type';}
    else{const m=L[o.fi||0].ok();if(m){o.err=m;}else{o.err='';o.fi=Math.min((o.fi||0)+1,L.length-1);}}
    save();render();window.scrollTo(0,0);},true);
})();

/* --- perfil desplegable + cambiar programa Basic --- */
(function(){
  const pv0=profileView;
  const SUB={'Datos personales':'Nombre, sexo, estatura, peso','Lo que incluye':'Tu plan y sus beneficios','Entrenamiento':'Objetivo, nivel, días y molestias','Mi programa':'Enfoque de tu rutina Basic','Mis metas':'Pasos y frecuencia cardíaca','Recordatorios':'Avisos de entrenar y pesarte','Privacidad y ayuda':'Fotos y soporte'};
  S.pfOpen=S.pfOpen||{};
  function progSec(){
    try{const u=S.user||{};if(typeof tier==='function'&&tier()!=='basic')return '';if(isC())return '';
      const cur=(u.data&&u.data.focus)||FOCD(u.sex),at=u.data&&u.data.focusAt;
      let wait='';if(at){const d=Math.floor((new Date(today())-new Date(at))/864e5);if(d<7)wait=`<div class="note">Ya cambiaste tu enfoque hace ${d} día${d===1?'':'s'}. Podrás volver a cambiarlo en ${7-d} día${7-d===1?'':'s'}.</div>`;}
      return `<section class="sec"><div class="sec-h"><b>Mi programa</b></div>
       <p class="hint" style="margin-top:10px">Siempre trabajas todo el cuerpo; el enfoque cambia el énfasis. Si cambias, <b>sigues en la misma semana</b> de tu mesociclo.</p>
       ${Object.keys(FOCN).map(k=>`<button class="pcard sm${cur===k?' on':''}" data-act="pgfocus" data-v="${k}"><b>${FOCN[k]}</b><small>${k==='balanceado'?'Fuerza completa, sin énfasis':k==='gluteo'?'Más volumen de pierna y glúteo':'Más espalda, pecho, hombros y brazos'}${cur===k?' · Tu enfoque actual':''}</small></button>`).join('')}${wait}</section>`;}catch(e){return '';}
  }
  profileView=function(){
    let h=pv0.apply(this,arguments);
    const ps=progSec();if(ps)h=h.replace('<section class="sec"><div class="sec-h"><b>Entrenamiento</b>',ps+'<section class="sec"><div class="sec-h"><b>Entrenamiento</b>');
    h=h.replace(/<button class="btn" data-act="lowtest"[^>]*>[\s\S]*?<\/button>/,'').replace(/<button class="btn" data-act="acct"[^>]*>[^<]*<\/button>/,'');
    h=h.replace('<section class="sec"><div class="sec-h"><b>Datos personales</b></div>','<section class="sec"><div class="sec-h"><b>Datos personales</b></div>').replace(/(<b>Datos personales<\/b>[\s\S]*?)(<\/section>)/,(m,x,y)=>x+'<button class="btn" data-act="acct" style="width:100%;margin-top:12px">Cambiar correo o contraseña</button>'+y);
    let inc='';h=h.replace(/<section class="sec"><div class="sec-h"><b>Lo que incluye<\/b><\/div>([\s\S]*?)<\/section>/,(m,b)=>{inc='<div style="margin-top:14px">'+b+'</div>';return '';});
    const pl=(typeof tier==='function'?tier():'basic');const PN={basic:'Basic',complete:'Complete',elite:'Elite'};
    h=h.replace(/<div class="pmn">[\s\S]*?<div class="pmb">[\s\S]*?<\/div><\/div>/,m=>`<details class="sec acc" data-pk="Mi plan"${S.pfOpen['Mi plan']?' open':''}><summary><span>Mi plan<small>${PN[pl]||''} · lo que incluye</small></span></summary><div class="accbody" style="padding-top:12px">${m}${inc}</div></details>`);
    h=h.replace(/<section class="sec fidsec"([^>]*)><div class="sec-h"><b>([^<]*)<\/b><em>([^<]*)<\/em><\/div>([\s\S]*?)<\/section>/,(m,at,t,em,b)=>`<details class="sec acc fidsec" data-pk="${t}"${at}${S.pfOpen[t]?' open':''}><summary><span>${t}<small>${em}</small></span></summary><div class="accbody">${b}</div></details>`);
    return h.replace(/<section class="sec"><div class="sec-h"><b>([^<]*)<\/b><\/div>([\s\S]*?)<\/section>/g,(m,t,b)=>`<details class="sec acc" data-pk="${t}"${S.pfOpen[t]?' open':''}><summary><span>${t}${SUB[t]?`<small>${SUB[t]}</small>`:''}</span></summary><div class="accbody">${b}</div></details>`);
  };
  document.addEventListener('toggle',e=>{const d=e.target;if(d&&d.matches&&d.matches('details.acc[data-pk]')){S.pfOpen[d.dataset.pk]=d.open;}},true);
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pgfocus"],[data-act="pgok"]');if(!t)return;e.stopPropagation();
    const u=S.user||{};u.data=u.data||{};
    if(t.dataset.act==='pgfocus'){const k=t.dataset.v,cur=u.data.focus||FOCD(u.sex);
      if(k===cur){toast('Ese ya es tu enfoque');return;}
      const at=u.data.focusAt;if(at&&Math.floor((new Date(today())-new Date(at))/864e5)<7){toast('Solo puedes cambiar el enfoque una vez por semana');return;}
      S.pgNew=k;sheet(`<h3>Cambiar a ${FOCN[k]}</h3><div class="sub">Tu rutina pasa a enfocarse en <b>${FOCN[k]}</b>. Sigues en la misma semana del mesociclo y conservas tu historial. Solo puedes cambiarlo una vez por semana.</div><button class="btn solid" data-act="pgok" style="width:100%;margin-top:10px;padding:14px">Sí, cambiar mi programa</button><button class="btn" data-act="close" style="width:100%;margin-top:8px">Cancelar</button>`);return;}
    const k=S.pgNew;if(!k)return;closeSheet();
    (async()=>{try{S.assigned=await DB.assignBasic(k,u.days||4,u.level||'Principiante',basicExpBlock());u.data.focus=k;u.data.focusAt=today();S.swaps={};save();try{await loadClientRoutine(ME&&ME.id);}catch(y){console.warn(y);}save();render();toast('Programa actualizado: '+FOCN[k]);}
      catch(x){console.warn(x);toast('No se pudo cambiar el programa');}})();
  },true);
})();

/* --- Mi cuenta (modal) desplegable --- */
(function(){const ao0=acctOpen;acctOpen=function(){ao0.apply(this,arguments);
  const b=document.querySelector('#acct .acbox');if(!b||b.querySelector('details'))return;
  const kids=[...b.children],hd=kids[0],msg=kids[1],rest=kids.slice(2);
  const isCo=PROFILE&&PROFILE.role==='coach';if(!isCo)rest.slice(0,3).forEach(n=>n.remove());const groups=[...(isCo?[['Nombre','Cómo te ves en la app',0,3]]:[]),['Correo','Tu correo de acceso',3,7],['Contraseña','Cambiar tu contraseña',7,rest.length]];
  groups.forEach(([t,s,a,z])=>{const d=document.createElement('details');d.className='acc';d.innerHTML=`<summary><span>${t}<small>${s}</small></span></summary>`;const bd=document.createElement('div');bd.className='accbody';bd.style.paddingTop='4px';rest.slice(a,z).forEach(n=>bd.appendChild(n));d.appendChild(bd);b.appendChild(d);});
};})();


/* --- medidas fáciles (barra + − +), fecha nativa --- */
function rngH(f,lbl,u,mn,mx,st,val,def){const set=val!==undefined&&val!==''&&val!==null&&!isNaN(+val),v=set?+val:def;
  return `<div class="rng${set?'':' unset'}"><div class="rngt"><span>${lbl}</span><b data-rv="${f}">${set?String(v).replace('.',',')+' '+u:'— '+u}</b></div><div class="rngr"><button class="rngb" data-act="obstep" data-f="${f}" data-d="-${st}" data-mn="${mn}" data-mx="${mx}" data-df="${def}" aria-label="Menos">−</button><input type="range" data-rng="${f}" data-u="${u}" min="${mn}" max="${mx}" step="${st}" value="${v}"><button class="rngb" data-act="obstep" data-f="${f}" data-d="${st}" data-mn="${mn}" data-mx="${mx}" data-df="${def}" aria-label="Más">+</button></div></div>`;}
(function(){const st=document.createElement('style');st.textContent=`.rng{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:14px;margin-bottom:12px}.rngt{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}.rngt span{color:var(--gray);font-size:13px}.rngt b{font-size:26px}.rng.unset .rngt b{color:var(--gray)}.rngr{display:flex;align-items:center;gap:10px}.rngr input[type=range]{flex:1;accent-color:var(--red-strong,#C0392B);height:34px}.rngb{flex:none;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--paper,#fff);font-size:22px;line-height:1;cursor:pointer}.wzdate{font-size:18px;padding:14px}
.lowwrap{position:relative}.lowmin{position:absolute;top:6px;right:8px;width:26px;height:26px;border-radius:50%;border:0;background:rgba(0,0,0,.08);color:#444;font-size:18px;line-height:1;cursor:pointer;z-index:2}`;document.head.appendChild(st);})();
document.addEventListener('input',e=>{const i=e.target;if(!i||!S.ob)return;
  if(i.dataset&&i.dataset.rng){const f=i.dataset.rng;S.ob.form[f]=i.value;const b=document.querySelector('[data-rv="'+f+'"]');if(b)b.textContent=String(+i.value).replace('.',',')+' '+i.dataset.u;const w=i.closest('.rng');if(w)w.classList.remove('unset');S.ob.err='';const en=document.querySelector('#app .wzn');if(en&&en.previousElementSibling&&/red-tint/.test(en.previousElementSibling.getAttribute('style')||''))en.previousElementSibling.remove();save();}
  else if(i.dataset&&i.dataset.obdate){const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(i.value||'');if(m){S.ob.form.yy=m[1];S.ob.form.mm=String(+m[2]);S.ob.form.dd=String(+m[3]);save();}}
},true);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="obstep"]');if(!t||!S.ob)return;e.stopPropagation();
  const f=t.dataset.f,o=S.ob.form,has=o[f]!==undefined&&o[f]!==''&&!isNaN(+o[f]);let v=has?+o[f]:+t.dataset.df;if(has)v+=+t.dataset.d;
  v=Math.max(+t.dataset.mn,Math.min(+t.dataset.mx,v));o[f]=String(v);save();render();},true);

/* --- aviso poca energía: botón – para ocultar --- */
(function(){const lc0=lowCard;lowCard=function(){
  const h=lc0.apply(this,arguments);if(!h||h.indexOf('<button class="lowc"')!==0)return h;
  if(S.lowHide===today()&&!(S.lowE||{})[S.sel]){const w=lowFem();return `<button class="lowmini" data-act="lowshow" aria-label="Mostrar aviso"><span>${w?'🌸':'⚡'} ¿Poca energía o poco tiempo hoy?</span><i>+</i></button>`;}
  return `<div class="lowwrap">${h}<button class="lowmin" data-act="lowhide" aria-label="Minimizar aviso">–</button></div>`;};
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="lowhide"],[data-act="lowshow"]');if(!t)return;e.stopPropagation();
    if(t.dataset.act==='lowhide'){S.lowHide=today();S.lowTest=false;}else{S.lowHide=null;}save();render();},true);
  const st=document.createElement('style');st.textContent='.lowmini{display:flex;align-items:center;justify-content:space-between;width:100%;gap:8px;margin:0 0 10px;padding:6px 12px;border-radius:99px;border:1px dashed var(--line);background:transparent;color:var(--gray);font-size:12px;cursor:pointer}.lowmini i{font-style:normal;font-size:16px;line-height:1}';document.head.appendChild(st);
})();


/* --- regla deslizable para estatura y peso (como el peso diario) --- */
function rulerH(f,u,lo,hi,st,def,dec){const F=S.ob.form;if(F[f]===undefined||F[f]===''||isNaN(+F[f])){F[f]=String(def);save();}
  const v=+F[f],n=Math.round((hi-lo)/st),big=dec?10:10,half=dec?5:5;let tk='';
  for(let k=0;k<=n;k++){const x=k*10,val=lo+k*st,maj=dec?k%10===0:(Math.round(val)%10===0),h=dec?k%5===0:(Math.round(val)%5===0);tk+=`<span class="rt${maj?' rm':h?' rh':''}" style="left:${x}px"></span>`+(maj?`<span class="rl" style="left:${x}px">${dec?Math.round(val):Math.round(val)}</span>`:'');}
  const fmt=x=>dec?x.toFixed(1).replace('.',','):String(Math.round(x));
  return `<div class="rng rulerbox"><div class="wbig"><b data-rv="${f}">${fmt(v)}</b><small>${u}</small></div>
   <div class="ruler"><div class="rsc" data-rf="${f}" data-lo="${lo}" data-hi="${hi}" data-st="${st}" data-dec="${dec}"><div class="rin" style="width:calc(100% + ${n*10}px)"><div class="rtk" style="position:absolute;left:0;top:0;bottom:0">${tk}</div></div></div><div class="rfade l"></div><div class="rfade r"></div><div class="rneedle"></div></div>
   <div class="wfine"><button data-act="rlstep" data-f="${f}" data-d="${-st}">−${dec?'0,1':'1'}</button><button data-act="rlstep" data-f="${f}" data-d="${st}">+${dec?'0,1':'1'}</button></div>
   <div class="wr" style="margin-top:8px"><input class="fld" id="rltype" data-rltype="${f}" inputmode="decimal" placeholder="O escríbelo: ${fmt(def)}"></div></div>`;}
function rlSet(f,v,scroll){const sc=document.querySelector('.rsc[data-rf="'+f+'"]');if(!sc)return;const lo=+sc.dataset.lo,hi=+sc.dataset.hi,st=+sc.dataset.st,dec=+sc.dataset.dec;
  v=Math.max(lo,Math.min(hi,Math.round(v/st)*st));v=Math.round(v*10)/10;S.ob.form[f]=String(v);
  const b=document.querySelector('[data-rv="'+f+'"]');if(b)b.textContent=dec?v.toFixed(1).replace('.',','):String(Math.round(v));
  if(scroll){sc._busy=true;sc.scrollLeft=(v-lo)/st*10;setTimeout(()=>{sc._busy=false;},120);}
  S.ob.err='';const en=document.querySelector('#app .wzn');if(en&&en.previousElementSibling&&/red-tint/.test(en.previousElementSibling.getAttribute('style')||''))en.previousElementSibling.remove();
  clearTimeout(rlSet.t);rlSet.t=setTimeout(save,300);}
function rlInit(){document.querySelectorAll('.rsc[data-rf]').forEach(sc=>{const f=sc.dataset.rf,lo=+sc.dataset.lo,st=+sc.dataset.st;
  const tk=sc.querySelector('.rtk');const go=()=>{tk.style.left=(sc.clientWidth/2)+'px';sc._busy=true;sc.scrollLeft=(+S.ob.form[f]-lo)/st*10;setTimeout(()=>{sc._busy=false;},150);};
  requestAnimationFrame(()=>{go();setTimeout(go,60);});
  sc.addEventListener('scroll',()=>{if(sc._busy)return;rlSet(f,lo+(sc.scrollLeft/10)*st,false);},{passive:true});});}
(function(){const r0=renderOnboarding;renderOnboarding=function(){const r=r0.apply(this,arguments);try{if(S.ob&&S.ob.step==='form')rlInit();}catch(e){console.warn(e);}return r;};})();
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="rlstep"]');if(!t||!S.ob)return;e.stopPropagation();rlSet(t.dataset.f,(+S.ob.form[t.dataset.f]||0)+(+t.dataset.d),true);},true);
document.addEventListener('input',e=>{const i=e.target;if(!i||!i.dataset||!i.dataset.rltype||!S.ob)return;const v=parseFloat(String(i.value).replace(',','.'));if(isNaN(v))return;const f=i.dataset.rltype,sc=document.querySelector('.rsc[data-rf="'+f+'"]');if(!sc)return;if(v>=+sc.dataset.lo&&v<=+sc.dataset.hi)rlSet(f,v,true);},true);


/* ---------- MI SUSCRIPCIÓN (estado, fechas, cancelar en Whop desde la app) ---------- */
const SUB={t:0};
const subD=iso=>iso?new Date(iso).toLocaleDateString('es-CO',{timeZone:'America/Bogota',day:'numeric',month:'long',year:'numeric'}):'';
const subLeft=iso=>{const d=Math.ceil((new Date(iso)-new Date())/864e5);return d<=0?'hoy':d===1?'mañana':'en '+d+' días';};
function subHTML(){
  try{const r=ACC.row,tr=(typeof tier==='function'?tier():'basic'),PN={basic:'Basic',complete:'Complete',elite:'Elite'};
    const row=(a,b)=>`<div class="pfrow"><span><b>${a}</b><small>${b}</small></span></div>`;
    const badge=(t,c)=>`<div style="margin:12px 0 4px"><span class="tag" style="background:${c};color:#fff;padding:5px 10px;border-radius:99px;font-size:12px;font-weight:700">${t}</span></div>`;
    let body='',sub='';
    const st=ACC.state;
    if(!r){body=row('Sin información de pago','Si tienes dudas sobre tu plan, escríbenos.')+`<button class="btn" data-act="support" style="width:100%;margin-top:10px">Escribir a soporte</button>`;sub=PN[tr]||'';}
    else if(r.source==='whop'){
      const u=r.paid_until,can=!!r.cancel_at_period_end,tri=r.whop_status==='trialing';
      if(st==='expired'||(u&&new Date(u)<new Date()&&!can)){sub='Vencida';body=badge('Vencida','#B3261E')+row('Tu acceso terminó el',subD(u))+(RENEW_URL?`<a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:12px;text-decoration:none" href="${RENEW_URL}" target="_blank" rel="noopener">Renovar mi plan</a>`:'');}
      else if(can){sub='Cancelada · acceso hasta '+subD(u);body=badge('Cancelada','#6B6B6B')+row('No se volverá a cobrar','Tu suscripción no se renovará.')+row('Tienes acceso hasta',subD(u)+' ('+subLeft(u)+')')+(r.whop_status==='canceled'?(RENEW_URL?`<a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:12px;text-decoration:none" href="${RENEW_URL}" target="_blank" rel="noopener">Volver a suscribirme</a>`:''):`<button class="btn" data-act="subresume" style="width:100%;margin-top:12px">Reactivar mi suscripción</button>`);}
      else if(tri){sub='Prueba gratis hasta '+subD(u);body=badge('Prueba gratis','#2E7D5B')+row('Tu prueba termina el',subD(u)+' ('+subLeft(u)+')')+row('Primer cobro','29 USD el '+subD(u)+'. Después se renueva cada mes.')+row('¿No quieres continuar?','Cancela antes de esa fecha y no se te cobra nada.')+`<a class="btn" style="display:block;text-align:center;padding:12px;margin-top:12px;text-decoration:none" href="https://whop.com/@me/settings/memberships" target="_blank" rel="noopener">Cambiar tarjeta o medio de pago</a><div class="hint" style="margin-top:6px">Se abre Whop, donde se guarda tu pago de forma segura. Entra con el mismo correo de esta app.</div><button class="btn" data-act="subcancel" style="width:100%;margin-top:12px">Cancelar suscripción</button>`;}
      else{sub='Activa · próximo cobro '+subD(u);body=badge('Suscripción activa','#2E7D5B')+row('Próximo cobro','29 USD el '+subD(u)+' ('+subLeft(u)+')')+row('Se renueva','Cada mes, de forma automática.')+`<a class="btn" style="display:block;text-align:center;padding:12px;margin-top:12px;text-decoration:none" href="https://whop.com/@me/settings/memberships" target="_blank" rel="noopener">Cambiar tarjeta o medio de pago</a><div class="hint" style="margin-top:6px">Se abre Whop, donde se guarda tu pago de forma segura. Entra con el mismo correo de esta app.</div><button class="btn" data-act="subcancel" style="width:100%;margin-top:12px">Cancelar suscripción</button>`;}
    }else{
      const u=r.paid_until;sub=u?'Acceso hasta '+subD(u):'Activo';
      body=badge(u?'Activo':'Activo, sin vencimiento','#2E7D5B')+(u?row('Tu acceso está activo hasta',subD(u)+' ('+subLeft(u)+')'):row('Tu plan está activo','No tiene fecha de vencimiento.'))+row('Pagos y cambios','Los coordinas directamente con tu coach.')+`<button class="btn" data-act="support" style="width:100%;margin-top:10px">Escribir a mi coach</button>`;
    }
    return `<details class="sec acc" data-pk="Mi suscripción"${S.pfOpen['Mi suscripción']?' open':''}><summary><span>Mi suscripción<small>${sub}</small></span></summary><div class="accbody">${body}</div></details>`;
  }catch(e){console.warn('subHTML',e);return '';}
}
(function(){const pv1=profileView;profileView=function(){let h=pv1.apply(this,arguments);
  if(S.role==='coach'||!ME)return h;
  if(Date.now()-SUB.t>60000){SUB.t=Date.now();accessFetch().then(r=>{if(r){ACC.row=r;ACC.state=accState(r);}try{if(S.profile)render();}catch(e){}});}
  return h.replace(/(<details class="sec acc" data-pk="Mi plan"[\s\S]*?<\/details>)/,m=>m+subHTML());};
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="subcancel"],[data-act="subresume"],[data-act="subok"],[data-act="subrok"]');if(!t)return;e.stopPropagation();const a=t.dataset.act,r=ACC.row||{};
    if(a==='subcancel'){sheet(`<h3>¿Cancelar tu suscripción?</h3><div class="sub">${r.whop_status==='trialing'?'Estás en tu prueba gratis: si cancelas ahora <b>no se te cobra nada</b>. ':''}Mantienes tu acceso hasta el <b>${subD(r.paid_until)}</b> y después no se vuelve a cobrar. Puedes reactivarla antes de esa fecha.</div>${CXL_FORM}<button class="btn solid" data-act="subok" style="width:100%;margin-top:10px;padding:14px;background:#B3261E">Sí, cancelar suscripción</button><button class="btn" data-act="close" style="width:100%;margin-top:8px">Mejor no</button>`);return;}
    if(a==='subresume'){sheet(`<h3>¿Reactivar tu suscripción?</h3><div class="sub">Se retoma el cobro de 29 USD el <b>${subD(r.paid_until)}</b> y sigue cada mes.</div><button class="btn solid" data-act="subrok" style="width:100%;margin-top:10px;padding:14px">Sí, reactivar</button><button class="btn" data-act="close" style="width:100%;margin-top:8px">Cancelar</button>`);return;}
    const act=a==='subok'?'cancel':'resume';const cxf=act==='cancel'?cxlRead():null;closeSheet();toast(act==='cancel'?'Cancelando…':'Reactivando…');
    (async()=>{try{const x=await DB.cancelSub(act);
      if(x&&x.ok){if(cxf&&(cxf.r||cxf.c)){DB.feedback('cancel',cxf.r,cxf.c).catch(()=>{});}ACC.row=Object.assign({},ACC.row,{cancel_at_period_end:act==='cancel'});S.pfOpen['Mi suscripción']=true;render();toast(act==='cancel'?'Suscripción cancelada. Acceso hasta el '+subD(ACC.row.paid_until):'Suscripción reactivada ✓');}
      else{sheet(`<h3>No pudimos hacerlo desde aquí</h3><div class="sub">${act==='cancel'?'No se canceló nada y tu suscripción sigue igual. ':''}Escríbenos y lo resolvemos por ti de inmediato.</div><button class="btn solid" data-act="support" style="width:100%;margin-top:10px;padding:14px">Escribir a soporte</button><button class="btn" data-act="close" style="width:100%;margin-top:8px">Cerrar</button>`);}
    }catch(x){console.warn(x);sheet(`<h3>Sin conexión</h3><div class="sub">No pudimos comunicarnos. Revisa tu internet e inténtalo de nuevo.</div><button class="btn" data-act="close" style="width:100%;margin-top:10px">Cerrar</button>`);}})();
  },true);
})();

/* soporte: abre WhatsApp con el coach */
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="support"]');if(!t||!ME)return;e.stopPropagation();
  const msg='Hola Juanjo, necesito ayuda con mi cuenta ('+(ME.email||'')+').';try{closeSheet();}catch(x){}window.open('https://wa.me/'+COACH_WA+'?text='+encodeURIComponent(msg),'_blank','noopener');},true);


/* ---------- PANEL DEL COACH: SUSCRIPCIONES ---------- */
function pagoInfo(r){const st=accState(r),now=Date.now(),u=r.paid_until?new Date(r.paid_until).getTime():null,d=u?Math.ceil((u-now)/864e5):null;
  if(r.payment_failed_at&&r.whop_status==='past_due')return {k:0,t:'Cobro fallido',c:'#E5484D',n:'Falló el '+accFmt(r.payment_failed_at)+' · Whop reintenta unos 5 días'};
  if(st==='expired')return {k:0,t:'Vencido',c:'#E5484D',n:'Venció el '+accFmt(r.paid_until)};
  if(st==='grace')return {k:1,t:'En gracia',c:'#E8A317',n:'Venció el '+accFmt(r.paid_until)+' · '+Math.max(0,GRACE_D+d)+' d de gracia'};
  if(r.cancel_at_period_end)return {k:2,t:'Cancelada',c:'#6B6B6B',n:'Acceso hasta el '+accFmt(r.paid_until)+(d!=null?' ('+d+' d)':'')};
  if(u!==null&&d<=7)return {k:3,t:r.whop_status==='trialing'?'Prueba por terminar':'Por vencer',c:'#E8A317',n:(r.whop_status==='trialing'?'Primer cobro ':'Vence ')+accFmt(r.paid_until)+' ('+d+' d)'};
  if(r.whop_status==='trialing')return {k:4,t:'En prueba',c:'#3B82C4',n:'Termina el '+accFmt(r.paid_until)+' ('+d+' d)'};
  if(u===null)return {k:6,t:'Sin vencimiento',c:'#2E9E5B',n:r.source==='whop'?'':'Manual'};
  return {k:5,t:'Activa',c:'#2E9E5B',n:'Próximo cobro '+accFmt(r.paid_until)+' ('+d+' d)'};}
function cpPagosPage(){
  if(!CP.pagos){DB.accessAll().then(r=>{CP.pagos=r;try{if(CP.view==='list'&&CP.sec==='pagos')coachRender(true);}catch(e){}});
    return '<div class="cphead"><h2 class="h2" style="margin:0">Suscripciones</h2></div><div class="note">Cargando…</div>';}
  const nm={};(CP.clients||[]).forEach(c=>nm[c.id]=c);
  const L=CP.pagos.map(r=>({r,c:nm[r.client_id],i:pagoInfo(r)})).sort((a,b)=>a.i.k-b.i.k||(new Date(a.r.paid_until||'2999-01-01')-new Date(b.r.paid_until||'2999-01-01')));
  const cnt=f=>L.filter(f).length,box=(n,l,col)=>`<div style="flex:1;min-width:84px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 12px"><b style="font-size:22px;color:${col}">${n}</b><small style="display:block;color:var(--gray)">${l}</small></div>`;
  const rows=L.map(({r,c,i})=>{const nmx=c?esc(c.full_name||'Sin nombre'):esc(r.email);
    return `<${c?'button':'div'} class="cptr" ${c?`data-act="cpopen" data-id="${c.id}"`:''} style="display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:12px 4px;border-bottom:1px solid var(--line)"><span style="flex:1;min-width:0"><b>${nmx}</b><small style="display:block;color:var(--gray)">${esc(r.tier||'')}${r.period&&r.period!=='manual'?' · '+esc(r.period):''} · ${r.source==='whop'?'Whop':'Manual'}${c?'':' · sin cuenta aún'}</small></span><span style="text-align:right"><em style="font-style:normal;font-weight:700;font-size:12px;color:#fff;background:${i.c};padding:3px 9px;border-radius:99px">${i.t}</em><small style="display:block;color:var(--gray);margin-top:3px">${i.n}</small></span></${c?'button':'div'}>`;}).join('');
  return `<div class="cphead"><h2 class="h2" style="margin:0">Suscripciones</h2><em class="cpcount">${L.length}</em></div>
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin:10px 0">${box(cnt(x=>x.i.k===5||x.i.k===6),'Activas','#2E9E5B')}${box(cnt(x=>x.i.k===4||(x.i.k===3&&x.r.whop_status==='trialing')),'En prueba','#3B82C4')}${box(cnt(x=>x.i.k===3),'Por vencer (7 d)','#E8A317')}${box(cnt(x=>x.i.k<=1),'Vencidas / gracia','#E5484D')}${box(cnt(x=>x.i.k===2),'Canceladas','#6B6B6B')}</div>
   <div class="note" style="margin-bottom:8px">Primero los casos que piden atención: vencidos, en gracia, cancelados y por vencer. Toca un cliente para abrir su ficha y ajustar su acceso.</div>
   ${L.length?rows:'<div class="note">Aún no hay registros de acceso.</div>'}
   <button class="btn" data-act="pagosref" style="width:100%;margin-top:12px">Actualizar</button>`;}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="cpnav"],[data-act="pagosref"]');if(!t||!PROFILE||PROFILE.role!=='coach')return;
  if(t.dataset.act==='pagosref'){e.stopPropagation();CP.pagos=null;coachRender(true);}
  else if(t.dataset.v==='pagos'){CP.pagos=null;}},true);


/* --- feedback opcional: motivo al cancelar, origen en registro, vista coach --- */
var CXL_REASONS=['Falta de tiempo','Es muy costoso','No veo resultados','Prefiero otro método o app','Ya logré mi objetivo','Problemas con la app','Otro'];
var CXL_FORM='<div style="margin-top:14px;text-align:left"><b style="font-size:14px">¿Nos cuentas por qué? <span style="color:var(--gray);font-weight:400">(opcional)</span></b><div class="chips" style="margin-top:8px">'+CXL_REASONS.map(x=>'<button type="button" class="chip" data-act="cxr" data-v="'+x+'">'+x+'</button>').join('')+'</div><textarea id="cxc" class="fld" rows="2" maxlength="500" placeholder="Algo que quieras decirnos para mejorar (opcional)" style="width:100%;margin-top:8px"></textarea></div>';
function cxlRead(){const on=document.querySelector('[data-act="cxr"].on'),c=document.getElementById('cxc');return {r:on?on.dataset.v:'',c:c?c.value:''};}
(function(){
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="cxr"]');if(!t)return;e.stopPropagation();const was=t.classList.contains('on');document.querySelectorAll('[data-act="cxr"]').forEach(b=>b.classList.remove('on'));if(!was)t.classList.add('on');},true);
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="obsubmit"]');if(!t||!S.ob)return;const f=S.ob.form||{};if(!f.src||localStorage.getItem('erre_src_sent'))return;
    try{localStorage.setItem('erre_src_sent','1');}catch(x){}
    DB.feedback('source',f.src,f.src==='Otro'?f.srcTxt:'').catch(()=>{try{localStorage.removeItem('erre_src_sent');}catch(x){}});},true);
})();
function cpFeedbackBlock(){
  if(!CP.fbk){DB.feedbackAll().then(r=>{CP.fbk=r;try{if(CP.view==='list'&&CP.sec==='pagos')coachRender(true);}catch(e){}});return '<div class="note" style="margin-top:16px">Cargando feedback…</div>';}
  const nm={};(CP.clients||[]).forEach(c=>nm[c.id]=c);
  const grp=k=>{const m={};CP.fbk.filter(x=>x.kind===k).forEach(x=>{m[x.reason||'—']=(m[x.reason||'—']||0)+1;});return Object.entries(m).sort((a,b)=>b[1]-a[1]);};
  const bars=(arr)=>arr.length?arr.map(([k,n])=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--line)"><span>${esc(k)}</span><b>${n}</b></div>`).join(''):'<div class="hint">Aún sin respuestas.</div>';
  const cm=CP.fbk.filter(x=>x.comment).slice(0,15).map(x=>{const c=nm[x.client_id];return `<div style="padding:8px 0;border-bottom:1px solid var(--line)"><small style="color:var(--gray)">${c?esc(c.full_name||'Cliente'):'Cliente'} · ${x.kind==='cancel'?'Al cancelar':x.kind==='source'?'Cómo nos conoció':'Reseña'}${x.reason?' · '+esc(x.reason):''} · ${new Date(x.created_at).toLocaleDateString('es')}</small><div>${esc(x.comment)}</div></div>`;}).join('');
  return `<h3 class="h2" style="margin:22px 0 4px;font-size:17px">Feedback de clientes</h3><div class="note" style="margin-bottom:8px">Respuestas opcionales: por qué cancelan y cómo te conocieron.</div>
   <b>Motivos de cancelación</b>${bars(grp('cancel'))}<b style="display:block;margin-top:14px">Cómo nos conocieron</b>${bars(grp('source'))}${cm?'<b style="display:block;margin-top:14px">Comentarios</b>'+cm:''}`;
}
(function(){const p0=cpPagosPage;cpPagosPage=function(){const h=p0.apply(this,arguments);return CP.pagos?h+cpFeedbackBlock():h;};
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pagosref"]');if(t)CP.fbk=null;},true);})();


/* --- chequeo quincenal (cada 2 sábados) --- */
var CHK={done:null,loading:false,s:null};
var CHK_L={cumple:{todos:'Todos',casi:'Casi todos',pocos:'Pocos',ninguno:'Casi ninguno'},molestia:{no:'Sin molestias',leve:'Molestia leve',si:'Molestia que preocupa'},carga:{liviana:'Carga muy liviana',ok:'Carga adecuada',pesada:'Carga muy pesada'}};
(function(){const st=document.createElement('style');st.textContent=`
#chkov{position:fixed;inset:0;z-index:9000;background:#EFEDE8;overflow-y:auto;padding:14px 18px 28px;max-width:520px;margin:0 auto}
#chkov .chkx{background:none;border:0;color:#5A554E;font:600 14px Archivo,sans-serif;padding:6px 0}
#chkov .chko{display:flex;flex-direction:column;align-items:flex-start;width:100%;text-align:left;background:#FBFAF8;border:2px solid #DCD6CC;border-left:8px solid var(--c);border-radius:14px;padding:14px 16px;margin-bottom:10px;transition:transform .12s,background .12s}
#chkov .chko b{font-size:16px;color:#1C1B19}#chkov .chko small{color:#5A554E;margin-top:2px}
#chkov .chko.on{background:var(--c);border-color:var(--c);transform:scale(1.02)}#chkov .chko.on b,#chkov .chko.on small{color:#fff}
#chkov .chkn{display:flex;gap:6px;margin:6px 0 4px}
#chkov .chkn button{flex:1;aspect-ratio:1/1.15;border:2px solid var(--c);background:#FBFAF8;border-radius:10px;font:700 16px Archivo,sans-serif;color:var(--c);transition:transform .12s}
#chkov .chkn button.on{background:var(--c);color:#fff;transform:scale(1.12)}
#chkov .chkl{display:flex;justify-content:space-between;color:#5A554E;font-size:12px;margin-bottom:12px}
#chkov .chkr{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:14px;padding:12px 14px;margin-bottom:12px}
#chkov .chkr b{display:block;margin-bottom:4px}
#chkov textarea{width:100%;border:1px solid #DCD6CC;border-radius:12px;padding:12px;background:#FBFAF8;font:400 15px Archivo,sans-serif;min-height:96px;box-sizing:border-box}
#chkov .chkok{width:100%;margin-top:14px;padding:15px;border:0;border-radius:14px;background:#C0392B;color:#fff;font:700 16px Archivo,sans-serif}
#chkov .chkok[disabled]{opacity:.45}
#chkov .chkt{background:#FBFAF8;border:1px solid #DCD6CC;border-left:6px solid #C0392B;border-radius:12px;padding:12px 14px;margin:8px 0}
.chkcard{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:#1C1B19;color:#fff;border:0;border-left:8px solid #C0392B;border-radius:14px;padding:14px 16px;margin-bottom:12px}
.chkcard span{flex:1}.chkcard small{display:block;color:#E9A59B;font-weight:700;letter-spacing:.04em;text-transform:uppercase;font-size:11px}.chkcard b{display:block;font-size:16px;margin:2px 0}.chkcard em{font-style:normal;color:#CFCAC2;font-size:13px}.chkcard i{font-style:normal;font-size:24px;color:#C0392B}
.cpfk.chk{background:#F5E4E0;color:#96271B}.cpp.form{background:#F5E4E0;color:#96271B;border-color:#E9B8AF}`;document.head.appendChild(st);})();
function chkLoad(){if(CHK.loading)return;CHK.loading=true;
  Promise.all([DB.checkinsMine().catch(()=>[]),DB.chkAskMine().catch(()=>null)]).then(([r,a])=>{CHK.done=new Set(r.map(x=>x.period));CHK.ask=a||null;CHK.t=Date.now();}).catch(()=>{if(!CHK.done)CHK.done=new Set();}).then(()=>{CHK.loading=false;try{if(!CHK.s&&!document.getElementById('chkov'))render();}catch(e){}});}
function chkDue(){try{
  if(!ME||!S.user||(PROFILE&&PROFILE.role==='coach')||ACC.state==='expired')return null;
  if(CHK.done===null){chkLoad();return null;}
  if(Date.now()-(CHK.t||0)>45000)chkLoad();
  const tdy0=today(),tk=cxList().filter(t=>t.type==='form'&&t.form!=='medidas'&&t.date<=tdy0&&t.date>=addD(tdy0,-6)&&!CHK.done.has('f-'+t.id)).sort((a,b)=>a.date<b.date?1:-1)[0];
  if(tk)return {sat:'f-'+tk.id,raw:0,nps:false,manual:true};
  if(!S.start)return null;
  const t=today(),sat=addD(t,-((wdOf(t)-5+7)%7));if(diffD(t,sat)>4)return null;
  const raw=Math.floor(diffD(monOf(sat),S.start)/7)+1;if(raw<2||raw%2)return null;
  if(CHK.done.has(sat))return null;
  return {sat,raw,nps:raw===4};}catch(e){return null;}}
function chkColN(i,n){const h=Math.round(5+(i-1)/(n-1)*135);return 'hsl('+h+',62%,40%)';}
function chkSteps(s){const a=s.a,L=[];
  const opt=(k,v,t,sub,c)=>`<button class="chko${a[k]===v?' on':''}" data-chk="pick" data-k="${k}" data-v="${v}" style="--c:${c}"><b>${t}</b>${sub?`<small>${sub}</small>`:''}</button>`;
  const num=(k,lo,hi,inv)=>{const n=hi-lo+1;return `<div class="chkn">${Array.from({length:n},(_,i)=>{const v=lo+i,c=chkColN(inv?n-i:i+1,n);return `<button class="${a[k]===v?'on':''}" data-chk="pick" data-k="${k}" data-v="${v}" data-n="1" style="--c:${c}">${v}</button>`;}).join('')}</div>`;};
  L.push({t:'¿Cumpliste tus entrenamientos?',s:'En estos últimos 15 días.',auto:1,k:['cumple'],b:()=>opt('cumple','todos','Todos','No me salté ninguno','#1F8F53')+opt('cumple','casi','Casi todos','Me faltó uno o dos','#5E9B3A')+opt('cumple','pocos','Pocos','Entrené menos de la mitad','#B87400')+opt('cumple','ninguno','Casi ninguno','Fueron dos semanas difíciles','#C0392B')});
  L.push({t:'¿Dolor o molestia?',s:'En algún ejercicio o día.',k:['molestia'],b:()=>opt('molestia','no','No, todo bien','','#1F8F53')+opt('molestia','leve','Leve y pasajera','Aparece, pero se va','#B87400')+opt('molestia','si','Sí, me preocupa','Tu coach necesita saberlo','#C0392B')+(a.molestia&&a.molestia!=='no'?`<textarea data-chk="txt" data-k="molTxt" placeholder="¿Dónde y en qué ejercicio?">${esc(a.molTxt||'')}</textarea>`:''),auto2:1});
  L.push({t:'¿Cómo sentiste la carga?',s:'El peso y las series en general.',auto:1,k:['carga'],b:()=>opt('carga','liviana','Muy liviana','Podía con más','#3B82C4')+opt('carga','ok','Adecuada','Exigente pero manejable','#1F8F53')+opt('carga','pesada','Muy pesada','Terminaba agotado/a','#C0392B')});
  L.push({t:'¿Cómo va tu alimentación?',s:'Del 1 al 10: qué tan bien la seguiste.',auto:1,k:['alim'],b:()=>num('alim',1,10)+'<div class="chkl"><span>1 · No la seguí</span><span>10 · Perfecta</span></div>'});
  L.push({t:'Energía, sueño y estrés',s:'Cómo te has sentido en general.',auto:1,k:['energia','sueno','estres'],b:()=>[['energia','Energía','Baja','Alta',0],['sueno','Sueño','Malo','Muy bueno',0],['estres','Estrés','Bajo','Alto',1]].map(r=>`<div class="chkr"><b>${r[1]}</b>${num(r[0],1,5,r[4])}<div class="chkl" style="margin:0"><span>1 · ${r[2]}</span><span>5 · ${r[3]}</span></div></div>`).join('')});
  L.push({t:'¿Cómo ves tu progreso?',s:'Qué tan satisfecho/a estás con tus resultados.',auto:1,k:['satisf'],b:()=>num('satisf',1,5)+'<div class="chkl"><span>1 · Nada</span><span>5 · Muy satisfecho/a</span></div>'});
  if(s.nps)L.push({t:'¿Nos recomendarías?',s:'Opcional. Del 0 al 10, ¿qué tan probable es que recomiendes ERRE a un amigo?',opt:1,auto:1,k:['nps'],b:()=>num('nps',0,10)+'<div class="chkl"><span>0 · Nada probable</span><span>10 · Seguro</span></div>'});
  L.push({t:'¿Algo que quieras contarme?',s:'Opcional. Una duda, un logro, algo que cambiarías.',opt:1,k:[],b:()=>`<textarea data-chk="txt" data-k="comment" placeholder="Escribe aquí (opcional)">${esc(a.comment||'')}</textarea>`});
  return L;}
function chkOk(st,a){return st.opt||st.k.every(k=>a[k]!=null&&a[k]!=='');}
function chkTips(a,cx){const t=[];
  if(a.molestia==='si')t.push(cx?'Anotamos tu molestia. Tu coach la revisa y ajusta tu rutina; mientras, evita el ejercicio que te duele.':'Anotamos tu molestia. Evita el ejercicio que te duele y, si sigue, consúltalo con un profesional de salud.');
  if(a.carga==='pesada')t.push(cx?'Tu coach ajustará la carga.':'Esta semana baja una serie por ejercicio y cuida la técnica.');
  else if(a.carga==='liviana')t.push(cx?'Tu coach subirá la carga.':'Sube un poco el peso en los ejercicios básicos, con buena técnica.');
  if(a.alim<=4)t.push('Esta semana elige un solo hábito de alimentación (proteína en cada comida, o agua) y cúmplelo.');
  if(a.sueno<=2||a.estres>=4)t.push('Tu recuperación va justa: prioriza dormir y hazte un espacio de respiración al día.');
  if(!t.length)t.push('Vas muy bien. Sigue con constancia.');
  return t.slice(0,3);}
function chkRender(){const s=CHK.s;let ov=document.getElementById('chkov');
  if(!s){if(ov)ov.remove();document.body.style.overflow='';return;}
  if(!ov){ov=document.createElement('div');ov.id='chkov';document.body.appendChild(ov);document.body.style.overflow='hidden';}
  const cx=(typeof isC==='function')&&isC();
  if(s.fin){ov.innerHTML=`<h2 class="h2" style="margin-top:40px">¡Listo, gracias!</h2><p class="wzs">${cx?'Tu coach lo revisa y te escribe con el ajuste.':'Guardamos tu chequeo. Esto es lo que te recomendamos:'}</p>${chkTips(s.a,cx).map(x=>`<div class="chkt">${esc(x)}</div>`).join('')}<button class="chkok" data-chk="close">Volver al inicio</button>`;return;}
  const L=chkSteps(s),n=L.length;s.fi=Math.max(0,Math.min(s.fi,n-1));const st=L[s.fi],last=s.fi===n-1,okk=chkOk(st,s.a);
  ov.innerHTML=`<div style="display:flex;justify-content:space-between"><button class="chkx" data-chk="prev">${s.fi?'‹ Atrás':'‹ Ahora no'}</button><small style="align-self:center;color:#5A554E">Chequeo quincenal</small></div>
   <div class="wzp"><div class="wzb"><i style="width:${Math.round((s.fi+1)/n*100)}%"></i></div><small>Pregunta ${s.fi+1} de ${n}</small></div>
   <h2 class="h2 wzq">${st.t}</h2><p class="wzs">${st.s||''}</p>${st.b()}
   <button class="chkok" data-chk="${last?'send':'next'}" ${okk?'':'disabled'}>${last?(s.busy?'Enviando…':(cx?'Enviar a mi coach':'Guardar mi chequeo')):(st.opt&&!okk?'Omitir':'Siguiente')}</button>`;
  const b=ov.querySelector('.chkok');if(b&&st.opt&&!okk&&!last){b.disabled=false;}}
async function chkSend(){const s=CHK.s;if(!s||s.busy)return;s.busy=true;chkRender();
  const a=s.a,data={cumple:a.cumple,molestia:a.molestia,molTxt:(a.molTxt||'').trim()||undefined,carga:a.carga,alim:a.alim,energia:a.energia,sueno:a.sueno,estres:a.estres,satisf:a.satisf,nps:a.nps,meta:{raw:s.raw,plan:(S.user&&S.user.plan)||'',wk:S.week}};
  try{await DB.checkinSave(s.sat,data,a.comment);CHK.done=CHK.done||new Set();CHK.done.add(s.sat);
    try{const flag=a.molestia==='si'?'⚠ ':'';if(PROFILE&&PROFILE.coach_id)pushTo(PROFILE.coach_id,flag+((PROFILE.full_name||'Un cliente')+' envió su chequeo'),[CHK_L.cumple[a.cumple],CHK_L.carga[a.carga],a.alim+'/10 alim.'].join(' · '),'chk-'+ME.id);}catch(e){}
    s.fin=true;s.busy=false;chkRender();}
  catch(e){console.warn(e);s.busy=false;chkRender();toast('No se pudo enviar. Revisa tu internet e inténtalo de nuevo.');}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-chk]');if(!t)return;e.stopPropagation();const act=t.dataset.chk,s=CHK.s;
  if(act==='open'){const d=chkDue();if(!d)return;CHK.s={sat:d.sat,raw:d.raw,nps:d.nps,fi:0,a:{}};chkRender();return;}
  if(!s)return;
  if(act==='close'){CHK.s=null;chkRender();try{render();}catch(x){}return;}
  if(act==='prev'){if(s.fi>0){s.fi--;chkRender();}else{CHK.s=null;chkRender();}return;}
  if(act==='next'){s.fi++;chkRender();document.getElementById('chkov').scrollTop=0;return;}
  if(act==='send'){chkSend();return;}
  if(act==='pick'){const k=t.dataset.k;s.a[k]=t.dataset.n?+t.dataset.v:t.dataset.v;const st=chkSteps(s)[s.fi];
    if(k==='molestia'&&s.a.molestia==='no')delete s.a.molTxt;
    chkRender();const fl=st.k.length&&st.k.every(q=>s.a[q]!=null&&s.a[q]!=='');if(false&&(st.auto||(st.auto2&&s.a[k]==='no'))&&fl){const last=s.fi===chkSteps(s).length-1;if(!last)setTimeout(()=>{if(CHK.s===s){s.fi++;chkRender();const o=document.getElementById('chkov');if(o)o.scrollTop=0;}},st.k.length>1?420:260);}return;}
},true);
document.addEventListener('input',e=>{const t=e.target;if(!t||t.dataset.chk!=='txt'||!CHK.s)return;CHK.s.a[t.dataset.k]=t.value;});
(function(){const hv=homeView;homeView=function(){const h=hv.apply(this,arguments);
  try{if(S.sel!==today())return h;const d=chkDue();if(!d)return h;const cx=(typeof isC==='function')&&isC();
    const card=`<h2 class="h2">Importante</h2><button class="chkcard" data-chk="open"><span><small>Chequeo quincenal</small><b>${cx?'Cuéntale a tu coach cómo vas':'Cuéntanos cómo vas'}</b><em>${d.nps?'8':'7'} preguntas · 1 minuto · solo toques${cx?' · tu coach lo revisa':' · con recomendación al instante'}</em></span><i>›</i></button>`;
    const m='<h2 class="h2">Tareas de';const i=h.indexOf(m);return i<0?card+h:h.slice(0,i)+card+h.slice(i);}catch(e){return h;}};})();
/* coach */
function cpChkLoad(){if(CP._chkL)return;CP._chkL=1;DB.checkinsAll().then(r=>{CP.chk=r;CP._chkL=0;try{coachRender(true);}catch(e){}}).catch(()=>{CP.chk=[];CP._chkL=0;});}
function chkFlags(d){d=d||{};const f=[];if(d.molestia==='si')f.push('molestia');else if(d.molestia==='leve')f.push('molestia leve');if(d.carga==='pesada')f.push('carga muy pesada');if(d.cumple==='ninguno'||d.cumple==='pocos')f.push('entrenó poco');if(d.satisf!=null&&d.satisf<=2)f.push('poco satisfecho');if(d.estres>=4&&d.sueno<=2)f.push('estrés alto y mal sueño');return f;}
function chkSum(d){d=d||{};return [CHK_L.cumple[d.cumple],CHK_L.carga[d.carga],d.alim!=null?'Alim. '+d.alim+'/10':''].filter(Boolean).join(' · ');}
(function(){const h0=cpHomeData;cpHomeData=function(){const r=h0.apply(this,arguments);try{
  if(!CP.chk){cpChkLoad();return r;}
  const nm=r.nm,dis=cpDisGet(),tdy=today(),since=addD(tdy,-14),feed=r.feed.slice(),al=r.al.slice();let nh=r.nh;const hid=(r.hid||[]).slice();
  CP.chk.forEach(x=>{if(!nm[x.client_id]||!x.period||x.period<since)return;const d=x.data||{};
    feed.push({d:bogota(x.created_at).date,cid:x.client_id,k:'chk',t:'envió su chequeo quincenal',feel:chkSum(d),q:x.comment||''});
    const fl=chkFlags(d);if(fl.length){const k=x.client_id+'|chk|'+x.id;const A={s:d.molestia==='si'?0:1,k,cid:x.client_id,t:'Chequeo: '+fl.join(' · '),q:'Léelo en su ficha y respóndele.'};if(dis[k]){nh++;hid.push(A);}else al.push(A);}});
  feed.sort((a,b)=>a.d<b.d?1:a.d>b.d?-1:0);al.sort((a,b)=>a.s-b.s);
  return {feed:feed.slice(0,8),al,nm,nh,hid};}catch(e){return r;}};
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="cpnav"]');if(t)CP.chk=null;},true);})();
function cpChkSec(){try{
  if(!CP.cid)return '';if(!CP.chk){cpChkLoad();return '<section class="sec"><div class="sec-h"><b>Chequeos quincenales</b></div><div class="note">Cargando…</div></section>';}
  const L=CP.chk.filter(x=>x.client_id===CP.cid).slice(0,6);
  const chip=(t,c)=>`<span style="display:inline-block;font-size:12px;font-weight:600;color:#fff;background:${c};padding:2px 9px;border-radius:99px;margin:2px 4px 2px 0">${esc(t)}</span>`;
  const body=L.length?L.map(x=>{const d=x.data||{},fl=chkFlags(d),sc=v=>v==null?'–':v;
    return `<div style="padding:10px 0;border-bottom:1px solid var(--line)"><b>${fdate(x.period)}</b>${fl.length?` <span style="color:#C0392B;font-weight:700">· ${esc(fl.join(' · '))}</span>`:''}<div style="margin-top:4px">${chip('Entrenos: '+(CHK_L.cumple[d.cumple]||'–'),d.cumple==='todos'?'#1F8F53':d.cumple==='casi'?'#5E9B3A':'#B87400')}${chip(CHK_L.molestia[d.molestia]||'–',d.molestia==='no'?'#1F8F53':d.molestia==='leve'?'#B87400':'#C0392B')}${chip(CHK_L.carga[d.carga]||'–',d.carga==='ok'?'#1F8F53':d.carga==='pesada'?'#C0392B':'#3B82C4')}</div>
     <small style="color:var(--gray)">Alimentación ${sc(d.alim)}/10 · Energía ${sc(d.energia)}/5 · Sueño ${sc(d.sueno)}/5 · Estrés ${sc(d.estres)}/5 · Progreso ${sc(d.satisf)}/5${d.nps!=null?' · Recomendaría '+d.nps+'/10':''}</small>${d.molTxt?`<div class="cpq">Molestia: “${esc(d.molTxt)}”</div>`:''}${x.comment?`<div class="cpq">“${esc(x.comment)}”</div>`:''}</div>`;}).join(''):'<div class="note">Aún no ha respondido ningún chequeo. Le aparece en Inicio cada dos sábados.</div>';
    return `<section class="sec"><div class="sec-h"><b>Chequeos quincenales</b><em>${L.length}</em></div><div class="note" style="margin-bottom:8px">Le aparece solo cada dos sábados. Para pedírselo otro día: en el calendario, + Tarea → Formulario.</div>${body}</section>`;}catch(e){return '';}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-chka="ask"]');if(!t||!CP.cid)return;e.stopPropagation();
  const cid=CP.cid,v={period:'ask-'+Date.now(),at:new Date().toISOString(),nps:false};
  try{await DB.upsert('client_data',[{client_id:cid,key:'chkask',value:v,updated_at:v.at}],'client_id,key');CP.chkAsk={cid,v};
    pushTo(cid,'Tu coach te pidió un chequeo','Respóndelo en 1 minuto desde Inicio','chk-ask');toast('Chequeo enviado ✓ Le aparece en Inicio');coachRender(true);}
  catch(x){console.warn(x);toast('No se pudo enviar');}},true);


/* --- exportar rutina a PDF (con miniaturas y enlaces de YouTube) --- */
var PDFM=null;
const PDF_INTRO='Haz primero el calentamiento para preparar las articulaciones. En los ejercicios básicos busca una carga que te permita llegar cerca del fallo técnico dentro del rango de repeticiones, con ejecución controlada. En los accesorios prioriza la conexión mente-músculo y el rango de movimiento completo. Toca la miniatura de cada ejercicio para ver el video técnico.';
function pdfRest(sec){if(!sec)return '';return sec>=120?(sec/60).toString().replace('.',',')+' min de descanso':sec+"'' de descanso";}
function pdfPresc(it,wk,prog){
  if(it.fixed)return {sets:it.fixed.sets,reps:it.fixed.reps,rest:pdfRest(it.rest)};
  const PP=PERIOD[prog]||PERIOD.complete,P=PP[it.kind==='basic'?'basic':'acc'],w=Math.min(wk,PP.weeks)-1;
  return {sets:P.sets[w],reps:P.reps[w],rest:pdfRest(it.rest)};}
function pdfRow(it,wk,prog){const e=E[it.ex]||{},pr=pdfPresc(it,wk,prog),yt=e.yt,url=yt?'https://youtu.be/'+yt:'';
  const th=yt?`<a href="${url}"><img src="https://i.ytimg.com/vi/${yt}/hqdefault.jpg" alt=""></a>`:`<div class="nov">Sin video</div>`;
  const nm=e.n||it.ex||'Ejercicio';
  const extra=[it.rir!=null&&it.rir!==''&&it.kind!=='warm'&&it.kind!=='calm'?'RIR '+it.rir:'',it.tempo&&it.kind==='basic'?'Tempo '+it.tempo:''].filter(Boolean).join(' · ');
  return `<div class="row"><div class="th">${th}</div><div class="nm">${url?`<a href="${url}">${esc(nm)}</a>`:esc(nm)}${it.note?`<div class="nt">${esc(it.note)}</div>`:''}</div><div class="rx"><b>${pr.sets} series x ${esc(String(pr.reps))}</b>${pr.rest?'<br>'+esc(pr.rest):''}${extra?'<br><span>'+esc(extra)+'</span>':''}</div></div>`;}
function pdfDay(d,o){
  const wk=o.wk,prog=o.prog;let h=`<section class="day"><h2>${esc(o.multi?(d.label?d.label+' · ':'')+(d.name||''):(d.name||d.label||''))}</h2>`;
  const sec=(t,body)=>body?`<div class="bar">${t}</div>${body}`:'';
  const warmItems=((d.blocks.find(b=>b.k==='warm')||{}).items||[]);
  let wb='';const fa=typeof faRec==='function'?faRec(d):null;
  if(fa&&E[fa]&&E[fa].yt){const m=(E[fa].n||'').match(/\((\d+) min\)/);wb=pdfRow({ex:fa,kind:'warm',fixed:{sets:1,reps:'1'+(m?' ('+m[1]+' min)':'')}},wk,prog);}
  else wb=warmItems.map(it=>pdfRow(it,wk,prog)).join('');
  h+=sec('Calentamiento',wb);
  const bl=k=>((d.blocks.find(b=>b.k===k)||{}).items||[]).map(it=>pdfRow(it,wk,prog)).join('');
  h+=sec('Ejercicios básicos',bl('main'));h+=sec('Ejercicios accesorios',bl('acc'));
  d.blocks.filter(b=>b.cust).forEach(b=>{h+=sec(esc(b.t||'Bloque'),(b.items||[]).map(it=>pdfRow(it,wk,prog)).join(''));});
  const hasC=d.blocks.some(b=>b.cardio);
  if(hasC){const tier=d.cardioTier||((CARDIO[o.goal]||CARDIO.complete)[wk-1]),mins=d.cardioMin?d.cardioMin+' min':({Base:'20-40 min',Moderado:'10-25 min',Intenso:'5-12 min'}[tier]||''),mod=d.cardioDefault&&typeof CMODS!=='undefined'&&CMODS[d.cardioDefault]?CMODS[d.cardioDefault].n:'Cardio a tu elección';
    const feel={Base:'Puedes hablar sin problema',Moderado:'Puedes decir frases cortas',Intenso:'Esfuerzo alto (solo si tu coach lo indica)'}[tier]||'';
    if(tier)h+=sec('Cardio',`<div class="row card"><div class="nm"><b>${esc(mod)}</b>${feel?`<div class="nt">${feel}</div>`:''}</div><div class="rx"><b>${esc(tier)}</b>${mins?'<br>'+esc(mins):''}</div></div>`+cNoteHTML(d));}
  h+=sec('Estiramientos y vuelta a la calma',bl('calm'));
  return h+'</section>';}
function pdfHTML(o){
  const logo=new URL('erre-logo.png',location.href).href;
  const css=`.wm{position:fixed;top:50%;left:50%;width:430px;transform:translate(-50%,-50%);opacity:.07;z-index:0}@page{size:A4;margin:12mm 13mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:Archivo,Helvetica,Arial,sans-serif;color:#1C1B19;margin:0;font-size:12px}
  .hd{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DCD6CC;padding-bottom:8px;margin-bottom:12px}.hd img{height:38px}.hd small{color:#5A554E;letter-spacing:.08em;text-transform:uppercase;font-size:10px}
  h1{font-family:Oswald,Archivo,sans-serif;text-transform:uppercase;font-size:21px;margin:4px 0 2px}h1 em{font-style:normal;color:#C0392B}.who{color:#5A554E;margin-bottom:8px}
  .intro{color:#3b3833;line-height:1.5;margin:8px 0 14px}.day{page-break-after:always}.day:last-child{page-break-after:auto}
  h2{font-family:Oswald,Archivo,sans-serif;text-transform:uppercase;font-size:15px;margin:0 0 8px;color:#C0392B}
  .bar{background:#E9E6DF;font-weight:700;padding:6px 10px;margin:12px 0 4px;font-size:11.5px;break-after:avoid}
  .row{display:flex;align-items:center;gap:14px;padding:7px 4px;border-bottom:1px solid #EFEDE8;break-inside:avoid}
  .th{width:150px;flex:none}.th img{width:150px;height:84px;object-fit:cover;display:block;border-radius:3px}.nov{width:150px;height:84px;background:#EFEDE8;color:#8b867e;display:flex;align-items:center;justify-content:center;font-size:11px;border-radius:3px}
  .nm{flex:1;font-size:13.5px;font-weight:600}.nm a{color:#1C1B19;text-decoration:none}.nt{font-weight:400;font-size:11px;color:#5A554E;margin-top:3px}
  .rx{width:135px;flex:none;font-size:11.5px;color:#3b3833;line-height:1.5}.rx span{color:#8b867e;font-size:10.5px}.row.card{padding:12px 4px}
  .ft{margin-top:10px;color:#8b867e;font-size:10px;text-align:center}`;
  const days=o.days.map(d=>pdfDay(d,o)).join('');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${esc(o.title||'Rutina')}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Oswald:wght@600;700&display=swap" rel="stylesheet"><style>${css}</style></head><body><img class="wm" src="${logo}" alt="">
  <div class="hd"><img src="${logo}" alt=""><small>ERRE Complete · Método Complete</small></div>
  <h1>${esc(o.title||'Tu rutina')}${o.sub?` <em>| ${esc(o.sub)}</em>`:''}</h1>${o.who?`<div class="who">Para: ${esc(o.who)} · Semana ${o.wk} del mesociclo</div>`:`<div class="who">Semana ${o.wk} del mesociclo</div>`}
  ${o.intro?`<div class="intro">${esc(o.intro)}</div>`:''}${days}<div class="ft">ERRE Complete · Toca la miniatura de cada ejercicio para abrir el video técnico</div></body></html>`;}
function pdfPrint(o){
  const f=document.createElement('iframe');f.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0';document.body.appendChild(f);
  f.srcdoc=pdfHTML(o);
  f.onload=()=>{const w=f.contentWindow;const go=()=>{try{w.focus();w.print();}catch(e){console.warn(e);}setTimeout(()=>f.remove(),60000);};
    const imgs=[...w.document.images].filter(i=>!i.complete);let n=imgs.length,fired=false;const fin=()=>{if(fired)return;fired=true;(w.document.fonts&&w.document.fonts.ready?w.document.fonts.ready:Promise.resolve()).then(()=>setTimeout(go,200));};
    if(!n)fin();else{imgs.forEach(i=>{const d=()=>{if(--n<=0)fin();};i.addEventListener('load',d);i.addEventListener('error',d);});setTimeout(fin,6000);}};}
function pdfModal(){let o=document.getElementById('pdfm');if(!PDFM){if(o)o.remove();return;}
  if(!o){o=document.createElement('div');o.id='pdfm';o.className='cpdv';document.body.appendChild(o);}
  const m=PDFM,weeks=(PERIOD[m.prog]||PERIOD.complete).weeks;
  o.innerHTML=`<div class="cpdc" style="max-width:520px"><div class="cpdhd"><div><b>Exportar rutina a PDF</b><small>Con miniaturas y links de los videos</small></div><button class="cpdx" data-act="pdfclose" aria-label="Cerrar">✕</button></div><div class="cpmvb">
   <label class="pfl">Qué incluir</label><div class="chips"><button class="chip${m.scope==='all'?' on':''}" data-act="pdfscope" data-v="all">Todos los días (${m.days.length})</button><button class="chip${m.scope==='one'?' on':''}" data-act="pdfscope" data-v="one">Solo este día</button></div>
   <label class="pfl" style="margin-top:8px">Semana del mesociclo (define series y repeticiones)</label><div class="chips">${Array.from({length:weeks},(_,i)=>`<button class="chip${m.wk===i+1?' on':''}" data-act="pdfwk" data-v="${i+1}">S${i+1}</button>`).join('')}</div>
   <label class="pfl" style="margin-top:8px">Título</label><input class="fld" id="pdfT" value="${esc(m.title)}">
   <label class="pfl" style="margin-top:8px">Para (opcional)</label><input class="fld" id="pdfW" value="${esc(m.who)}" placeholder="Nombre del cliente">
   <label class="pfl" style="margin-top:8px">Mensaje de entrada (opcional)</label><textarea class="fld" id="pdfI" rows="4">${esc(m.intro)}</textarea>
   <div class="note" style="margin-top:8px">Se abre el cuadro de impresión: elige <b>Guardar como PDF</b>. Los enlaces de los videos quedan activos en el archivo.</div>
   <button class="cpmvbt pri" data-act="pdfgo" style="width:100%;margin-top:10px">Generar PDF</button></div></div>`;}
function pdfSync(){const m=PDFM;if(!m)return;const g=id=>document.getElementById(id);if(g('pdfT'))m.title=g('pdfT').value;if(g('pdfW'))m.who=g('pdfW').value;if(g('pdfI'))m.intro=g('pdfI').value;}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act^="pdf"]');if(!t)return;const a=t.dataset.act;if(!/^pdf(open|close|scope|wk|go)$/.test(a))return;e.stopPropagation();
  if(a==='pdfopen'){let days,sel=0,prog='complete',goal='complete',who='',title='',wk=1;
    if(t.dataset.v==='rt'&&typeof RT!=='undefined'&&RT.days){days=RT.days;sel=RT.sel||0;title=RT.name||RT.title||'';try{if(RT.kind==='client'&&CP.d&&CP.d.profile){const p=CP.d.profile;prog=planOf(p);goal=['bajar','complete','aumentar'].includes(p.goal)?p.goal:'complete';who=p.full_name||'';}}catch(x){}}
    else{days=DAYS.filter(d=>!d.x);sel=Math.max(0,days.findIndex(d=>d===DAYS[S.day]));prog=S.program==='basic'?'basic':'complete';goal=S.goal;wk=Math.min(S.week||1,(PERIOD[prog]||PERIOD.complete).weeks);who=(S.user&&S.user.name)||'';title='Mi rutina';}
    if(!days||!days.length){toast('No hay días en la rutina para exportar');return;}
    PDFM={days,sel,prog,goal,wk,who,title:title||'Rutina',intro:PDF_INTRO,scope:'all'};pdfModal();return;}
  if(!PDFM)return;pdfSync();
  if(a==='pdfclose'){PDFM=null;pdfModal();return;}
  if(a==='pdfscope'){PDFM.scope=t.dataset.v;pdfModal();return;}
  if(a==='pdfwk'){PDFM.wk=+t.dataset.v;pdfModal();return;}
  if(a==='pdfgo'){const m=PDFM,days=m.scope==='one'?[m.days[Math.min(m.sel,m.days.length-1)]]:m.days;
    const o={days,multi:days.length>1,wk:m.wk,prog:m.prog,goal:m.goal,title:m.title,who:m.who,intro:m.intro.trim()};PDFM=null;pdfModal();pdfMake(o);}
},true);
(function(){const pv2=profileView;profileView=function(){let h=pv2.apply(this,arguments);
  try{const sec=`<details class="sec acc" data-pk="Mi rutina en PDF"${S.pfOpen&&S.pfOpen['Mi rutina en PDF']?' open':''}><summary><span>Mi rutina en PDF<small>Descárgala con los links de video</small></span></summary><div class="accbody"><div class="note" style="margin-bottom:8px">Tu rutina en un PDF profesional, con la miniatura de cada ejercicio y el enlace a su video técnico.</div><button class="btn solid" data-act="pdfopen" data-v="me" style="width:100%">Descargar mi rutina en PDF</button></div></details>`;
    return h.replace(/(<details class="sec acc" data-pk="Mi plan"[\s\S]*?<\/details>)/,m=>m+sec);}catch(e){return h;}};})();


/* --- medidas antropométricas (módulo que el coach activa por cliente) --- */
const MED_F=[['Básicas',[['peso','Peso','kg'],['talla','Talla','cm'],['grasa','% de grasa','%'],['musculo','Masa muscular','kg']]],
 ['Perímetros',[['cuello','Cuello'],['hombros','Hombros'],['pecho','Pecho'],['brazoD','Brazo der. relajado'],['brazoI','Brazo izq. relajado'],['antebrazoD','Antebrazo der.'],['antebrazoI','Antebrazo izq.'],['cintura','Cintura (más estrecha)'],['abdomen','Abdomen (ombligo)'],['cadera','Cadera (más ancha)'],['musloD','Muslo der. (medio)'],['musloI','Muslo izq. (medio)'],['pantD','Pantorrilla der.'],['pantI','Pantorrilla izq.']].map(x=>x.concat('cm'))],
 ['Pliegues cutáneos',[['pl_tri','Tríceps'],['pl_sub','Subescapular'],['pl_bic','Bíceps'],['pl_ili','Cresta ilíaca'],['pl_sup','Supraespinal'],['pl_abd','Abdominal'],['pl_mus','Muslo'],['pl_pan','Pantorrilla']].map(x=>x.concat('mm'))]];
var MED={rows:null,loading:false};
const medN=v=>{const n=parseFloat(String(v).replace(',','.'));return isFinite(n)?n:null;};
const medFmt=v=>v==null?'—':(Math.round(v*10)/10).toString().replace('.',',');
function medDerived(d){const o=[];const p=medN(d.peso),t=medN(d.talla),c=medN(d.cintura),h=medN(d.cadera);
  if(p&&t)o.push(['IMC',p/Math.pow(t/100,2),'']);if(c&&h)o.push(['Cintura / cadera',c/h,'']);
  const pl=['pl_tri','pl_sub','pl_bic','pl_ili','pl_sup','pl_abd','pl_mus','pl_pan'].map(k=>medN(d[k])).filter(v=>v!=null);if(pl.length>=3)o.push(['Suma de '+pl.length+' pliegues',pl.reduce((a,b)=>a+b,0),'mm']);return o;}
function medTable(rows,canDel){
  if(!rows.length)return '';const L=rows.slice(-3),first=rows[0],last=rows[rows.length-1],multi=rows.length>1;
  const head=`<tr><th></th>${L.map(r=>`<th>${pd(r.date).toLocaleDateString('es-CO',{day:'numeric',month:'short'}).replace('.','')}${canDel?`<button class="medx" data-act="medel" data-id="${r.id}" aria-label="Borrar medición">✕</button>`:''}</th>`).join('')}${multi?'<th>Cambio</th>':''}</tr>`;
  const val=(r,k)=>medN((r.data||{})[k]);
  const row=(k,n,u,d0,d1)=>{const vs=L.map(r=>val(r,k));if(vs.every(v=>v==null))return '';const a=val(first,k),b=val(last,k),dd=(multi&&a!=null&&b!=null)?b-a:null;
    return `<tr><td>${n}${u?` <small>${u}</small>`:''}</td>${vs.map(v=>`<td>${medFmt(v)}</td>`).join('')}${multi?`<td class="dl">${dd==null?'—':(dd>0?'▲ ':dd<0?'▼ ':'')+medFmt(Math.abs(dd))}</td>`:''}</tr>`;};
  const body=MED_F.map(([g,fs])=>{const rs=fs.map(([k,n,u])=>row(k,n,u)).join('');return rs?`<tr class="mg"><td colspan="${L.length+(multi?2:1)}">${g}</td></tr>${rs}`:'';}).join('');
  const dv=['IMC','Cintura / cadera'].concat([...new Set(L.map(r=>medDerived(r.data||{}).find(x=>/^Suma/.test(x[0]))).filter(Boolean).map(x=>x[0]))]);
  const drows=dv.map(n=>{const vs=L.map(r=>{const x=medDerived(r.data||{}).find(y=>y[0]===n);return x?x[1]:null;});if(vs.every(v=>v==null))return '';return `<tr><td>${n}</td>${vs.map(v=>`<td>${v==null?'—':medFmt(v)}</td>`).join('')}${multi?'<td class="dl">—</td>':''}</tr>`;}).join('');
  return `<div class="medw"><table class="medt">${head}${body}${drows?`<tr class="mg"><td colspan="${L.length+(multi?2:1)}">Calculados</td></tr>${drows}`:''}</table></div>`;}
(function(){const st=document.createElement('style');st.textContent=`.medw{overflow-x:auto;margin:6px 0}.medt{width:100%;border-collapse:collapse;font-size:12.5px}.medt td:first-child{white-space:normal;max-width:104px;line-height:1.2}.medt th,.medt td{padding:6px 5px;border-bottom:1px solid #DCD6CC;text-align:right;white-space:nowrap}.medt th:first-child,.medt td:first-child{text-align:left;position:sticky;left:0;background:#FBFAF8}.medt th{font-size:11px;color:#5A554E;text-transform:uppercase;letter-spacing:.04em}.medt .mg td{background:#EFEDE8;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.05em;text-align:left}.medt .dl{color:#5A554E;font-weight:600}.medt small{color:#8b867e}.medx{background:none;border:0;color:#C0392B;font-size:12px;margin-left:4px;padding:0 2px}
.medg{display:grid;grid-template-columns:1fr 1fr;gap:8px 10px}.medg label{font-size:12px;color:#5A554E;display:block;margin-bottom:2px}.medg .fld{width:100%;padding:8px 10px}.medh{font-weight:700;margin:14px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:#C0392B}`;document.head.appendChild(st);})();
/* coach */
function medLoad(){if(MED.loading)return;MED.loading=true;DB.measuresOf(CP.cid).then(r=>{CP.med={cid:CP.cid,rows:r};}).catch(e=>{console.warn(e);CP.med={cid:CP.cid,rows:[],err:1};}).then(()=>{MED.loading=false;try{coachRender(true);}catch(e){}});}
function cpMedSec(){try{
  if(!CP.cid||!CP.d)return '';const on=((CP.d.profile||{}).modules||[]).includes('medidas');
  if(!CP.med||CP.med.cid!==CP.cid){medLoad();return `<section class="sec"><div class="sec-h"><b>Medidas antropométricas</b></div><div class="note">Cargando…</div></section>`;}
  const rows=CP.med.rows;
  return `<section class="sec"><div class="sec-h"><b>Medidas antropométricas</b><em>${rows.length}</em></div>
   <div class="note" style="margin-bottom:8px">${on?'El cliente ve sus medidas en Progreso → Medidas.':'El cliente aún no las ve. Actívalas en "Módulos de la app" (Medidas antropométricas) cuando quieras mostrárselas.'}</div>
   <button class="btn solid" data-act="medopen" style="width:100%;margin-bottom:6px">+ Nueva medición</button>${rows.length?medTable(rows,true):'<div class="note">Aún no hay mediciones. Puedes registrar las tuyas o las que te pase el fisioterapeuta.</div>'}</section>`;}catch(e){return '';}}
function medModal(open){let o=document.getElementById('medm');if(!open){if(o)o.remove();return;}
  if(!o){o=document.createElement('div');o.id='medm';o.className='cpdv';document.body.appendChild(o);}
  const inp=([k,n,u])=>`<div><label>${n}${u?' ('+u+')':''}</label><input class="fld" data-med="${k}" inputmode="decimal" placeholder="—"></div>`;
  o.innerHTML=`<div class="cpdc" style="max-width:560px"><div class="cpdhd"><div><b>Nueva medición</b><small>Llena solo lo que mediste</small></div><button class="cpdx" data-act="medclose" aria-label="Cerrar">✕</button></div><div class="cpmvb">
   <div class="medg"><div><label>Fecha</label><input class="fld" type="date" id="medD" value="${today()}"></div><div><label>Medido por (opcional)</label><input class="fld" id="medB" placeholder="Ej. fisioterapeuta, coach"></div></div>
   ${MED_IN().map(([g,fs])=>`<div class="medh">${g}</div>${/Pliegues/.test(g)?medRanges('Hombre')+medRanges('Mujer'):''}<div class="medg">${fs.map(inp).join('')}</div>`).join('')}
   <label class="pfl" style="margin-top:12px">Nota (opcional)</label><textarea class="fld" id="medN" rows="2" placeholder="Condiciones, protocolo, observaciones"></textarea>
   <button class="cpmvbt pri" data-act="medsave" style="width:100%;margin-top:10px">Guardar medición</button></div></div>`;}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="medopen"],[data-act="medclose"],[data-act="medsave"],[data-act="medel"]');if(!t)return;e.stopPropagation();const a=t.dataset.act;
  if(a==='medopen'){medModal(true);return;}if(a==='medclose'){medModal(false);return;}
  if(a==='medsave'){const data={};document.querySelectorAll('#medm [data-med]').forEach(i=>{const v=medN(i.value);if(v!=null)data[i.dataset.med]=v;});
    if(!Object.keys(data).length){toast('Escribe al menos una medida');return;}
    const date=(document.getElementById('medD')||{}).value||today(),by=((document.getElementById('medB')||{}).value||'').trim(),note=((document.getElementById('medN')||{}).value||'').trim();
    try{await DB.measureSave({client_id:CP.cid,date,data,by_name:by||null,note:note||null});medModal(false);CP.med=null;medLoad();toast('Medición guardada ✓');}catch(x){console.warn(x);toast('No se pudo guardar la medición');}return;}
  if(a==='medel'){if(!confirm('¿Borrar esta medición? No se puede deshacer.'))return;try{await DB.measureDel(+t.dataset.id);CP.med=null;medLoad();toast('Medición borrada');}catch(x){toast('No se pudo borrar');}}
},true);
/* cliente: Progreso → Medidas */
(function(){const pv=progresoView;progresoView=function(){
  const on=(S.mods||[]).includes('medidas');
  if(!on){return pv.apply(this,arguments);}
  const seg=S.prog.seg;
  if(seg!=='medidas'){const h=pv.apply(this,arguments);return h.replace(/(<button class="chip[^"]*" data-act="pseg" data-v="fotos">Fotos<\/button>)/,m=>m+'<button class="chip" data-act="pseg" data-v="medidas">Medidas</button>');}
  const chips=`<div class="chips seg">${[['resumen','Resumen'],['peso','Peso'],['fuerza','Fuerza'],['pasos','Pasos'],['fotos','Fotos'],['medidas','Medidas']].map(x=>`<button class="chip${seg===x[0]?' on':''}" data-act="pseg" data-v="${x[0]}">${x[1]}</button>`).join('')}</div>`;
  if(MED.rows===null&&!MED.loading&&ME){MED.loading=true;DB.measuresOf(ME.id).then(r=>{MED.rows=r;}).catch(()=>{MED.rows=[];}).then(()=>{MED.loading=false;try{render();}catch(e){}});}
  if(MED.rows===null)return chips+'<p class="lead">Cargando…</p>';
  if(!MED.rows.length)return chips+emptyCard('Aún no hay medidas','Cuando tu coach (o tu fisioterapeuta) registre tus medidas, las verás aquí con su evolución.');
  const last=MED.rows[MED.rows.length-1];
  return chips+`<h2 class="h2" style="margin-top:4px">Mis medidas</h2><div class="sub2" style="margin:0 0 8px">Última medición: ${fdate(last.date)}${last.by_name?' · '+esc(last.by_name):''}. Muestra tus últimas 3 mediciones y el cambio desde la primera.</div>${medTable(MED.rows,false)}${last.note?`<div class="note" style="margin-top:8px">${esc(last.note)}</div>`:''}`;};})();


/* --- PDF real (jsPDF): enlaces activos, miniaturas y marca de agua --- */
function jspdfLoad(){return window.jspdf?Promise.resolve():new Promise((res,rej)=>{const t=document.createElement('script');t.src=new URL('jspdf.umd.min.js',location.href).href;t.onload=res;t.onerror=()=>rej(new Error('No cargó jsPDF'));document.head.appendChild(t);});}
function blobData(blob){return new Promise(r=>{const f=new FileReader();f.onload=()=>r(f.result);f.readAsDataURL(blob);});}
var PDF_LOGO=null;
async function pdfLogo(){if(PDF_LOGO)return PDF_LOGO;try{const r=await fetch(new URL('erre-logo-wm.png',location.href).href);PDF_LOGO=await blobData(await r.blob());}catch(e){PDF_LOGO='';}return PDF_LOGO;}
function pdfRowData(it,wk,prog){const e=E[it.ex]||{},pr=pdfPresc(it,wk,prog);
  const extra=[it.rir!=null&&it.rir!==''&&it.kind!=='warm'&&it.kind!=='calm'?'RIR '+it.rir:'',it.tempo&&it.kind==='basic'?'Tempo '+it.tempo:''].filter(Boolean).join(' · ');
  return {name:e.n||it.ex||'Ejercicio',yt:e.yt||'',note:it.note||'',l1:pr.sets+' series x '+pr.reps,l2:pr.rest,l3:extra};}
function pdfModelDay(d,o){const wk=o.wk,prog=o.prog,secs=[];
  const items=k=>((d.blocks.find(b=>b.k===k)||{}).items||[]);
  const warmItems=items('warm');let w=[];const fa=typeof faRec==='function'?faRec(d):null;
  if(fa&&E[fa]&&E[fa].yt){const m=(E[fa].n||'').match(/\((\d+) min\)/);w=[pdfRowData({ex:fa,kind:'warm',fixed:{sets:1,reps:'1'+(m?' ('+m[1]+' min)':'')}},wk,prog)];}else w=warmItems.map(it=>pdfRowData(it,wk,prog));
  secs.push({t:'Calentamiento',rows:w});
  secs.push({t:'Ejercicios básicos',rows:items('main').map(it=>pdfRowData(it,wk,prog))});
  secs.push({t:'Ejercicios accesorios',rows:items('acc').map(it=>pdfRowData(it,wk,prog))});
  d.blocks.filter(b=>b.cust).forEach(b=>secs.push({t:b.t||'Bloque',rows:(b.items||[]).map(it=>pdfRowData(it,wk,prog))}));
  if(d.blocks.some(b=>b.cardio)){const tier=d.cardioTier||((CARDIO[o.goal]||CARDIO.complete)[wk-1]);
    if(tier){const mins=d.cardioMin?d.cardioMin+' min':({Base:'20-40 min',Moderado:'10-25 min',Intenso:'5-12 min'}[tier]||''),mod=d.cardioDefault&&typeof CMODS!=='undefined'&&CMODS[d.cardioDefault]?CMODS[d.cardioDefault].n:'Cardio a tu elección';
      secs.push({t:'Cardio',rows:[{name:mod,yt:'',noimg:1,note:d.cardioNote||({Base:'Puedes hablar sin problema',Moderado:'Puedes decir frases cortas',Intenso:'Esfuerzo alto (solo si tu coach lo indica)'}[tier]||''),l1:tier,l2:mins,l3:''}]});}}
  secs.push({t:'Estiramientos y vuelta a la calma',rows:items('calm').map(it=>pdfRowData(it,wk,prog))});
  return {title:o.multi?((d.label?d.label+' · ':'')+(d.name||'')):(d.name||d.label||''),secs:secs.filter(x=>x.rows.length)};}
async function pdfMake(o){
  try{toast('Generando PDF…');
    await jspdfLoad();const {jsPDF}=window.jspdf,logo=await pdfLogo();
    const model=o.days.map(d=>pdfModelDay(d,o));
    const ids=[...new Set(model.flatMap(d=>d.secs.flatMap(s=>s.rows.map(r=>r.yt)).filter(Boolean)))];
    let th={};try{if(ids.length)th=await DB.thumbs(ids);}catch(e){console.warn('miniaturas',e);}
    const doc=new jsPDF({unit:'mm',format:'a4'}),W=210,H=297,M=13,CW=W-2*M;let y=0,first=true;
    const gs=(a)=>{try{doc.setGState(new doc.GState({opacity:a}));}catch(e){}};
    const page=()=>{if(!first)doc.addPage();first=false;
      if(logo){gs(0.07);doc.addImage(logo,'PNG',W/2-55,H/2-62,110,123);gs(1);
        doc.addImage(logo,'PNG',M,10,7.5,8.4);}
      doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(90,85,78);doc.text('ERRE ACADEMY · MÉTODO COMPLETE',W-M,15,{align:'right'});
      doc.setDrawColor(220,214,204);doc.setLineWidth(.3);doc.line(M,21,W-M,21);y=28;};
    const need=h=>{if(y+h>H-16)page();};
    page();
    doc.setFont('helvetica','bold');doc.setFontSize(18);doc.setTextColor(28,27,25);doc.text(String(o.title||'Tu rutina').toUpperCase(),M,y);y+=7;
    doc.setFont('helvetica','normal');doc.setFontSize(9.5);doc.setTextColor(90,85,78);doc.text((o.who?'Para: '+o.who+' · ':'')+'Semana '+o.wk+' del mesociclo',M,y);y+=6;
    if(o.intro){doc.setTextColor(60,56,51);const ls=doc.splitTextToSize(o.intro,CW);doc.text(ls,M,y);y+=ls.length*4.4+4;}
    model.forEach((d,di)=>{if(di>0)page();need(14);doc.setFont('helvetica','bold');doc.setFontSize(13);doc.setTextColor(192,57,43);doc.text(String(d.title).toUpperCase(),M,y);y+=7;
      d.secs.forEach(sc=>{need(7+30);doc.setFillColor(233,230,223);doc.rect(M,y,CW,7,'F');doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor(28,27,25);doc.text(sc.t,M+3,y+4.8);y+=9;
        sc.rows.forEach(r=>{const hasImg=!r.noimg,RH=hasImg?31:16;need(RH+2);const url=r.yt?'https://youtu.be/'+r.yt:'';
          let nx=M;
          if(hasImg){const im=th[r.yt];
            if(im){try{doc.addImage(im,'JPEG',M,y,50,28);}catch(e){doc.setFillColor(239,237,232);doc.rect(M,y,50,28,'F');}}
            else{doc.setFillColor(239,237,232);doc.rect(M,y,50,28,'F');if(url){doc.setFillColor(192,57,43);doc.triangle(M+22,y+9,M+22,y+19,M+30,y+14,'F');}else{doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(139,134,126);doc.text('Sin video',M+25,y+15,{align:'center'});}}
            if(url)doc.link(M,y,50,28,{url});nx=M+54;}
          doc.setFont('helvetica','bold');doc.setFontSize(10.5);doc.setTextColor(28,27,25);const nl=doc.splitTextToSize(r.name,hasImg?88:100),ny=y+(hasImg?(r.note?9:12):6);doc.text(nl,nx,ny);
          if(url)doc.link(nx,ny-4,88,nl.length*4.6+1,{url});
          let ty=ny+nl.length*4.6;if(r.note){doc.setFont('helvetica','normal');doc.setFontSize(8);doc.setTextColor(90,85,78);const ns=doc.splitTextToSize(r.note,88);doc.text(ns.slice(0,3),nx,ty);}
          const rx=W-M-38;let ry=y+(hasImg?10:5);doc.setFont('helvetica','bold');doc.setFontSize(9.5);doc.setTextColor(60,56,51);doc.text(r.l1,rx,ry);
          doc.setFont('helvetica','normal');doc.setFontSize(8.5);if(r.l2){ry+=4.6;doc.text(r.l2,rx,ry);}if(r.l3){ry+=4.4;doc.setTextColor(139,134,126);doc.setFontSize(8);doc.text(r.l3,rx,ry);}
          y+=RH;doc.setDrawColor(239,237,232);doc.setLineWidth(.2);doc.line(M,y-1,W-M,y-1);});
        y+=2;});});
    const n=doc.getNumberOfPages();for(let i=1;i<=n;i++){doc.setPage(i);doc.setFont('helvetica','normal');doc.setFontSize(7.5);doc.setTextColor(139,134,126);doc.text('Toca la miniatura de cada ejercicio para abrir el video técnico · '+i+'/'+n,W/2,H-8,{align:'center'});}
    const name=String(o.title||'Rutina').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^A-Za-z0-9]+/g,'_').replace(/^_|_$/g,'')||'Rutina';
    doc.save('ERRE_'+name+'.pdf');toast('PDF listo ✓ Revisa tus descargas');
  }catch(e){console.warn(e);toast('No se pudo generar el PDF. Intenta de nuevo.');}}


/* --- Medidas como tarea del cliente --- */
var MC={done:null,loading:false,s:null};
function mcLoad(){if(MC.loading)return;MC.loading=true;DB.measDoneMine().then(r=>{MC.done=new Set(r);}).catch(()=>{if(!MC.done)MC.done=new Set();}).then(()=>{MC.loading=false;try{if(!MC.s&&!document.getElementById('chkov'))render();}catch(e){}});}
function mcDue(){try{if(!ME||!S.user||(PROFILE&&PROFILE.role==='coach')||ACC.state==='expired')return null;
  if(MC.done===null){mcLoad();return null;}
  const t0=today();return cxList().filter(t=>t.type==='form'&&t.form==='medidas'&&t.date<=t0&&t.date>=addD(t0,-13)&&!MC.done.has('f-'+t.id)).sort((a,b)=>a.date<b.date?1:-1)[0]||null;}catch(e){return null;}}
function mcRender(){const s=MC.s;let ov=document.getElementById('chkov');
  if(!s){if(ov)ov.remove();document.body.style.overflow='';return;}
  if(!ov){ov=document.createElement('div');ov.id='chkov';document.body.appendChild(ov);document.body.style.overflow='hidden';}
  if(s.fin){ov.innerHTML=`<h2 class="h2" style="margin-top:40px">¡Listo, gracias!</h2><p class="wzs">Guardamos tus medidas. Tu coach las ve y compara con las anteriores.</p>${s.rev||''}<button class="chkok" data-mc="close">Volver al inicio</button>`;return;}
  const n=MED_IN().length,g=MED_IN()[s.i],last=s.i===n-1;
  const hint={'Básicas':'Peso en ayunas si puedes. Todo es opcional.','Perímetros':'Con cinta métrica, sin apretar. Puedes dejar en blanco lo que no mediste.','Pliegues cutáneos':'Solo si tienes plicómetro o te los midió un profesional. Toca los rangos abajo para ver qué significa cada valor.'}[g[0]]||'Todo es opcional.';
  ov.innerHTML=`<div style="display:flex;justify-content:space-between"><button class="chkx" data-mc="prev">${s.i?'‹ Atrás':'‹ Ahora no'}</button><small style="align-self:center;color:#5A554E">Medidas</small></div>
   <div class="wzp"><div class="wzb"><i style="width:${Math.round((s.i+1)/n*100)}%"></i></div><small>Paso ${s.i+1} de ${n}</small></div>
   <h2 class="h2 wzq">${g[0]}${g[0]==='Perímetros'?' (cm)':g[0]==='Pliegues'?' (mm)':''}</h2><p class="wzs">${hint}</p>
   <div class="chkr">${g[1].map(([k,nm,u])=>`<div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin:8px 0"><label style="font-weight:600">${nm}${u?' <small style="color:#5A554E">'+u+'</small>':''}</label><span data-mcb="${k}" style="flex:1;text-align:right">${g[0]==='Pliegues'||/Pliegues/.test(g[0])?mcBadge(s.v[k]):''}</span><input class="fld" data-mc-in="${k}" inputmode="decimal" placeholder="—" value="${s.v[k]!=null?s.v[k]:''}" style="width:90px;text-align:right"></div>`).join('')}</div>${/Pliegues/.test(g[0])?medRanges(mcSex()):''}
   ${last?`<textarea data-mc-in="__note" placeholder="Nota (opcional)" style="width:100%;margin-bottom:10px">${esc(s.note||'')}</textarea>`:''}
   <button class="chkok" data-mc="${last?'send':'next'}">${last?(s.busy?'Enviando…':'Guardar mis medidas'):'Siguiente'}</button>`;}
async function mcSend(){const s=MC.s;if(!s||s.busy)return;const data={};Object.keys(s.v).forEach(k=>{const v=medN(s.v[k]);if(v!=null)data[k]=v;});
  if(!Object.keys(data).length){toast('Escribe al menos una medida');return;}
  s.busy=true;mcRender();
  let prev=null;try{const rs=await DB.measuresOf(ME.id);prev=rs.filter(r=>r.date<today()||r.task_id!==s.task).reverse().find(r=>MED_PER().some(([k])=>r.data&&r.data[k]!=null))||null;}catch(e){}
  s.rev=mcReview(data,prev);
  try{await DB.measureSave({client_id:ME.id,date:today(),data,by_name:'Cliente',note:(s.note||'').trim()||null,task_id:s.task,created_by:ME.id});MC.done=MC.done||new Set();MC.done.add(s.task);
    try{if(PROFILE&&PROFILE.coach_id)pushTo(PROFILE.coach_id,(PROFILE.full_name||'Un cliente')+' registró sus medidas','Ya están en su ficha','med-'+ME.id);}catch(e){}
    s.fin=true;s.busy=false;mcRender();}
  catch(e){console.warn(e);s.busy=false;mcRender();toast('No se pudo guardar. Revisa tu internet e inténtalo de nuevo.');}}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-mc]');if(!t)return;e.stopPropagation();const a=t.dataset.mc,s=MC.s;
  if(a==='open'){const d=mcDue();if(!d)return;MC.s={task:'f-'+d.id,i:0,v:{},note:''};mcRender();return;}
  if(!s)return;
  if(a==='close'){MC.s=null;mcRender();try{render();}catch(x){}return;}
  if(a==='prev'){if(s.i>0){s.i--;mcRender();}else{MC.s=null;mcRender();}return;}
  if(a==='next'){s.i++;mcRender();document.getElementById('chkov').scrollTop=0;return;}
  if(a==='send'){mcSend();}
},true);
document.addEventListener('input',e=>{const t=e.target;if(!t||!t.dataset||t.dataset.mcIn==null||!MC.s)return;if(t.dataset.mcIn==='__note')MC.s.note=t.value;else{MC.s.v[t.dataset.mcIn]=t.value;const bd=document.querySelector('[data-mcb="'+t.dataset.mcIn+'"]');if(bd&&MC.s.i===MED_IN().findIndex(g=>/Pliegues/.test(g[0])))bd.innerHTML=mcBadge(t.value);}});
(function(){const hv=homeView;homeView=function(){const h=hv.apply(this,arguments);
  try{if(S.sel!==today())return h;const d=mcDue();if(!d)return h;
    const card=`<button class="chkcard" data-mc="open" style="margin-top:8px"><span><small>Medidas</small><b>Anota tus medidas</b><em>Peso, perímetros y pliegues · todo opcional · 1 minuto</em></span><i>›</i></button>`;
    if(h.includes('>Importante<')){const m='<h2 class="h2">Tareas de',i=h.indexOf(m);return i<0?h+card:h.slice(0,i)+card+h.slice(i);}
    const m='<h2 class="h2">Tareas de',i=h.indexOf(m),blk='<h2 class="h2">Importante</h2>'+card;return i<0?blk+h:h.slice(0,i)+blk+h.slice(i);}catch(e){return h;}};})();
(function(){const cl=cpMedSec;})();

/* --- Medidas: sin "Básicas" en el formulario + resumen al terminar --- */
function MED_IN(){return MED_F.filter(g=>g[0]!=='Básicas');}
function MED_PER(){return (MED_F.find(g=>g[0]==='Perímetros')||[0,[]])[1];}
function mcReview(cur,prev){try{
  const per=MED_PER(),nm=Object.fromEntries(per.map(x=>[x[0],x[1].replace(/\s*\(.*?\)/g,'')])),has=per.filter(([k])=>cur[k]!=null);
  if(!has.length)return '';
  const down=new Set(['cintura','abdomen']),neutral=new Set(['cuello','cadera']),f1=v=>(Math.round(v*10)/10).toString().replace('.',',');
  const card=(t,body)=>`<div class="chkr" style="margin-bottom:10px"><b>${t}</b>${body}</div>`;
  const row=(l,r,c)=>`<div style="display:flex;justify-content:space-between;gap:8px;margin:6px 0;font-size:14px"><span>${l}</span><b style="color:${c||'#1C1B19'}">${r}</b></div>`;
  let out='';
  if(prev){const rows=[];has.forEach(([k])=>{if(prev.data[k]==null)return;const d=cur[k]-prev.data[k];if(Math.abs(d)<0.05)return;
      const good=neutral.has(k)?null:(down.has(k)?d<0:d>0);rows.push({k,d,good});});
    const goods=rows.filter(r=>r.good===true).sort((a,b)=>Math.abs(b.d)-Math.abs(a.d));
    out+=card('Cambios desde tu medición anterior',(rows.length?rows.sort((a,b)=>Math.abs(b.d)-Math.abs(a.d)).map(r=>row(nm[r.k],(r.d>0?'▲ +':'▼ ')+f1(r.d)+' cm',r.good===true?'#1F8F53':r.good===false?'#B87400':'#5A554E')).join(''):'<p class="wzs" style="margin:6px 0 0">Sin cambios importantes.</p>'));
    out+=goods.length?`<div class="chkt">Tu mejor avance: ${goods.slice(0,2).map(r=>nm[r.k].toLowerCase()+' ('+(r.d>0?'+':'')+f1(r.d)+' cm)').join(' y ')}. Tu coach lo revisa con el contexto de tu entrenamiento.</div>`:`<div class="chkt">Los cambios toman tiempo. Tu coach los lee junto con tu entrenamiento y tu alimentación.</div>`;
  }else{
    const top=has.filter(([k])=>!['cintura','abdomen','cuello','cadera'].includes(k)).sort((a,b)=>cur[b[0]]-cur[a[0]]).slice(0,3);
    out+=card('Tus zonas más grandes',top.map(([k])=>row(nm[k],f1(cur[k])+' cm')).join(''));
    const asy=[['brazo','brazoD','brazoI'],['antebrazo','antebrazoD','antebrazoI'],['muslo','musloD','musloI'],['pantorrilla','pantD','pantI']].filter(([,a,b])=>cur[a]!=null&&cur[b]!=null&&Math.abs(cur[a]-cur[b])>=1.5);
    if(asy.length)out+=card('Simetría',asy.map(([n,a,b])=>row(n[0].toUpperCase()+n.slice(1),(cur[a]>cur[b]?'derecho':'izquierdo')+' +'+f1(Math.abs(cur[a]-cur[b]))+' cm','#B87400')).join(''))+'<div class="chkt">Una diferencia de 1–2 cm entre lados es normal. Tu coach la tiene en cuenta en tu programa.</div>';
    if(cur.cintura&&cur.cadera)out+=card('Cintura / cadera',row('Relación',f1(cur.cintura/cur.cadera).replace(',','.')==='NaN'?'—':(cur.cintura/cur.cadera).toFixed(2).replace('.',',')));
    out+='<div class="chkt">Esta es tu primera medición: la base. La próxima vez verás aquí cómo cambiaste.</div>';}
  return out;}catch(e){return '';}}

/* --- Pliegues: lectura por zona según rangos del coach --- */
function medBand(sex,v){const m=sex==='Hombre';
  if(m){if(v<10)return {t:'Muy magro',c:'#2F7FC4',r:0};if(v<20)return {t:'Normal',c:'#1F8F53',r:1};if(v<25)return {t:'Algo alto',c:'#B87400',r:2};return {t:'Grande',c:'#C0392B',r:3};}
  if(v<10)return {t:'Muy bajo',c:'#2F7FC4',r:0};if(v<20)return {t:'Magro',c:'#1F8F53',r:1};if(v<30)return {t:'Ideal',c:'#1F8F53',r:1};return {t:'Grande',c:'#C0392B',r:3};}
var mcReview0=mcReview;
mcReview=function(cur,prev){try{
  const grp=(MED_F.find(g=>/Pliegues/.test(g[0]))||[0,[]])[1],nm=Object.fromEntries(grp.map(x=>[x[0],x[1].replace(/\s*\(.*?\)/g,'')])),has=grp.filter(([k])=>cur[k]!=null);
  let html='';
  if(has.length){const sex=(S.user&&S.user.sex)||(PROFILE&&PROFILE.sex)||'',f1=v=>(Math.round(v*10)/10).toString().replace('.',',');
    const rows=has.map(([k])=>({k,v:cur[k],b:medBand(sex,cur[k])}));
    const body=rows.map(r=>{const pv=prev&&prev.data&&prev.data[k0(r)]!=null?prev.data[r.k]:null,d=pv!=null?r.v-pv:null;
      return `<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin:7px 0;font-size:14px"><span>${nm[r.k]}</span><span><b>${f1(r.v)} mm</b> <em style="font-style:normal;font-size:12px;font-weight:700;color:#fff;background:${r.b.c};padding:2px 8px;border-radius:99px">${r.b.t}</em>${d!=null&&Math.abs(d)>=0.5?` <small style="color:${d<0?'#1F8F53':'#B87400'};font-weight:700">${d<0?'▼ ':'▲ +'}${f1(d)}</small>`:''}</span></div>`;}).join('');
    html+=`<div class="chkr" style="margin-bottom:10px"><b>Tus pliegues (grasa por zona)</b>${body}</div>`;
    const sorted=rows.slice().sort((a,b)=>b.v-a.v),hi=sorted.filter(r=>r.b.r>=2).slice(0,2),lo=sorted[sorted.length-1];
    html+=hi.length?`<div class="chkt">Donde acumulas más grasa: ${hi.map(r=>nm[r.k].toLowerCase()).join(' y ')}. Es la zona que tu coach mira con tu alimentación y tu cardio.</div>`:`<div class="chkt">Tus pliegues están en rangos buenos. Tu zona más magra: ${nm[lo.k].toLowerCase()}.</div>`;
    html+='<div class="chkt" style="font-size:12px;opacity:.8">Rangos de referencia del coach para leer cada pliegue. Varían con la técnica de quien mide: compara siempre con las mismas condiciones.</div>';}
  return html+mcReview0(cur,prev);}catch(e){return mcReview0(cur,prev);}};
function k0(r){return r.k;}

function mcSex(){return (S.user&&S.user.sex)||(PROFILE&&PROFILE.sex)||'Mujer';}
function mcBadge(v){const n=medN(v);if(n==null)return '';const b=medBand(mcSex(),n);return `<em style="font-style:normal;font-size:12px;font-weight:700;color:#fff;background:${b.c};padding:2px 8px;border-radius:99px">${b.t}</em>`;}
function medRanges(sex){const m=sex==='Hombre',R=m?[['Menos de 10','Muy magro','#2F7FC4'],['10 a 20','Normal','#1F8F53'],['20 a 25','Algo alto','#B87400'],['25 o más','Grande','#C0392B']]:[['Menos de 10','Muy bajo','#2F7FC4'],['10 a 20','Magro','#1F8F53'],['20 a 30','Ideal','#1F8F53'],['30 o más','Grande','#C0392B']];
  return `<details style="margin:8px 0;background:#FBFAF8;border:1px solid #DCD6CC;border-radius:12px;padding:10px 12px"><summary style="font-weight:700;cursor:pointer">Rangos de referencia · ${m?'hombres':'mujeres'} (mm)</summary>${R.map(r=>`<div style="display:flex;justify-content:space-between;align-items:center;margin:7px 0;font-size:14px"><span>${r[0]} mm</span><em style="font-style:normal;font-size:12px;font-weight:700;color:#fff;background:${r[2]};padding:2px 10px;border-radius:99px">${r[1]}</em></div>`).join('')}<small style="color:#5A554E">Referencia por pliegue, según la experiencia del coach. Varía con la técnica de quien mide.</small></details>`;}


/* ===== ALIMENTACIÓN: plan base dentro de la app (por objetivo) ===== */
var AL_G={prot:['Proteínas','#C0392B','#F6E3DF','La palma de tu mano',['Huevos','Pechuga de pollo','Muslo de pollo','Carne magra','Cerdo magro','Pescado','Atún','Yogurt griego','Queso campesino / requesón']],
 carb:['Carbohidratos','#C7872A','#F6EAD6','1 pocillo / taza cocida',['Arroz','Avena','Papa','Yuca','Plátano','Arepa','Pan integral','Pasta','Quinua','Batata']],
 fat:['Grasas buenas','#6E8B3D','#E9EFDC','1 cucharada',['Aguacate (½)','Aceite de oliva','Mantequilla de maní','Almendras / maní / nueces','Semillas (chía, girasol)']],
 fruit:['Frutas','#B23E6E','#F6E1EA','1 fruta o 1 taza · meta 2–4 al día',['Banano','Manzana','Fresas / arándanos','Piña','Papaya','Mango','Naranja','Uvas / kiwi','+ de temporada y las que te gusten']],
 veg:['Vegetales','#2F8E57','#DEEFE4','Libres · mínimo 1 plato al día',['Espinaca','Lechuga','Tomate','Pepino','Brócoli','Zanahoria','Pimentón','Cebolla','Calabacín','Champiñones','Habichuela','+ de temporada y las que te gusten']]};
var AL_PLAN={
 complete:{n:'Recomposición',t:'Complete · recomposición',lede:'Plan base para verte y rendir mejor manteniendo tu peso. Construyes músculo y cuidas la grasa a la vez. Comida real, por porciones, sin contar.',
  keys:[['Peso estable','Tu peso se mantiene más o menos igual. Los cambios se ven en el espejo y las medidas.'],['Proteína constante','En cada comida, siempre. Es lo que reparte las calorías hacia el músculo.'],['Plato equilibrado','Proteína, carbo y vegetales en partes parejas. Ni te pasas ni te quedas corto.'],['Fuerza + hábitos','El entreno de fuerza es lo que hace la recomposición. Sueño y constancia la sostienen.']],
  plate:[['Carbohidrato','Energía del día',30,'#C7872A'],['Proteína','Construye y mantiene',30,'#C0392B'],['Vegetales','Salud y saciedad',30,'#2F8E57'],['Grasa buena','Un toque basta',10,'#6E8B3D']],
  rule:'Para recomponer: por comida 1,5 de proteína · 1 de carbo · 1 de grasa · vegetales libres.',
  meals:[['Desayuno','Equilibrado',['**3 huevos** + 1 pocillo de avena + 1 fruta','**Yogurt griego** + granola + fresas','Arepa + **huevos** + aguacate','Tostadas integrales + **huevo** + 1 fruta'],'1,5 palmas de proteína · 1 pocillo de carbo · 1 cda de grasa · 1 fruta'],
   ['Almuerzo','Tu comida principal',['**Pollo** + arroz (1 pocillo) + ensalada grande + aguacate','**Carne magra** + papa + verduras + aceite de oliva','**Pescado** + quinua + ensalada','**Pollo** + fríjol/lenteja + ensalada grande'],'1,5–2 palmas de proteína · 1 pocillo de carbo · 1 plato de vegetal · 1 cda de grasa'],
   ['Merienda','Opcional',['**Yogurt griego** + fruta','Puñado de frutos secos + fruta','**Huevos duros** + fruta','Batido (**proteína** + fruta)'],''],
   ['Cena','Carbo ligero',['**Pollo** + verduras + ½ pocillo de arroz + aguacate','**Tortilla de huevos** + ensalada + papa pequeña','**Pescado** + verduras + batata','**Carne magra** + ensalada grande + arroz (poco)'],'1,5 palmas de proteína · ½–1 pocillo de carbo · 1 plato de vegetal · 1 cda de grasa']],
  extra:['Snacks de calidad','Yogurt griego · frutos secos · huevo duro · chocolate 70%+'],
  end:'El espejo y las medidas mandan, no la báscula. Mantén el peso, mejora la forma.',sost:'Lo simple hecho constante es lo que recompone tu cuerpo.'},
 aumentar:{n:'Aumentar masa',t:'Aumentar masa muscular',lede:'Plan base para ganar músculo con un excedente suave. Comida real, por porciones, sin contar.',
  keys:[['Excedente suave','Comes un poco más de lo que gastas, sin pasarte: ganas músculo, no solo grasa.'],['Proteína en cada comida','Siempre. Es el ladrillo con el que se construye el músculo.'],['Carbo para rendir','Es el combustible de tus entrenos de fuerza y de tu recuperación.'],['Constancia, no perfección','Comer suficiente cada día pesa más que un día perfecto.']],
  plate:[['Carbohidrato','Energía y recuperación',35,'#C7872A'],['Proteína','Construye músculo',30,'#C0392B'],['Vegetales','Salud y digestión',25,'#2F8E57'],['Grasa buena','Un toque basta',10,'#6E8B3D']],
  rule:'Para crecer: por comida 1,5–2 de proteína · 1,5–2 de carbo · 1 de grasa · vegetales libres.',
  meals:[['Desayuno','Carga buena de carbo',['Avena con leche + mantequilla de maní + banano, y **3 huevos**','Arepa + **3 huevos** + aguacate + 1 fruta','**Yogurt griego** + granola + frutos secos + fresas o banano','Batido: leche + avena + **proteína** + mantequilla de maní + banano'],'1,5–2 palmas de proteína · 1,5–2 pocillos de carbo · 1 cda de grasa · 1–2 frutas'],
   ['Almuerzo','Tu comida más fuerte',['**Pollo** + arroz + ensalada + aguacate','**Carne magra** + papa + verduras + aceite de oliva','**Pescado** + yuca o plátano + ensalada','**Pollo** + pasta integral + verduras'],'2 palmas de proteína · 2 pocillos de carbo · 1 plato de vegetal · 1 cda de grasa'],
   ['Merienda','Opcional · suma para crecer',['**Yogurt griego** + granola + fruta','Batido: leche + **proteína** + avena + maní + banano','**Huevos duros** + arepa + fruta','Frutos secos + fruta + chocolate 70%'],''],
   ['Cena','',['**Pollo** + arroz + verduras + aguacate','**Tortilla de huevos** + papa + ensalada','**Pescado** + batata + verduras','**Carne magra** + arroz + ensalada'],'1,5–2 palmas de proteína · 1,5 pocillos de carbo · 1 plato de vegetal · 1 cda de grasa']],
  extra:['Extra para aumentar','Leche · granola · chocolate 70%+ · (proteína en polvo y creatina, opcionales)'],
  end:'La báscula es tu termómetro. Sube lentico = vas bien. Si no sube en 2 semanas, come más.',sost:'Lo simple hecho constante es lo que hace crecer.'},
 bajar:{n:'Bajar de peso',t:'Bajar de peso',lede:'Plan base para bajar grasa sin perder músculo ni pasar hambre. Comida real, por porciones, sin contar.',
  keys:[['Déficit moderado','Comes un poco menos de lo que gastas. Despacio y sostenido gana a rápido y agotador.'],['Proteína alta','Cuida tu músculo y te mantiene saciado. Va en cada comida.'],['Llénate con vegetales','Mucho volumen, pocas calorías. Es tu mejor aliado contra el hambre.'],['Sin hambre extrema','Si pasas hambre todo el día, el plan es demasiado agresivo: se ajusta.']],
  plate:[['Proteína','Cuida y construye músculo',35,'#C0392B'],['Vegetales','Volumen y saciedad',35,'#2F8E57'],['Carbohidrato','El justo para rendir',15,'#C7872A'],['Grasa buena','Un toque basta',15,'#6E8B3D']],
  rule:'Para bajar grasa: por comida 2 de proteína · ½–1 de carbo · 1 de grasa · vegetales en abundancia.',
  meals:[['Desayuno','Proteína alta',['**3 huevos** + ½ pocillo de avena + 1 fruta','**Yogurt griego** + fresas (poca granola)','**Huevos** + arepa pequeña + tomate','Omelette de claras + vegetales + 1 fruta'],'1,5–2 palmas de proteína · ½ pocillo de carbo · 1 cda de grasa · 1 fruta'],
   ['Almuerzo','Llénate con vegetales',['**Pollo** + ensalada grande + ½ pocillo de arroz + aguacate','**Carne magra** + muchas verduras + papa pequeña','**Pescado** + ensalada + ½ plátano','**Pollo** + fríjol + ensalada grande'],'2 palmas de proteína · ½–1 pocillo de carbo · 1–2 platos de vegetal · 1 cda de grasa'],
   ['Merienda','Opcional',['**Yogurt griego** + fruta','Fruta + puñado pequeño de frutos secos','**Huevos duros** + pepino o zanahoria','Fruta + **proteína** en polvo'],''],
   ['Cena','Ligera, poco carbo',['**Pollo** + muchas verduras + aguacate','**Pescado** + ensalada grande','**Tortilla de huevos** + verduras salteadas','**Carne magra** + verduras + ½ pocillo de arroz'],'1,5–2 palmas de proteína · 0–½ pocillo de carbo · 1–2 platos de vegetal · 1 cda de grasa']],
  extra:['Para llenar sin calorías','Vegetales en abundancia · gelatina sin azúcar · infusiones · (proteína en polvo, opcional)'],
  end:'La báscula baja lentico = vas bien. Si no baja en 2 semanas, ajusta porciones: nunca pases hambre extrema.',sost:'Lo simple hecho constante es lo que baja la grasa.'}};
(function(){const st=document.createElement('style');st.textContent=`
.al{margin:0 0 14px}.al h3{font:700 13px Oswald,Archivo,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#4E7D63;margin:18px 0 8px}
.alhero{background:#1C1B19;color:#fff;border-radius:16px;padding:16px 18px}.alhero small{display:block;color:#9DC2AE;font-weight:700;letter-spacing:.08em;text-transform:uppercase;font-size:11px}
.alhero b{display:block;font:700 22px Oswald,Archivo,sans-serif;text-transform:uppercase;margin:2px 0 6px}.alhero p{margin:0;color:#D9D4CA;font-size:14px;line-height:1.45}
.alcard{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:14px;padding:14px 16px;margin-bottom:10px}
.alkeys{display:grid;grid-template-columns:1fr 1fr;gap:8px}.alk{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:12px;padding:10px 12px}.alk b{display:block;font-size:13px}.alk small{display:block;color:#5A554E;font-size:12px;line-height:1.35;margin-top:2px}
.alplate{display:flex;gap:16px;align-items:center}.aldonut{width:116px;height:116px;border-radius:50%;flex:0 0 116px;position:relative}.aldonut::after{content:"";position:absolute;inset:30%;background:#FBFAF8;border-radius:50%}
.allg{flex:1;display:flex;flex-direction:column;gap:7px;font-size:13px}.allg div{display:flex;align-items:center;gap:8px}.allg i{width:12px;height:12px;border-radius:4px;flex:0 0 12px}.allg em{margin-left:auto;font-style:normal;font-weight:700;color:#5A554E}
.alhm{display:grid;grid-template-columns:1fr 1fr;gap:8px}.alhm div{border-left:4px solid var(--c);background:#FBFAF8;border-radius:10px;padding:9px 11px;border-top:1px solid #DCD6CC;border-right:1px solid #DCD6CC;border-bottom:1px solid #DCD6CC}.alhm b{display:block;color:var(--c);font-size:12px;letter-spacing:.04em;text-transform:uppercase}.alhm span{font-size:13px;line-height:1.35}
.alrule{background:#C0392B;color:#fff;border-radius:12px;padding:12px 14px;font-weight:600;font-size:14px;line-height:1.35;margin:10px 0}
.altabs{display:flex;gap:6px;overflow-x:auto;margin-bottom:10px}.altab{flex:0 0 auto;border:2px solid #DCD6CC;background:#FBFAF8;border-radius:99px;padding:8px 14px;font:600 14px Archivo,sans-serif}.altab.on{background:#1C1B19;border-color:#1C1B19;color:#fff}
.alopt{display:flex;gap:10px;align-items:flex-start;padding:10px 0;border-bottom:1px solid #DCD6CC;font-size:14px;line-height:1.45}.alopt:last-of-type{border-bottom:0}.alopt i{font:700 12px Oswald,sans-serif;font-style:normal;background:#C0392B;color:#fff;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 22px;margin-top:1px}
.alap{background:#F5E4E0;border-radius:10px;padding:9px 12px;font-size:13px;margin-top:8px}.alap b{color:#C0392B}
.alsum{display:flex;justify-content:space-between;align-items:center;width:100%;background:none;border:0;padding:0;font:600 14px Archivo,sans-serif;text-align:left}.alsum i{font-style:normal;color:#5A554E;font-size:18px}
.alchips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.alchip{background:var(--ct);border:1px solid color-mix(in srgb,var(--c) 25%,transparent);border-radius:99px;padding:4px 11px;font-size:13px}.alchip.more{background:none;border-style:dashed;color:#5A554E;font-style:italic}
.alg h4{margin:0;font-size:15px;color:var(--c)}.alg small{color:#5A554E}
.alhead{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap}
`;document.head.appendChild(st);})();
function alB(s){return esc(s).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');}
function alPlan(){const g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete';return AL_PLAN[g];}
function alGuide(){const P=alPlan(),ex=S.exp||{},meal=ex.alMeal!=null?ex.alMeal:0,M=P.meals[Math.min(meal,P.meals.length-1)];
  const tot=P.plate.reduce((a,x)=>a+x[2],0);let acc=0;const grad=P.plate.map(x=>{const a=acc/tot*100;acc+=x[2];return x[3]+' '+a+'% '+(acc/tot*100)+'%';}).join(',');
  const open=k=>!!ex['al.'+k],tg=(k,t,body)=>`<div class="alcard"><button class="alsum" data-alm="tg" data-k="${k}"><span>${t}</span><i>${open(k)?'▴':'▾'}</i></button>${open(k)?body:''}</div>`;
  const bank=Object.keys(AL_G).map(k=>{const [n,c,ct,por,L]=AL_G[k];return `<div class="alcard alg" style="--c:${c};--ct:${ct}"><div class="alhead"><h4>${n}</h4><small>${por}</small></div><div class="alchips">${L.map(x=>`<span class="alchip${x[0]==='+'?' more':''}">${esc(x)}</span>`).join('')}</div></div>`;}).join('');
  const shop=Object.keys(AL_G).map(k=>`<p style="margin:8px 0 0;font-size:13px"><b style="color:${AL_G[k][1]}">${AL_G[k][0]}:</b> ${AL_G[k][4].filter(x=>x[0]!=='+').slice(0,9).join(' · ')}</p>`).join('')+`<p style="margin:8px 0 0;font-size:13px"><b>${P.extra[0]}:</b> ${esc(P.extra[1])}</p><p style="margin:8px 0 0;font-size:13px"><b style="color:#3C7FA6">Hidratación:</b> Agua · sal marina · limón / naranja (para el cóctel en días fuertes)</p>`;
  return `<section class="al">
   <h3>Las 4 claves</h3><div class="alkeys">${P.keys.map(k=>`<div class="alk"><b>${esc(k[0])}</b><small>${esc(k[1])}</small></div>`).join('')}</div>
   <h3>Tu plato</h3><div class="alcard alplate"><div class="aldonut" style="background:conic-gradient(${grad})"></div><div class="allg">${P.plate.map(x=>`<div><i style="background:${x[3]}"></i><span><b>${x[0]}</b><br><small style="color:#5A554E">${x[1]}</small></span><em>${x[2]}%</em></div>`).join('')}</div></div>
   <h3>Cuánto comer · sin pesar</h3><div class="alhm"><div style="--c:#C0392B"><b>Proteína</b><span>El tamaño de tu <strong>palma</strong></span></div><div style="--c:#C7872A"><b>Carbohidrato</b><span><strong>1 pocillo</strong> / taza cocida</span></div><div style="--c:#6E8B3D"><b>Grasa</b><span><strong>1 cucharada</strong> o ½ aguacate</span></div><div style="--c:#2F8E57"><b>Vegetales</b><span><strong>Libres</strong>, mínimo 1 plato</span></div></div>
   <div class="alrule">${esc(P.rule)}</div>
   <h3>Banco de alimentos</h3>${bank}
   ${tg('hid','Hidratación · agua siempre',`<p style="font-size:14px;line-height:1.5;margin:10px 0 0"><b>Día normal:</b> agua a lo largo del día.<br><b>Cóctel de electrolitos</b> (agua + hielo + pizca de sal marina + limón o naranja): idealmente 1 vez al día, sobre todo en días de entreno y de calor. Sin comprar sobres.</p>`)}
   ${tg('shop','Lista de compras',shop)}
   ${tg('sost','Para que sea sostenible',`<p style="font-size:14px;line-height:1.5;margin:10px 0 0"><b>Cocina en tanda:</b> arroz + proteína para 2–3 días.<br><b>Arma el plato:</b> palma + pocillo + un plato de vegetal + cucharada.<br><b>No varíes por variar:</b> pocas opciones que te gusten. ${esc(P.sost)}</p>`)}
   <div class="alrule" style="background:#1C1B19">${esc(P.end)}</div></section>`;}
(function(){const pv=pillarView;pillarView=function(p){const h=pv.apply(this,arguments);if(p!=='alim')return h;try{return alView();}catch(e){console.warn(e);return h;}};})();
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-alm]');if(!t||!['meal','tg'].includes(t.dataset.alm))return;e.stopPropagation();S.exp=S.exp||{};
  if(t.dataset.alm==='meal')S.exp.alMeal=+t.dataset.i;else if(t.dataset.alm==='tg'){const k='al.'+t.dataset.k;S.exp[k]=!S.exp[k];}
  save();render();},true);


/* ===== Alimentación v2: tu día en tarjetas (varias opciones por comida) ===== */
var AL_PORC={complete:{d:{p:'1,5',c:'1',f:'1',fr:'1'},a:{p:'1,5–2',c:'1',v:'1 plato',f:'1'},m:{p:'1',fr:'1'},c:{p:'1,5',c:'½–1',v:'1 plato',f:'1'}},
 aumentar:{d:{p:'1,5–2',c:'1,5–2',f:'1',fr:'1–2'},a:{p:'2',c:'2',v:'1 plato',f:'1'},m:{p:'1',c:'1',fr:'1'},c:{p:'1,5–2',c:'1,5',v:'1 plato',f:'1'}},
 bajar:{d:{p:'1,5–2',c:'½',f:'1',fr:'1'},a:{p:'2',c:'½–1',v:'1–2 platos',f:'1'},m:{p:'1',fr:'1'},c:{p:'1,5–2',c:'0–½',v:'1–2 platos',f:'1'}}};
var AL_GI={p:['🖐','Proteína','palma','#C0392B','prot'],c:['🥣','Carbo','pocillo','#C7872A','carb'],f:['🥄','Grasa','cda','#6E8B3D','fat'],fr:['🍎','Fruta','fruta','#B23E6E','fruit'],v:['🥬','Vegetal','','#2F8E57','veg']};
var AL_M=[['d','Desayuno','🌅'],['a','Almuerzo','☀️'],['m','Merienda','🍎'],['c','Cena','🌙']];
var AL_O={
d:[['Huevos con avena','🍳🌾🍌',{p:'Huevos',c:'Avena',fr:'Banano'}],['Yogurt con granola','🥣🍓',{p:'Yogurt griego',c:'Granola',fr:'Fresas'}],['Arepa con huevos','🫓🍳🥑',{p:'Huevos',c:'Arepa',f:'Aguacate (½)'}],['Tostadas con huevo','🍞🍳🍎',{p:'Huevos',c:'Pan integral',fr:'Manzana'}],['Batido de proteína','🥤🍌🥜',{p:'Proteína whey (en polvo)',c:'Avena',fr:'Banano',f:'Mantequilla de maní'}],['Omelette de vegetales','🥚🥬🍞',{p:'Huevos',c:'Pan integral',v:'Espinaca'}]],
a:[['Pollo con arroz','🍗🍚🥗🥑',{p:'Pechuga de pollo',c:'Arroz',v:'Ensalada',f:'Aguacate (½)'}],['Carne con papa','🥩🥔🥦',{p:'Carne magra',c:'Papa',v:'Brócoli',f:'Aceite de oliva'}],['Pescado con quinua','🐟🌾🥗',{p:'Pescado',c:'Quinua',v:'Ensalada',f:'Aceite de oliva'}],['Pollo con fríjol','🍗🫘🥗',{p:'Pechuga de pollo',c:'Fríjol / lenteja',v:'Ensalada',f:'Aguacate (½)'}],['Pasta con pollo','🍝🍗🥦',{p:'Pechuga de pollo',c:'Pasta',v:'Brócoli',f:'Aceite de oliva'}],['Cerdo con yuca','🥩🍠🥗',{p:'Cerdo magro',c:'Yuca',v:'Ensalada',f:'Aguacate (½)'}]],
m:[['Yogurt con fruta','🥣🍓',{p:'Yogurt griego',fr:'Fresas'}],['Frutos secos y fruta','🥜🍎',{p:'Queso campesino / requesón',f:'Almendras / maní / nueces',fr:'Manzana'}],['Huevos duros','🥚🍌',{p:'Huevos',fr:'Banano'}],['Batido de proteína','🥤🍌',{p:'Proteína whey (en polvo)',fr:'Banano'}],['Atún con arepa','🐟🫓',{p:'Atún',c:'Arepa',fr:'Naranja'}],['Queso con fruta','🧀🍍',{p:'Queso campesino / requesón',fr:'Piña'}]],
c:[['Pollo con verduras','🍗🥦🍚🥑',{p:'Pechuga de pollo',c:'Arroz',v:'Brócoli',f:'Aguacate (½)'}],['Tortilla de huevos','🍳🥗🥔',{p:'Huevos',c:'Papa',v:'Ensalada',f:'Aceite de oliva'}],['Pescado con batata','🐟🍠🥦',{p:'Pescado',c:'Batata',v:'Brócoli',f:'Aceite de oliva'}],['Carne con ensalada','🥩🥗🍚',{p:'Carne magra',c:'Arroz',v:'Ensalada',f:'Aceite de oliva'}],['Crema de pollo','🍲🍗🥕',{p:'Pechuga de pollo',c:'Papa',v:'Zanahoria',f:'Aceite de oliva'}],['Atún con ensalada','🐟🥗🥑',{p:'Atún',c:'Pan integral',v:'Ensalada',f:'Aguacate (½)'}]]};
(function(){const st=document.createElement('style');st.textContent=`
.ald{margin:0 0 6px}.alh{display:flex;align-items:center;justify-content:space-between;margin:16px 0 8px}.alh b{font:700 16px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.04em}.alh em{font-style:normal;font-size:12px;font-weight:700;color:#1F8F53}
.alrail{display:flex;gap:10px;overflow-x:auto;padding:2px 2px 8px;scroll-snap-type:x proximity;scrollbar-width:none}.alrail::-webkit-scrollbar{display:none}
.alc{flex:0 0 138px;scroll-snap-align:start;background:#FBFAF8;border:2px solid #DCD6CC;border-radius:16px;padding:12px 10px;text-align:center;position:relative;font-family:Archivo,sans-serif}
.alc .e{font-size:26px;line-height:1.25;letter-spacing:2px;min-height:34px}.alc b{display:block;font-size:13px;margin-top:6px;line-height:1.2}.alc.on{border-color:#1F8F53;background:#E7F4EC}.alc.on::after{content:"✓";position:absolute;top:6px;right:8px;color:#1F8F53;font-weight:800}
#almodal{position:fixed;inset:0;z-index:9500;background:rgba(28,27,25,.55);display:flex;align-items:flex-end;justify-content:center}.alsh{background:#EFEDE8;width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:16px 18px 24px;max-height:88vh;overflow-y:auto}
.alsh .big{font-size:34px;letter-spacing:3px;text-align:center}.alsh h2{font:700 20px Oswald,Archivo,sans-serif;text-transform:uppercase;text-align:center;margin:4px 0 12px}
.alrow{display:flex;align-items:center;gap:10px;width:100%;background:#FBFAF8;border:2px solid #DCD6CC;border-left:8px solid var(--c);border-radius:12px;padding:10px 12px;margin-bottom:8px;text-align:left;font:600 15px Archivo,sans-serif}.alrow i{font-style:normal;font-size:22px}.alrow span{flex:1}.alrow small{display:block;color:#5A554E;font-weight:500;font-size:12px}.alrow em{font-style:normal;font-weight:700;color:var(--c);font-size:13px;white-space:nowrap}
.alsw{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 10px}.alsw button{background:var(--ct);border:1px solid var(--c);border-radius:99px;padding:5px 11px;font:500 13px Archivo,sans-serif}.alsw button.on{background:var(--c);color:#fff}
.aleat{width:100%;border:0;border-radius:14px;padding:14px;font:700 16px Archivo,sans-serif;background:#1C1B19;color:#fff;margin-top:6px}.aleat.on{background:#1F8F53}.alx{background:none;border:0;color:#5A554E;font:600 14px Archivo,sans-serif;padding:0 0 8px}
`;document.head.appendChild(st);})();
function alDKey(){return S.sel||today();}
function alSt(){S.alim=S.alim||{};const d=alDKey();S.alim[d]=S.alim[d]||{};return S.alim[d];}
function alOpt(m,i){const st=alSt(),o=AL_O[m][i],sw=((st[m]||{}).sw||{})[i]||{};const comp=Object.assign({},o[2],sw);return {n:o[0],e:o[1],comp};}
function alDay(){const g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete',st=alSt();
  return `<section class="ald">`+AL_M.map(([k,n,ic])=>{const ch=(st[k]||{}).eat;
   return `<div class="alh"><b>${ic} ${n}</b>${ch!=null?'<em>✓ Ya elegiste</em>':k==='m'?'<small style="color:#5A554E">opcional</small>':''}</div><div class="alrail">${AL_O[k].map((o,i)=>`<button class="alc${ch===i?' on':''}" data-alm="open" data-m="${k}" data-i="${i}"><div class="e">${o[1]}</div><b>${o[0]}</b></button>`).join('')}</div>`;}).join('')+`</section>`;}
function alModal(m,i,sw){let o=document.getElementById('almodal');if(m==null){if(o)o.remove();document.body.style.overflow='';return;}
  if(!o){o=document.createElement('div');o.id='almodal';document.body.appendChild(o);document.body.style.overflow='hidden';}
  const g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete',por=AL_PORC[g][m],O=alOpt(m,i),st=alSt(),eaten=(st[m]||{}).eat===i,mn=AL_M.find(x=>x[0]===m);
  const rows=Object.keys(AL_GI).filter(k=>O.comp[k]||(por[k]&&k==='v'&&false)).map(k=>{const [ic,nm,u,c]=AL_GI[k],q=por[k];return `<button class="alrow" style="--c:${c}" data-alm="sw" data-k="${k}"><i>${ic}</i><span>${esc(O.comp[k])}${(sw===k)?'':'<small>Toca para cambiar</small>'}</span><em>${q?q+(u&&k!=='v'?' '+u:''):''}</em></button>${sw===k?`<div class="alsw" style="--c:${c};--ct:${AL_G[AL_GI[k][4]][2]}">${AL_G[AL_GI[k][4]][4].filter(x=>x[0]!=='+').map(x=>`<button class="${O.comp[k]===x?'on':''}" data-alm="pick" data-k="${k}" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div>`:''}`;}).join('');
  o.innerHTML=`<div class="alsh"><button class="alx" data-alm="close">‹ Volver</button><div class="big">${O.e}</div><h2>${esc(O.n)}</h2>${rows}<button class="aleat${eaten?' on':''}" data-alm="eat">${eaten?'✓ La comí hoy':'Esta es la que como hoy'}</button></div>`;o.dataset.m=m;o.dataset.i=i;o.dataset.sw=sw||'';}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-alm]');if(!t)return;const a=t.dataset.alm;
  if(!['open','sw','pick','eat','close'].includes(a))return;e.stopPropagation();
  const o=document.getElementById('almodal'),m=o&&o.dataset.m,i=o&&+o.dataset.i;
  if(a==='open'){alModal(t.dataset.m,+t.dataset.i,'');return;}
  if(a==='close'){alModal(null);render();return;}
  if(a==='sw'){alModal(m,i,o.dataset.sw===t.dataset.k?'':t.dataset.k);return;}
  if(a==='pick'){const st=alSt();st[m]=st[m]||{};st[m].sw=st[m].sw||{};st[m].sw[i]=Object.assign({},st[m].sw[i],{[t.dataset.k]:t.dataset.v});save();alModal(m,i,'');return;}
  if(a==='eat'){const st=alSt();st[m]=st[m]||{};st[m].eat=st[m].eat===i?null:i;if(st[m].eat==null)delete st[m].eat;
    const n=['d','a','c'].filter(k=>(st[k]||{}).eat!=null).length;try{tk()['alim.prot']=n>=3;}catch(x){}
    save();alModal(m,i,'');return;}
},true);
function alView(){const P=alPlan(),ex=S.exp||{},open=!!ex['al.guide'];
  return `<div class="alhero" style="padding:12px 16px"><small>${esc(P.t)}</small><b style="font-size:19px;margin:0">Tu día de comida</b></div>${alDay()}
   <div class="alcard" style="margin-top:6px"><button class="alsum" data-alm="tg" data-k="guide"><span>Mi guía: plato, porciones y banco de alimentos</span><i>${open?'▴':'▾'}</i></button></div>${open?alGuide():''}`;}


/* ===== Vista previa del entrenamiento (antes de empezar) + descartar ===== */
var PV_MG={'Hombro':'Hombros','Hombro posterior':'Hombros','Manguito rotador':'Hombros','Espalda':'Espalda','Dorsal':'Espalda','Trapecio':'Espalda','Escápulas':'Espalda','Pierna':'Piernas','Cuádriceps':'Piernas','Isquiotibiales':'Piernas','Gemelos':'Piernas','Glúteo':'Glúteos','Bíceps':'Bíceps','Tríceps':'Tríceps','Pecho':'Pecho','Abdomen':'Abdomen','Core':'Abdomen'};
var PV_MC={'Pecho':'#C0392B','Espalda':'#3B6FB6','Hombros':'#E08A2E','Piernas':'#2E9D6B','Glúteos':'#B23E6E','Bíceps':'#7A5BC4','Tríceps':'#C4893B','Abdomen':'#5A554E'};
(function(){const st=document.createElement('style');st.textContent=`
.pv .pvk{color:#5A554E;font-size:13px;margin:0}.pv h2.pvt{font:700 28px Oswald,Archivo,sans-serif;text-transform:uppercase;margin:2px 0 4px}
.pvm{display:flex;gap:8px;overflow-x:auto;padding:2px 0 6px;scrollbar-width:none}.pvm::-webkit-scrollbar{display:none}
.pvmc{flex:0 0 auto;min-width:112px;background:#FBFAF8;border:1px solid #DCD6CC;border-top:5px solid var(--c);border-radius:12px;padding:10px 12px}.pvmc b{display:block;font-size:15px}.pvmc em{font-style:normal;font-weight:800;color:var(--c);font-size:18px}
.pvh{display:flex;align-items:center;justify-content:space-between;margin:16px 0 8px}.pvh b{font-size:18px}.pvadd{width:38px;height:38px;border-radius:50%;border:1.5px solid #1C1B19;background:none;font-size:22px;line-height:1}
.pvr{display:flex;align-items:center;gap:12px;background:#FBFAF8;border:1px solid #DCD6CC;border-radius:14px;padding:10px;margin-bottom:8px}.pvr span{flex:1;min-width:0}.pvr b{display:block;font-size:14px;line-height:1.25}.pvr small{color:#5A554E;font-size:13px}
.pvr .thm{width:56px;height:56px;flex:0 0 56px;border-radius:10px}
.pvfoot{position:sticky;bottom:78px;display:flex;flex-direction:column;gap:8px;margin-top:14px;padding:10px 0;background:linear-gradient(transparent,#F7F6F3 30%)}
.pvgo{border:0;border-radius:99px;padding:15px;font:700 16px Archivo,sans-serif;background:#1C1B19;color:#fff}.pvw{border:2px solid #1C1B19;background:none;border-radius:99px;padding:13px;font:700 15px Archivo,sans-serif}
.disc{width:100%;margin-top:16px;border:0;border-radius:99px;padding:14px;background:#C0392B;color:#fff;font:700 15px Archivo,sans-serif}`;document.head.appendChild(st);})();
/* reparto de músculos por ejercicio: usa el patrón/músculo y reparte entre principal y secundarios */
const PV_SPL={'Pecho':{Pecho:1},'Pectoral':{Pecho:1},'Aperturas de pecho':{Pecho:1},'Empuje horizontal':{Pecho:.6,Tríceps:.2,Hombros:.2},'Empuje vertical':{Hombros:.6,Tríceps:.4},
 'Hombro':{Hombros:1},'Elevación lateral':{Hombros:1},'Deltoide anterior':{Hombros:1},'Deltoide posterior':{Hombros:1},'Hombro posterior':{Hombros:1},'Manguito rotador':{Hombros:1},
 'Tracción vertical':{Espalda:.75,Bíceps:.25},'Tracción horizontal':{Espalda:.75,Bíceps:.25},'Dorsal aislado':{Espalda:1},'Dorsal':{Espalda:1},'Espalda':{Espalda:1},'Trapecio':{Trapecio:1},'Escápulas':{Trapecio:1},
 'Flexión de codo':{Bíceps:1},'Bíceps':{Bíceps:1},'Extensión de codo':{Tríceps:1},'Tríceps':{Tríceps:1},'Antebrazo':{Antebrazo:1},
 'Core':{Abdomen:1},'Abdomen':{Abdomen:1},'Oblicuos':{Abdomen:1},
 'Sentadilla':{Piernas:.65,Glúteos:.35},'Dominante de rodilla':{Piernas:.65,Glúteos:.35},'Pierna':{Piernas:1},'Cuádriceps':{Piernas:1},'Extensión de rodilla':{Piernas:1},'Aducción':{Piernas:1},
 'Zancada':{Piernas:.55,Glúteos:.45},'Glúteo/Cuádriceps':{Piernas:.55,Glúteos:.45},
 'Dominante de cadera':{Isquios:.55,Glúteos:.45},'Bisagra de cadera':{Isquios:.55,Glúteos:.45},'Curl femoral':{Isquios:1},'Flexión de rodilla':{Isquios:1},'Isquiotibiales':{Isquios:1},
 'Puente de glúteo':{Glúteos:1},'Patada de glúteo':{Glúteos:1},'Glúteo aislado':{Glúteos:1},'Glúteo':{Glúteos:1},'Glúteo mayor':{Glúteos:1},'Abducción':{Glúteos:1},'Gemelos':{Gemelos:1}};
const PV_GSPL={'Espalda':{Espalda:1},'Pecho':{Pecho:1},'Hombro':{Hombros:1},'Pierna':{Piernas:.6,Glúteos:.4},'Glúteo':{Glúteos:1},'Core':{Abdomen:1}};
/* peso por tamaño del músculo: los grupos grandes (espalda, pecho, piernas) pesan más que los pequeños */
var PV_SZ={Espalda:1.4,Pecho:1.4,Piernas:1.4,Glúteos:1.2,Isquios:1,Hombros:.9,Trapecio:.8,Bíceps:.7,Tríceps:.7,Abdomen:.7,Gemelos:.6,Antebrazo:.5};
function pvSplit(e){if(!e)return null;const nm=String(e.n||'').toLowerCase();
  if(/pantorrilla|talón|talon/.test(nm))return [['Gemelos',1]];
  const o=PV_SPL[e.mus]||PV_SPL[e.pat]||PV_GSPL[e.g]||null;if(!o)return null;return Object.entries(o);}
Object.assign(PV_MC,{'Isquios':'#1E8A8A','Gemelos':'#6B9F2E','Trapecio':'#3A5E9C','Antebrazo':'#8C6A4B'});
function pvData(){const d=DAYS[S.day],P=PERIOD[S.program],wk=Math.min(S.week,P.weeks),rows=[],mg={};
  ['main','acc'].concat(d.blocks.filter(b=>b.cust).map(b=>b.k)).forEach(bk=>{const b=d.blocks.find(x=>x.k===bk);if(!b)return;
    itemsOf(d,b).forEach((it,i)=>{const id=curEx(d,bk,i,it),e=E[id]||{};let p={};try{p=presc(it);}catch(x){}
      rows.push({id,n:e.n||id,sets:p.sets||it.sets||0,reps:p.reps});const sp=pvSplit(e);if(sp)sp.forEach(([g,w])=>{mg[g]=(mg[g]||0)+w*(p.sets||1)*(bk==='main'?1.5:1)*(PV_SZ[g]||1);});});});
  const tot=Object.values(mg).reduce((a,b)=>a+b,0)||1,top=Object.entries(mg).sort((a,b)=>b[1]-a[1]).slice(0,4).map(([n,v])=>[n,Math.round(v/tot*100)]);
  return {d,wk,P,rows,top};}
function pvHTML(){const {d,wk,P,rows,top}=pvData();
  return `<section class="pv"><button class="lblbtn" data-act="pvback" style="color:var(--gray);margin:2px 0 8px">‹ Rutina de hoy</button>
   <p class="pvk">Entrenamiento de hoy · Semana ${wk} de ${P.weeks}</p><h2 class="pvt">${esc(d.name||'Entrenamiento')}</h2>
   ${top.length?`<div class="pvh" style="margin-top:12px"><b>Músculos objetivo</b></div><div class="pvm">${top.map(([n,p])=>`<div class="pvmc" style="--c:${PV_MC[n]||'#5A554E'}"><b>${n}</b><em>${p}%</em></div>`).join('')}</div>`:''}
   <div class="pvh"><b>${rows.length} ejercicios</b><button class="pvadd" data-act="add" data-b="acc" aria-label="Añadir ejercicio">+</button></div>
   ${rows.map(r=>`<div class="pvr">${typeof thumb==='function'?thumb(r.id):''}<span><b>${esc(r.n)}</b><small>${r.sets} series${r.reps&&r.reps!=='libre'?' • '+esc(String(r.reps))+' repeticiones':''}</small></span></div>`).join('')}
   <div class="pvfoot"><button class="pvw" data-act="pvwarm">Ver calentamiento</button><button class="pvgo" data-act="pvstart">Comenzar entrenamiento</button></div></section>`;}
(function(){const tv=trainView;trainView=function(){
  try{if(S.pv==='g_fuerza'&&S.raw>=1&&S.day>=0&&!(S.fb&&S.fb[fbKey('g_fuerza')])&&!(ipActive()&&S.tw==='g_fuerza'))return pvHTML()+(typeof trainZonesCard==='function'?trainZonesCard():'');}catch(e){console.warn(e);}
  const h=tv.apply(this,arguments);
  try{if(S.tg&&S.tg===S.tw&&ipActive())return h+`<button class="disc" data-act="ipdel">Descartar entrenamiento</button>`;}catch(e){}
  try{if(typeof trainZonesCard==='function')return h+trainZonesCard();}catch(e){}
  return h;};})();
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pvback"],[data-act="pvstart"],[data-act="pvwarm"]');if(!t)return;e.stopPropagation();const a=t.dataset.act;
  if(a==='pvback'){S.pv=null;save();render();window.scrollTo(0,0);return;}
  if(a==='pvstart'){S.pv=null;S.tw='g_fuerza';S.tgAt=Date.now();S.tgD=today();S.tg='g_fuerza';save();render();window.scrollTo(0,0);return;}
  if(a==='pvwarm'){const d=DAYS[S.day],b=d.blocks.find(x=>x.k==='warm'),fa=typeof faRec==='function'?faRec(d):null;
    let h=((b&&b.items)||[]).map((it,i)=>{const id=curEx(d,'warm',i,it),ee=E[id]||{};return `<div class="prerow">${thumb(id)}<span><b>${esc(ee.n||id)}</b><small>${esc((it.fixed&&it.fixed.reps)||'')}</small></span></div>`;}).join('');
    if(fa&&E[fa])h=`<div class="prerow">${thumb(fa)}<span><b>${esc(E[fa].n)}</b><small>Calentamiento recomendado de hoy</small></span></div>`+h;
    sheet(`<h3>Calentamiento</h3><div class="presheet">${h||'<p>Sin calentamiento.</p>'}</div><button class="btn" data-act="close" style="width:100%;margin-top:10px">Cerrar</button>`);}
},true);


/* ===== Alimentación v3: gramos/porciones, tablero del día (kcal, macros, agua, electrolitos) ===== */
/* [gramos por 1 porción, unidad natural (g por unidad, nombre sing, plural)|null, kcal/100g, P, C, G] — valores aproximados */
var AL_FD={
'Pechuga de pollo':[100,null,165,31,0,3.6],'Muslo de pollo':[100,null,210,26,0,11],'Carne magra':[100,null,190,28,0,8],'Cerdo magro':[100,null,200,27,0,9],'Pescado':[110,null,140,25,0,4],'Atún':[90,null,110,25,0,1],
'Huevos':[100,[50,'huevo','huevos'],143,12.6,0.7,9.5],'Yogurt griego':[200,null,70,9,4,2],'Queso campesino / requesón':[100,null,100,12,3,4],'Proteína whey (en polvo)':[30,[30,'scoop','scoops'],380,75,8,6],
'Arroz':[150,null,130,2.7,28,0.3],'Avena':[40,null,380,13,66,7],'Papa':[150,null,87,2,20,0.1],'Yuca':[130,null,160,1.4,38,0.3],'Plátano':[120,null,120,1,31,0.3],'Arepa':[80,[80,'arepa','arepas'],190,4,40,1],'Pan integral':[60,[30,'tajada','tajadas'],250,10,45,3.5],
'Pasta':[150,null,158,6,31,0.9],'Quinua':[150,null,120,4.4,21,1.9],'Batata':[150,null,90,2,21,0.2],'Fríjol / lenteja':[150,null,125,8,22,0.5],'Granola':[40,null,450,10,65,18],
'Aguacate (½)':[70,[140,'aguacate','aguacates'],160,2,9,15],'Aceite de oliva':[14,[14,'cucharada','cucharadas'],884,0,0,100],'Mantequilla de maní':[15,[15,'cucharada','cucharadas'],590,25,20,50],'Almendras / maní / nueces':[20,null,600,20,20,52],'Semillas (chía, girasol)':[15,null,540,20,20,45],
'Banano':[120,[120,'banano','bananos'],90,1,23,0.3],'Manzana':[150,[150,'manzana','manzanas'],52,0.3,14,0.2],'Fresas':[150,null,32,0.7,8,0.3],'Fresas / arándanos':[150,null,35,0.7,9,0.3],'Piña':[150,null,50,0.5,13,0.1],'Papaya':[150,null,43,0.5,11,0.3],'Mango':[150,null,60,0.8,15,0.4],'Naranja':[150,[150,'naranja','naranjas'],47,0.9,12,0.1],'Uvas / kiwi':[120,null,65,0.8,16,0.3]};
var AL_VEG=[150,null,25,1.5,5,0.3];
function alFd(n){return AL_FD[n]||AL_VEG;}
function alNum(str){const m=String(str||'').replace(/,/g,'.').replace('½','.5').match(/[\d.]+/g);if(!m)return [1,1];const a0=parseFloat(m[0]),a=isNaN(a0)?1:a0,b=m[1]?parseFloat(m[1]):a;return [a,b];}
function alMul(str){const [a,b]=alNum(str);return (a+b)/2;}
function alQty(k,name,porStr,unit){const f=alFd(name),[lo,hi]=alNum(porStr);const veg=k==='v';
  const g1=Math.round(lo*f[0]/5)*5,g2=Math.round(hi*f[0]/5)*5,gt=g1===g2?g1+' g':g1+'–'+g2+' g';
  const pl=(k==='p'?'palma':k==='c'?'pocillo':k==='f'?'cda':k==='fr'?'fruta':'plato'),pt=porStr?(String(porStr).replace(/ plato.*/,'')+(k==='v'?'':' '+pl+((hi>1)&&pl!=='cda'?(pl==='palma'?'s':pl==='pocillo'?'s':''):''))):'';
  let u='';if(f[1]){const n1=lo*f[0]/f[1][0],n2=hi*f[0]/f[1][0],fm=x=>(Math.round(x*2)/2).toString().replace('.5','½').replace(/^0½$/,'½').replace(/^(\d+)½$/,'$1½');u=(n1===n2?fm(n1):fm(n1)+'–'+fm(n2))+' '+(n2>1?f[1][2]:f[1][1]);}
  const portTxt=veg?(porStr||'libre'):pt;
  return unit==='p'?{main:portTxt,sub:(u?u+' · ':'')+gt}:{main:u&&(name==='Huevos'||name==='Arepa'||name==='Aguacate (½)'||name==='Tortilla de maíz')?gt+' · '+u:gt,sub:portTxt};}
function alMacros(m,i,stOverride){const g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete',por=AL_PORC[g][m],O=alOpt(m,i);let kc=0,P=0,C=0,F=0,fr=0,vg=0;
  Object.keys(O.comp).forEach(k=>{const f=alFd(O.comp[k]),mu=alMul(por[k]||'1'),gr=mu*f[0];kc+=gr*f[2]/100;P+=gr*f[3]/100;C+=gr*f[4]/100;F+=gr*f[5]/100;if(k==='fr')fr+=mu;if(k==='v')vg+=mu;});
  return {kc,P,C,F,fr,vg};}
function alTargets(){const u=S.user||{},f=u.data||{},g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete';
  let w=0;try{const ks=Object.keys(S.weights||{}).sort();if(ks.length)w=+S.weights[ks[ks.length-1]];}catch(e){}if(!w)w=parseFloat(f.weight)||0;
  const hom=u.sex==='Hombre';if(!w)w=hom?75:62;const h=parseFloat(f.height)||(hom?174:162);
  let age=30;if(f.yy)age=Math.max(16,new Date().getFullYear()-(+f.yy));
  const bmr=10*w+6.25*h-5*age+(hom?5:-161),days=(u.sched||[0,2,4]).length,act=1.4+0.03*days;
  let kc=bmr*act*(g==='bajar'?0.82:g==='aumentar'?1.1:1);kc=Math.round(kc/50)*50;
  const P=Math.round(w*(g==='bajar'?2.2:2)),F=Math.round(w*(g==='bajar'?0.8:0.9)),C=Math.max(60,Math.round((kc-P*4-F*9)/4));
  return {kc,P,C,F,water:Math.round(w*35/250)*250,fr:3,vg:3,estimated:!parseFloat(f.weight)&&!Object.keys(S.weights||{}).length};}
function alTotals(){const st=alSt(),t={kc:0,P:0,C:0,F:0,fr:0,vg:0,meals:0};
  AL_M.forEach(([k])=>{const e=(st[k]||{}).eat;if(e==null)return;t.meals++;const x=alMacros(k,e);['kc','P','C','F','fr','vg'].forEach(q=>t[q]+=x[q]);});return t;}
(function(){const st=document.createElement('style');st.textContent=`
.alb{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:18px;padding:14px;margin:12px 0}
.alb h4{margin:0 0 10px;font:700 13px Oswald,Archivo,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#4E7D63}
.alb .r1{display:flex;gap:14px;align-items:center}.alring{position:relative;width:112px;height:112px;flex:0 0 112px}.alring b{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;font:700 22px Oswald,Archivo,sans-serif}.alring small{font:500 11px Archivo,sans-serif;color:#5A554E}
.almac{flex:1;display:flex;flex-direction:column;gap:9px}.almc{font:600 12px Archivo,sans-serif}.almc div{display:flex;justify-content:space-between}.almc span{color:#5A554E;font-weight:500}.albar{height:9px;border-radius:99px;background:#E4DFD6;overflow:hidden;margin-top:3px}.albar i{display:block;height:100%;border-radius:99px;transition:width .35s}
.alr2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}.alsm{background:#EFEDE8;border-radius:14px;padding:10px 12px;font:600 13px Archivo,sans-serif}.alsm small{display:block;color:#5A554E;font-weight:500;font-size:11px}
.aldots{display:flex;gap:6px;margin-top:6px}.aldots i{width:22px;height:22px;border-radius:50%;background:#DCD6CC;display:flex;align-items:center;justify-content:center;color:#fff;font-size:12px;font-style:normal}.aldots i.on{background:#1F8F53}
.alw{display:flex;gap:14px;align-items:center;margin-top:12px;background:#E3EEF4;border-radius:16px;padding:12px}.alwb{width:64px;height:120px;flex:0 0 64px}.alwi{flex:1}.alwi b{font:700 20px Oswald,Archivo,sans-serif}.alwi small{display:block;color:#3C6A86;font:500 12px Archivo,sans-serif}
.alwbt{display:flex;gap:8px;margin-top:8px}.alwbt button{flex:1;border:0;border-radius:12px;padding:10px;font:700 14px Archivo,sans-serif;background:#3C7FA6;color:#fff}.alwbt button.m{flex:0 0 46px;background:#fff;color:#3C7FA6;border:1.5px solid #3C7FA6}
.alel{display:flex;align-items:center;gap:10px;width:100%;margin-top:8px;border:2px solid #3C7FA6;background:#fff;border-radius:12px;padding:9px 12px;font:600 14px Archivo,sans-serif;color:#3C7FA6;text-align:left}.alel.on{background:#3C7FA6;color:#fff}.alel i{font-style:normal;font-size:20px}
.alun{display:flex;background:#E4DFD6;border-radius:99px;padding:3px;margin:0 0 12px}.alun button{flex:1;border:0;background:none;border-radius:99px;padding:8px;font:700 13px Archivo,sans-serif;color:#5A554E}.alun button.on{background:#1C1B19;color:#fff}
.alrow em small{display:block;font-weight:500;color:#5A554E;font-size:11px;text-align:right}`;document.head.appendChild(st);})();
function alRing(p,c){const r=46,C=2*Math.PI*r,v=Math.min(1,Math.max(0,p));return `<svg viewBox="0 0 112 112" width="112" height="112"><circle cx="56" cy="56" r="${r}" fill="none" stroke="#E4DFD6" stroke-width="12"/><circle cx="56" cy="56" r="${r}" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C*v} ${C}" transform="rotate(-90 56 56)" style="transition:stroke-dasharray .4s"/></svg>`;}
function alBottle(p,el){const v=Math.min(1,Math.max(0,p)),h=78*v;return `<svg class="alwb" viewBox="0 0 64 120"><defs><clipPath id="alcp"><path d="M22 4h20v14c0 6 12 10 12 24v66a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V42c0-14 12-18 12-24z"/></clipPath></defs><g clip-path="url(#alcp)"><rect x="0" y="0" width="64" height="120" fill="#fff"/><rect x="0" y="${112-h}" width="64" height="${h+10}" fill="#5BB8E8" style="transition:all .4s"/></g><path d="M22 4h20v14c0 6 12 10 12 24v66a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V42c0-14 12-18 12-24z" fill="none" stroke="#3C6A86" stroke-width="2.5"/>${el?'<text x="32" y="82" text-anchor="middle" font-size="26" style="paint-order:stroke" stroke="#fff" stroke-width="3">⚡</text>':''}</svg>`;}
function alBoard(){const T=alTargets(),t=alTotals(),st=alSt(),w=st.w||0,el=!!st.el,pc=x=>Math.round(x);
  const mac=(n,v,tg,c)=>`<div class="almc"><div><b>${n}</b><span>${pc(v)} / ${tg} g</span></div><div class="albar"><i style="width:${Math.min(100,v/tg*100)}%;background:${c}"></i></div></div>`;
  return `<div class="alb"><h4>Tu día</h4><div class="r1"><div class="alring">${alRing(t.kc/T.kc,t.kc>T.kc*1.1?'#C0392B':'#1F8F53')}<b>${pc(t.kc)}<small>de ${T.kc} kcal</small></b></div>
   <div class="almac">${mac('Proteína',t.P,T.P,'#C0392B')}${mac('Carbo',t.C,T.C,'#C7872A')}${mac('Grasa',t.F,T.F,'#6E8B3D')}</div></div>
   <div class="alr2"><div class="alsm">Comidas<div class="aldots">${['d','a','c'].map(k=>`<i class="${(st[k]||{}).eat!=null?'on':''}">${(st[k]||{}).eat!=null?'✓':''}</i>`).join('')}<i class="${(st.m||{}).eat!=null?'on':''}" style="opacity:.7">${(st.m||{}).eat!=null?'✓':''}</i></div></div>
    <div class="alsm">Micros (frutas y vegetales)<div style="margin-top:4px">🍎 ${Math.round(t.fr*10)/10}/${T.fr} · 🥬 ${Math.round(t.vg*10)/10}/${T.vg}</div></div></div>
   <div class="alw">${alBottle(w/T.water,el)}<div class="alwi"><b>${(w/1000).toFixed(2).replace('.',',')} L</b><small>de ${(T.water/1000).toFixed(1).replace('.',',')} L de agua hoy</small>
     <div class="alwbt"><button data-alb="w" data-v="250">+ Vaso 250 ml</button><button class="m" data-alb="w" data-v="-250" aria-label="Quitar">−</button></div>
     <button class="alel${el?' on':''}" data-alb="el"><i>🧂</i><span>${el?'Electrolitos tomados ✓':'Cóctel de electrolitos'}</span></button></div></div>
   <small style="display:block;color:#5A554E;margin-top:8px;font-size:11px">Metas de referencia según tu peso, objetivo y días de entreno${T.estimated?' (estimadas: completa tu peso en el perfil)':''}. Valores de comida aproximados.</small></div>`;}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-alb]');if(!t)return;e.stopPropagation();const st=alSt(),T=alTargets();
  if(t.dataset.alb==='w'){st.w=Math.max(0,(st.w||0)+(+t.dataset.v));try{tk()['alim.agua']=st.w>=T.water;}catch(x){}}
  else if(t.dataset.alb==='el'){st.el=!st.el;}
  else if(t.dataset.alb==='un'){S.alUnit=t.dataset.v;save();alRefreshModal();render();return;}
  save();render();},true);
function alRefreshModal(){const o=document.getElementById('almodal');if(o)alModal(o.dataset.m,+o.dataset.i,o.dataset.sw||'');}
document.addEventListener('click',e=>{if(e.target&&e.target.id==='almodal'){alModal(null);render();}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.getElementById('almodal')){alModal(null);render();}});
/* modal v3: unidad gramos/porciones + macros de la opción */
alModal=function(m,i,sw){let o=document.getElementById('almodal');if(m==null){if(o)o.remove();document.body.style.overflow='';return;}
  if(!o){o=document.createElement('div');o.id='almodal';document.body.appendChild(o);document.body.style.overflow='hidden';}
  const g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete',por=AL_PORC[g][m],O=alOpt(m,i),st=alSt(),eaten=(st[m]||{}).eat===i,un=S.alUnit||'g',X=alMacros(m,i);
  const rows=Object.keys(AL_GI).filter(k=>O.comp[k]).map(k=>{const [ic,nm,u,c]=AL_GI[k],q=alQty(k,O.comp[k],por[k]||(k==='v'?'1 plato':'1'),un);return `<button class="alrow" style="--c:${c}" data-alm="sw" data-k="${k}"><i>${ic}</i><span>${esc(O.comp[k])}${(sw===k)?'':'<small>Toca para cambiar</small>'}</span><em>${esc(q.main)}<small>${esc(q.sub)}</small></em></button>${sw===k?`<div class="alsw" style="--c:${c};--ct:${AL_G[AL_GI[k][4]][2]}">${AL_G[AL_GI[k][4]][4].filter(x=>x[0]!=='+').map(x=>`<button class="${O.comp[k]===x?'on':''}" data-alm="pick" data-k="${k}" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div>`:''}`;}).join('');
  o.innerHTML=`<div class="alsh"><button class="alx" data-alm="close">‹ Volver</button><div class="big">${O.e}</div><h2>${esc(O.n)}</h2>
   <div class="alun"><button class="${un==='g'?'on':''}" data-alb="un" data-v="g">Gramos</button><button class="${un==='p'?'on':''}" data-alb="un" data-v="p">Porciones</button></div>${rows}
   <p style="text-align:center;color:#5A554E;font:600 13px Archivo,sans-serif;margin:4px 0 8px">≈ ${Math.round(X.kc)} kcal · P ${Math.round(X.P)} g · C ${Math.round(X.C)} g · G ${Math.round(X.F)} g</p>
   <button class="aleat${eaten?' on':''}" data-alm="eat">${eaten?'✓ La comí hoy':'Esta es la que como hoy'}</button></div>`;o.dataset.m=m;o.dataset.i=i;o.dataset.sw=sw||'';};
(function(){const v=alView;alView=function(){const h=v.apply(this,arguments),i=h.indexOf('</div>')+6;try{return h.slice(0,i)+alBoard()+h.slice(i);}catch(e){console.warn(e);return h;}};})();


/* ===== Músculos objetivo con dibujo del músculo (SVG propio) ===== */
var PV_BODY='<g fill="#D9D3C8" stroke="#BDB6A8" stroke-width=".8" stroke-linejoin="round"><circle cx="30" cy="10" r="6.5"/><path d="M26.5 16h7v5h-7z"/><path d="M14 23q16-6 32 0l-3 33q-13 5-26 0z"/><path d="M13 24q-6 3-7 17l5 1q1-11 4-16z"/><path d="M47 24q6 3 7 17l-5 1q-1-11-4-16z"/><path d="M6 41l-1 20 5 1 1-20z"/><path d="M54 41l1 20-5 1-1-20z"/><path d="M17 56l11 2-1 47h-8z"/><path d="M43 56l-11 2 1 47h8z"/></g>';
var PV_OV={
 'Pecho':['<path d="M16 26q14-4 14 3v11q-8 4-14-2z"/><path d="M44 26q-14-4-14 3v11q8 4 14-2z"/>',0],
 'Hombros':['<ellipse cx="12.5" cy="27.5" rx="5.2" ry="6.5"/><ellipse cx="47.5" cy="27.5" rx="5.2" ry="6.5"/>',0],
 'Bíceps':['<path d="M7 31q3-4 6-1l-1 12h-6z"/><path d="M53 31q-3-4-6-1l1 12h6z"/>',0],
 'Tríceps':['<path d="M7 31q3-4 6-1l-1 12h-6z"/><path d="M53 31q-3-4-6-1l1 12h6z"/>',1],
 'Abdomen':['<path d="M23 42h14l-1 14q-6 2-12 0z"/>',0],
 'Espalda':['<path d="M16 24q14-5 28 0l-3 22q-11 4-22 0z"/>',1],
 'Glúteos':['<path d="M18 52q12-3 24 0l-1 13q-11 4-22 0z"/>',1],
 'Piernas':['<path d="M18 58l10 2-1 26h-8z"/><path d="M42 58l-10 2 1 26h8z"/>',0]};
function pvMuscle(name,c){const o=PV_OV[name],low=name==='Piernas'||name==='Glúteos',vb=low?'0 46 60 62':'0 1 60 62';
  return `<svg viewBox="${vb}" width="62" height="${low?62:60}" aria-hidden="true">${PV_BODY}${o?`<g fill="${c}" opacity=".95">${o[0]}</g>`:''}</svg>`;}
(function(){const st=document.createElement('style');st.textContent=`.pvmc{display:flex;align-items:center;gap:10px;min-width:172px;padding:8px 14px 8px 8px}.pvmc .pvfig{width:68px;height:64px;flex:0 0 68px;border-radius:10px;background:#EFEDE8;display:flex;align-items:center;justify-content:center;overflow:hidden}.pvmc div:last-child b{display:block;font-size:15px}`;document.head.appendChild(st);})();
(function(){const h0=pvHTML;pvHTML=function(){let h=h0.apply(this,arguments);
  return h.replace(/<div class="pvmc" style="--c:([^"]+)"><b>([^<]+)<\/b><em>([^<]+)<\/em><\/div>/g,(m,c,n,pc)=>`<div class="pvmc" style="--c:${c}"><div class="pvfig">${pvMuscle(n,c)}</div><div><b>${n}</b><em>${pc}</em></div></div>`);};})();


/* ===== Músculos objetivo: imágenes del coach ===== */
var PV_IMG={'Pecho':'pecho','Hombros':'hombros','Bíceps':'biceps','Tríceps':'triceps','Espalda':'espalda','Abdomen':'abdomen','Glúteos':'gluteos','Piernas':'piernas','Trapecio':'trapecio','Gemelos':'gemelos','Isquios':'isquios','Antebrazo':'antebrazo'};
Object.assign(PV_MG,{'Trapecio':'Trapecio','Escápulas':'Trapecio','Gemelos':'Gemelos','Isquiotibiales':'Isquios','Antebrazo':'Antebrazo'});
Object.assign(PV_MC,{'Trapecio':'#7A5BC4','Gemelos':'#2E9D6B','Isquios':'#2E9D6B','Antebrazo':'#C4893B'});
pvMuscle=function(name,c){const f=PV_IMG[name]||'cuerpo';return `<img src="${new URL('mus/'+f+'.png',location.href).href}" alt="${name}" width="60" height="60" style="object-fit:contain;display:block" loading="lazy">`;};
(function(){const st=document.createElement('style');st.textContent=`.pvmc .pvfig{width:70px;height:70px;flex:0 0 70px;background:#F4F2EE;padding:3px}`;document.head.appendChild(st);})();

/* ===== Electrolitos: apartado explicativo ===== */
(function(){
const st=document.createElement('style');st.textContent=`#elmodal{position:fixed;inset:0;z-index:9600;background:rgba(28,27,25,.55);display:flex;align-items:flex-end;justify-content:center}
#elmodal .elsh{background:#EFEDE8;width:100%;max-width:520px;border-radius:20px 20px 0 0;padding:16px 18px 26px;max-height:90vh;overflow-y:auto}
#elmodal h2{font:700 26px Oswald,sans-serif;text-transform:uppercase;margin:4px 0 2px;color:#1C1B19}#elmodal .sub{color:#5A554E;font:500 14px Archivo,sans-serif;margin:0 0 12px}
#elmodal .elc{background:#FBFAF8;border:1px solid #DCD6CC;border-left:5px solid var(--c);border-radius:14px;padding:12px 14px;margin-bottom:10px}
#elmodal .elc h3{margin:0 0 6px;font:700 15px Archivo,sans-serif;color:#1C1B19}#elmodal .elc p,#elmodal .elc li{margin:0;font:500 14px Archivo,sans-serif;color:#3a3732;line-height:1.35}
#elmodal .elc ul{margin:0;padding-left:0;list-style:none;display:grid;gap:6px}#elmodal .elc li b{color:#1C1B19}
#elmodal .elx{border:0;background:none;font:700 14px Archivo,sans-serif;color:#5A554E;padding:4px 0}
.alelinfo{display:block;width:100%;margin-top:6px;border:0;background:none;color:#3C7FA6;font:700 13px Archivo,sans-serif;text-align:left;padding:4px 2px;text-decoration:underline}`;document.head.appendChild(st);
const card=(c,t,b)=>`<div class="elc" style="--c:${c}"><h3>${t}</h3>${b}</div>`;
window.elInfo=function(open){let o=document.getElementById('elmodal');if(!open){if(o)o.remove();document.body.style.overflow='';return;}
 if(o)return;o=document.createElement('div');o.id='elmodal';document.body.appendChild(o);document.body.style.overflow='hidden';
 o.innerHTML=`<div class="elsh"><button class="elx" data-el="close">‹ Volver</button><h2>⚡ Electrolitos</h2><p class="sub">Sales minerales que tu cuerpo usa para hidratarse, mover los músculos y que los nervios funcionen. Los pierdes con el sudor.</p>
 ${card('#3C7FA6','Cómo tomarlos fácil (receta base)','<p><b>1 vaso grande de agua (300–500 ml) + 1 pizca de sal marina + el jugo de ½ limón o naranja.</b> Mézclalo y tómalo en sorbos. Listo en 20 segundos.</p>')}
 ${card('#2E9D6B','Otras opciones','<ul><li>🥥 <b>Agua de coco:</b> natural, aporta potasio. Sabe rico y es fácil.</li><li>📦 <b>Sobres o tabletas de electrolitos</b> (sin azúcar): lo más práctico para llevar al gym o viajar.</li><li>🍌 <b>Desde la comida:</b> banano, papa, aguacate, espinaca y frutos secos aportan potasio y magnesio.</li><li>🧂 <b>Sal en tus comidas</b> si entrenas fuerte y sudas mucho.</li></ul>')}
 ${card('#C7872A','Para qué sirven','<ul><li>💧 Mejor hidratación: el agua se retiene y se usa mejor.</li><li>💪 Menos calambres y mejor sensación en el entreno.</li><li>⚡ Más energía y menos cansancio, sobre todo con calor o sudor.</li><li>🧠 Ayudan a la concentración y a rendir mejor.</li></ul>')}
 ${card('#C0392B','Cuándo y cuánto','<p><b>Ideal: todos los días, 1 vez.</b> Mejor en la mañana o antes/durante el entreno. En días muy fuertes, de mucho sudor o calor, puedes tomar una segunda porción.</p>')}
 <p style="color:#5A554E;font:500 12px Archivo,sans-serif;margin:6px 2px 0">Información general. Si tienes la presión alta, problemas de riñón o corazón, o un tratamiento médico, consulta con tu médico antes de subir la sal o usar suplementos.</p></div>`;};
document.addEventListener('click',e=>{const t=e.target;if(!t.closest)return;if(t.closest('[data-elinfo]')){e.stopPropagation();elInfo(true);return;}
 if(t.id==='elmodal'||t.closest('[data-el="close"]')){e.stopPropagation();elInfo(false);}},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')elInfo(false);});
const ab=alBoard;alBoard=function(){return ab.apply(this,arguments).replace('</span></button></div></div>\n','</span></button><button class="alelinfo" data-elinfo="1">¿Cómo tomarlos? Opciones y beneficios</button></div></div>\n');};
})();

/* ===== Emojis por alimento (reales) + insignia de letra cuando no existe emoji ===== */
var AL_FE={'Huevos':'🥚','Pechuga de pollo':'🍗','Muslo de pollo':'🍗','Carne magra':'🥩','Cerdo magro':'🥩','Pescado':'🐟','Atún':'🐟','Yogurt griego':'🥛','Queso campesino / requesón':'🧀','Proteína whey (en polvo)':'🥤',
 'Arroz':'🍚','Avena':'🥣','Papa':'🥔','Arepa':'🫓','Pan integral':'🍞','Pasta':'🍝','Batata':'🍠','Fríjol / lenteja':'🫘','Granola':'🥣',
 'Aguacate (½)':'🥑','Aceite de oliva':'🫒','Mantequilla de maní':'🥜','Almendras / maní / nueces':'🥜','Semillas (chía, girasol)':'🌱',
 'Banano':'🍌','Manzana':'🍎','Fresas':'🍓','Fresas / arándanos':'🍓','Piña':'🍍','Mango':'🥭','Naranja':'🍊','Uvas / kiwi':'🍇',
 'Espinaca':'🥬','Lechuga':'🥬','Tomate':'🍅','Pepino':'🥒','Brócoli':'🥦','Zanahoria':'🥕','Pimentón':'🫑','Cebolla':'🧅','Champiñones':'🍄','Habichuela':'🫛','Ensalada':'🥗'};
/* Sin emoji propio (queda insignia de letra de color): Yuca, Plátano, Quinua, Papaya, Calabacín */
var AL_SV={"Yuca": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(24 24) rotate(-35) scale(.86) translate(-24 -24)\"><path d=\"M3 24c3-7 14-10 26-8 8 1 13 5 16 8-3 3-8 7-16 8-12 2-23-1-26-8z\" fill=\"#9A6A42\"/><path d=\"M8 20c9-4 19-3 30 1\" stroke=\"#7A4E2D\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M9 28c9 3 19 2 29-2\" stroke=\"#7A4E2D\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/><ellipse cx=\"6\" cy=\"24\" rx=\"3.4\" ry=\"5.4\" fill=\"#F6EBD3\" stroke=\"#D9C7A0\" stroke-width=\"1\"/><circle cx=\"5.5\" cy=\"24\" r=\"1.2\" fill=\"#E2CF9F\"/></g></svg>", "Plátano": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8 14c3 14 14 26 33 24 1 0 1-3 0-3-14-1-22-9-24-22z\" fill=\"#9CC04A\"/><path d=\"M12 12c1-2 4-2 5 0l1 3-6 2z\" fill=\"#6E8B3D\"/><path d=\"M15 17c3 11 11 19 25 20\" stroke=\"#78A035\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M10 20c4 11 13 19 28 19\" stroke=\"#C9D77A\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\" opacity=\".7\"/><path d=\"M40 36l3 1-1 2-3-1z\" fill=\"#5B4A2E\"/><circle cx=\"26\" cy=\"31\" r=\"1\" fill=\"#4F6E25\"/><circle cx=\"31\" cy=\"34\" r=\"1\" fill=\"#4F6E25\"/></svg>", "Quinua": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M6 26h36c0 9-7 16-18 16S6 35 6 26z\" fill=\"#C0392B\"/><path d=\"M6 26h36\" stroke=\"#8E2A20\" stroke-width=\"2\"/><g fill=\"#EBD3A0\" stroke=\"#C9AE74\" stroke-width=\".8\"><ellipse cx=\"12\" cy=\"24\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"17\" cy=\"21\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"22\" cy=\"23\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"27\" cy=\"20.5\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"32\" cy=\"23\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"37\" cy=\"24.5\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"20\" cy=\"18\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"25\" cy=\"16.5\" rx=\"2.6\" ry=\"2\"/><ellipse cx=\"30\" cy=\"17.5\" rx=\"2.6\" ry=\"2\"/></g><g fill=\"#B5523B\"><ellipse cx=\"14.5\" cy=\"22.5\" rx=\"1.6\" ry=\"1.2\"/><ellipse cx=\"29\" cy=\"22\" rx=\"1.6\" ry=\"1.2\"/><ellipse cx=\"23\" cy=\"19.5\" rx=\"1.6\" ry=\"1.2\"/></g></svg>", "Papaya": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M24 5c9 0 17 9 17 21 0 11-7 17-17 17S7 37 7 26C7 14 15 5 24 5z\" fill=\"#F4A340\"/><path d=\"M24 11c6 0 11 7 11 15 0 8-5 13-11 13s-11-5-11-13c0-8 5-15 11-15z\" fill=\"#EE7B3A\"/><g fill=\"#2B2420\"><ellipse cx=\"24\" cy=\"21\" rx=\"1.8\" ry=\"2.4\"/><ellipse cx=\"20\" cy=\"26\" rx=\"1.8\" ry=\"2.4\"/><ellipse cx=\"28\" cy=\"26\" rx=\"1.8\" ry=\"2.4\"/><ellipse cx=\"22\" cy=\"32\" rx=\"1.8\" ry=\"2.4\"/><ellipse cx=\"26\" cy=\"32\" rx=\"1.8\" ry=\"2.4\"/></g><path d=\"M24 5c1-2 3-3 5-3\" stroke=\"#6E8B3D\" stroke-width=\"2.4\" fill=\"none\" stroke-linecap=\"round\"/></svg>", "Calabacín": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"translate(24 24) rotate(-38) scale(.74) translate(-24 -24)\"><path d=\"M3 20c0-3 3-4 7-4h26c4 0 8 2 8 8s-4 8-8 8H10c-4 0-7-1-7-4z\" fill=\"#4E9A4B\"/><path d=\"M8 18h30M8 30h30\" stroke=\"#8FCB7E\" stroke-width=\"1.6\" stroke-linecap=\"round\"/><path d=\"M8 24h31\" stroke=\"#8FCB7E\" stroke-width=\"1.2\" stroke-linecap=\"round\" opacity=\".7\"/><path d=\"M42 18l5-1v3l-5 1z\" fill=\"#2F6B35\"/><path d=\"M3 20c-1 2-1 6 0 8\" stroke=\"#2F6B35\" stroke-width=\"2.5\" fill=\"none\" stroke-linecap=\"round\"/></g></svg>"};
function alFeIcon(food,k){const e=AL_FE[food]||AL_SV[food];if(e)return e;const c=(AL_GI[k]||[])[3]||'#5A554E';return `<b class="alfb" style="background:${c}">${esc(String(food||'?').trim().charAt(0).toUpperCase())}</b>`;}
(function(){const st=document.createElement('style');st.textContent=`.alsv{width:1em;height:1em;vertical-align:-.14em}.alsw button .alsv{width:20px;height:20px}.alrow i .alsv{width:30px;height:30px}.alc .e .alsv{width:1em;height:1em}.alfb{display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;color:#fff;font:700 14px Oswald,Archivo,sans-serif;font-style:normal}.alsw button{display:inline-flex;align-items:center;gap:5px}.alsw button .alfb{width:18px;height:18px;font-size:11px;flex:0 0 18px}`;document.head.appendChild(st);})();
(function(){const o=alOpt;alOpt=function(m,i){const r=o.apply(this,arguments);const a=[];['p','c','v','fr','f'].forEach(k=>{const x=AL_FE[r.comp[k]]||AL_SV[r.comp[k]];if(x&&a.indexOf(x)<0&&a.length<3)a.push(x);});if(a.length)r.e=a.join('');return r;};})();
alDay=function(){const st=alSt();
  return `<section class="ald">`+AL_M.map(([k,n,ic])=>{const ch=(st[k]||{}).eat;
   return `<div class="alh"><b>${ic} ${n}</b>${ch!=null?'<em>✓ Ya elegiste</em>':k==='m'?'<small style="color:#5A554E">opcional</small>':''}</div><div class="alrail">${AL_O[k].map((o,i)=>{const O=alOpt(k,i);return `<button class="alc${ch===i?' on':''}" data-alm="open" data-m="${k}" data-i="${i}"><div class="e">${O.e}</div><b>${esc(O.n)}</b></button>`;}).join('')}</div>`;}).join('')+`</section>`;};
(function(){const f=alModal;alModal=function(m,i,sw){f.apply(this,arguments);if(m==null)return;const o=document.getElementById('almodal');if(!o)return;const O=alOpt(m,i);
  o.querySelectorAll('.alrow[data-k]').forEach(b=>{const k=b.dataset.k,ic=b.querySelector('i');if(ic)ic.innerHTML=alFeIcon(O.comp[k],k);});
  o.querySelectorAll('.alsw button[data-v]').forEach(b=>{const k=b.dataset.k;b.innerHTML=alFeIcon(b.dataset.v,k).replace(/^(<b)/,'$1')+' '+b.innerHTML;});};})();

/* iconos propios 2: reemplazan emojis aproximados */
Object.assign(AL_SV,{"Cerdo magro": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 20c0-8 8-13 17-12 9 1 14 8 13 16-1 9-9 15-18 15-8 0-12-8-12-19z\" fill=\"#F2A7A0\"/><path d=\"M12 22c0-6 6-10 14-9 7 1 11 6 10 13-1 7-7 11-14 11-7 0-10-6-10-15z\" fill=\"#F7C4BE\"/><ellipse cx=\"32\" cy=\"22\" rx=\"5\" ry=\"5.5\" fill=\"#FBFAF8\" stroke=\"#E6B0AA\" stroke-width=\"1.5\"/><ellipse cx=\"32\" cy=\"22\" rx=\"1.8\" ry=\"2\" fill=\"#E6B0AA\"/><path d=\"M15 30c3 3 7 4 11 3\" stroke=\"#E6B0AA\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></svg>", "Atún": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"24\" cy=\"32\" rx=\"17\" ry=\"9\" fill=\"#8FA7B5\"/><path d=\"M7 32v-6c0-5 8-9 17-9s17 4 17 9v6c0 5-8 9-17 9S7 37 7 32z\" fill=\"#C9D5DC\"/><ellipse cx=\"24\" cy=\"26\" rx=\"17\" ry=\"9\" fill=\"#E9EFF2\" stroke=\"#8FA7B5\" stroke-width=\"1.6\"/><ellipse cx=\"24\" cy=\"26\" rx=\"12\" ry=\"5.5\" fill=\"#E8A7A0\"/><path d=\"M15 26c4-2 9-2 18 0\" stroke=\"#D4837B\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M28 14c3-5 8-6 12-4-1 3-4 5-8 6z\" fill=\"#E4B53C\" stroke=\"#C99A28\" stroke-width=\"1.2\"/></svg>", "Granola": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 25h38c0 10-8 18-19 18S5 35 5 25z\" fill=\"#6E8B3D\"/><g fill=\"#D9A55A\" stroke=\"#B07F3A\" stroke-width=\"1\"><rect x=\"9\" y=\"19\" width=\"9\" height=\"6.5\" rx=\"2.4\" transform=\"rotate(-12 13 22)\"/><rect x=\"19\" y=\"16\" width=\"10\" height=\"7\" rx=\"2.6\" transform=\"rotate(8 24 19)\"/><rect x=\"29\" y=\"19\" width=\"9\" height=\"6.5\" rx=\"2.4\" transform=\"rotate(14 33 22)\"/><rect x=\"16\" y=\"11\" width=\"9\" height=\"6\" rx=\"2.2\" transform=\"rotate(-6 20 14)\"/><rect x=\"25\" y=\"10.5\" width=\"9\" height=\"6\" rx=\"2.2\" transform=\"rotate(10 29 13)\"/></g><circle cx=\"22\" cy=\"21\" r=\"1.8\" fill=\"#B23E6E\"/><circle cx=\"35\" cy=\"17\" r=\"1.6\" fill=\"#B23E6E\"/><circle cx=\"12\" cy=\"17\" r=\"1.6\" fill=\"#B23E6E\"/></svg>", "Semillas (chía, girasol)": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"rotate(-25 17 20)\"><path d=\"M17 6c6 4 8 16 0 28-8-12-6-24 0-28z\" fill=\"#3B3632\"/><path d=\"M17 11c3 4 3 12 0 19\" stroke=\"#E8E1D4\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(30 31 25)\"><path d=\"M31 11c6 4 8 16 0 28-8-12-6-24 0-28z\" fill=\"#4A433C\"/><path d=\"M31 16c3 4 3 12 0 19\" stroke=\"#E8E1D4\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g fill=\"#2B2724\"><ellipse cx=\"10\" cy=\"38\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"16\" cy=\"42\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"38\" cy=\"40\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"25\" cy=\"40\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"42\" cy=\"34\" rx=\"2\" ry=\"1.4\"/></g></svg>", "Fresas / arándanos": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"16\" cy=\"29\" r=\"10\" fill=\"#4A5FA8\"/><circle cx=\"32\" cy=\"29\" r=\"10\" fill=\"#5A6FBA\"/><circle cx=\"24\" cy=\"16\" r=\"10\" fill=\"#3F5399\"/><g fill=\"#2D3A75\"><path d=\"M16 26l2.4 3-2.4 3-2.4-3z\"/><path d=\"M32 26l2.4 3-2.4 3-2.4-3z\"/><path d=\"M24 13l2.4 3-2.4 3-2.4-3z\"/></g><g fill=\"#fff\" opacity=\".35\"><ellipse cx=\"11\" cy=\"25\" rx=\"2.4\" ry=\"1.6\"/><ellipse cx=\"27\" cy=\"25\" rx=\"2.4\" ry=\"1.6\"/><ellipse cx=\"19\" cy=\"12\" rx=\"2.4\" ry=\"1.6\"/></g></svg>", "Uvas / kiwi": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"24\" cy=\"25\" r=\"19\" fill=\"#7A5A2E\"/><circle cx=\"24\" cy=\"25\" r=\"16.5\" fill=\"#9ACD4A\"/><circle cx=\"24\" cy=\"25\" r=\"11\" fill=\"#7DB93A\"/><circle cx=\"24\" cy=\"25\" r=\"4.2\" fill=\"#F3F0D0\"/><g stroke=\"#F3F0D0\" stroke-width=\"1.6\" stroke-linecap=\"round\"><path d=\"M24 20.5V12\"/><path d=\"M24 29.5V38\"/><path d=\"M19.5 25H11\"/><path d=\"M28.5 25H37\"/><path d=\"M20.8 21.8l-6-6\"/><path d=\"M27.2 28.2l6 6\"/><path d=\"M27.2 21.8l6-6\"/><path d=\"M20.8 28.2l-6 6\"/></g><g fill=\"#2B2420\"><circle cx=\"24\" cy=\"17.5\" r=\"1\"/><circle cx=\"24\" cy=\"32.5\" r=\"1\"/><circle cx=\"16.5\" cy=\"25\" r=\"1\"/><circle cx=\"31.5\" cy=\"25\" r=\"1\"/></g></svg>", "Almendras / maní / nueces": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 22c0-8 6-14 14-14s14 6 14 14-6 14-14 14S5 30 5 22z\" fill=\"#C98F4E\"/><path d=\"M19 8v28\" stroke=\"#9C6A32\" stroke-width=\"2\"/><path d=\"M8 18c4 3 7 3 11 0M8 27c4-3 7-3 11 0M19 18c4 3 7 3 11 0M19 27c4-3 7-3 11 0\" stroke=\"#9C6A32\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M36 17c5 5 6 14 1 23-7-2-11-10-8-17 2-3 4-5 7-6z\" fill=\"#B67B45\"/><path d=\"M36 20c3 5 3 12 0 17\" stroke=\"#E2B77E\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"/></svg>", "Lechuga": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M24 44c-10 0-18-8-18-18C6 14 14 6 24 6s18 8 18 20c0 10-8 18-18 18z\" fill=\"#8FCB5A\"/><path d=\"M24 44c-6 0-10-8-10-18 0-9 4-16 10-20 6 4 10 11 10 20 0 10-4 18-10 18z\" fill=\"#B9E07E\"/><path d=\"M24 8v34\" stroke=\"#6BA43A\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M24 20c-4-2-6-5-7-8M24 28c-5-2-8-5-9-9M24 20c4-2 6-5 7-8M24 28c5-2 8-5 9-9\" stroke=\"#6BA43A\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\"/></svg>"});
Object.keys({"Cerdo magro": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M9 20c0-8 8-13 17-12 9 1 14 8 13 16-1 9-9 15-18 15-8 0-12-8-12-19z\" fill=\"#F2A7A0\"/><path d=\"M12 22c0-6 6-10 14-9 7 1 11 6 10 13-1 7-7 11-14 11-7 0-10-6-10-15z\" fill=\"#F7C4BE\"/><ellipse cx=\"32\" cy=\"22\" rx=\"5\" ry=\"5.5\" fill=\"#FBFAF8\" stroke=\"#E6B0AA\" stroke-width=\"1.5\"/><ellipse cx=\"32\" cy=\"22\" rx=\"1.8\" ry=\"2\" fill=\"#E6B0AA\"/><path d=\"M15 30c3 3 7 4 11 3\" stroke=\"#E6B0AA\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\"/></svg>", "Atún": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"24\" cy=\"32\" rx=\"17\" ry=\"9\" fill=\"#8FA7B5\"/><path d=\"M7 32v-6c0-5 8-9 17-9s17 4 17 9v6c0 5-8 9-17 9S7 37 7 32z\" fill=\"#C9D5DC\"/><ellipse cx=\"24\" cy=\"26\" rx=\"17\" ry=\"9\" fill=\"#E9EFF2\" stroke=\"#8FA7B5\" stroke-width=\"1.6\"/><ellipse cx=\"24\" cy=\"26\" rx=\"12\" ry=\"5.5\" fill=\"#E8A7A0\"/><path d=\"M15 26c4-2 9-2 18 0\" stroke=\"#D4837B\" stroke-width=\"1.3\" fill=\"none\"/><path d=\"M28 14c3-5 8-6 12-4-1 3-4 5-8 6z\" fill=\"#E4B53C\" stroke=\"#C99A28\" stroke-width=\"1.2\"/></svg>", "Granola": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 25h38c0 10-8 18-19 18S5 35 5 25z\" fill=\"#6E8B3D\"/><g fill=\"#D9A55A\" stroke=\"#B07F3A\" stroke-width=\"1\"><rect x=\"9\" y=\"19\" width=\"9\" height=\"6.5\" rx=\"2.4\" transform=\"rotate(-12 13 22)\"/><rect x=\"19\" y=\"16\" width=\"10\" height=\"7\" rx=\"2.6\" transform=\"rotate(8 24 19)\"/><rect x=\"29\" y=\"19\" width=\"9\" height=\"6.5\" rx=\"2.4\" transform=\"rotate(14 33 22)\"/><rect x=\"16\" y=\"11\" width=\"9\" height=\"6\" rx=\"2.2\" transform=\"rotate(-6 20 14)\"/><rect x=\"25\" y=\"10.5\" width=\"9\" height=\"6\" rx=\"2.2\" transform=\"rotate(10 29 13)\"/></g><circle cx=\"22\" cy=\"21\" r=\"1.8\" fill=\"#B23E6E\"/><circle cx=\"35\" cy=\"17\" r=\"1.6\" fill=\"#B23E6E\"/><circle cx=\"12\" cy=\"17\" r=\"1.6\" fill=\"#B23E6E\"/></svg>", "Semillas (chía, girasol)": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><g transform=\"rotate(-25 17 20)\"><path d=\"M17 6c6 4 8 16 0 28-8-12-6-24 0-28z\" fill=\"#3B3632\"/><path d=\"M17 11c3 4 3 12 0 19\" stroke=\"#E8E1D4\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g transform=\"rotate(30 31 25)\"><path d=\"M31 11c6 4 8 16 0 28-8-12-6-24 0-28z\" fill=\"#4A433C\"/><path d=\"M31 16c3 4 3 12 0 19\" stroke=\"#E8E1D4\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></g><g fill=\"#2B2724\"><ellipse cx=\"10\" cy=\"38\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"16\" cy=\"42\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"38\" cy=\"40\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"25\" cy=\"40\" rx=\"2\" ry=\"1.4\"/><ellipse cx=\"42\" cy=\"34\" rx=\"2\" ry=\"1.4\"/></g></svg>", "Fresas / arándanos": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"16\" cy=\"29\" r=\"10\" fill=\"#4A5FA8\"/><circle cx=\"32\" cy=\"29\" r=\"10\" fill=\"#5A6FBA\"/><circle cx=\"24\" cy=\"16\" r=\"10\" fill=\"#3F5399\"/><g fill=\"#2D3A75\"><path d=\"M16 26l2.4 3-2.4 3-2.4-3z\"/><path d=\"M32 26l2.4 3-2.4 3-2.4-3z\"/><path d=\"M24 13l2.4 3-2.4 3-2.4-3z\"/></g><g fill=\"#fff\" opacity=\".35\"><ellipse cx=\"11\" cy=\"25\" rx=\"2.4\" ry=\"1.6\"/><ellipse cx=\"27\" cy=\"25\" rx=\"2.4\" ry=\"1.6\"/><ellipse cx=\"19\" cy=\"12\" rx=\"2.4\" ry=\"1.6\"/></g></svg>", "Uvas / kiwi": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"24\" cy=\"25\" r=\"19\" fill=\"#7A5A2E\"/><circle cx=\"24\" cy=\"25\" r=\"16.5\" fill=\"#9ACD4A\"/><circle cx=\"24\" cy=\"25\" r=\"11\" fill=\"#7DB93A\"/><circle cx=\"24\" cy=\"25\" r=\"4.2\" fill=\"#F3F0D0\"/><g stroke=\"#F3F0D0\" stroke-width=\"1.6\" stroke-linecap=\"round\"><path d=\"M24 20.5V12\"/><path d=\"M24 29.5V38\"/><path d=\"M19.5 25H11\"/><path d=\"M28.5 25H37\"/><path d=\"M20.8 21.8l-6-6\"/><path d=\"M27.2 28.2l6 6\"/><path d=\"M27.2 21.8l6-6\"/><path d=\"M20.8 28.2l-6 6\"/></g><g fill=\"#2B2420\"><circle cx=\"24\" cy=\"17.5\" r=\"1\"/><circle cx=\"24\" cy=\"32.5\" r=\"1\"/><circle cx=\"16.5\" cy=\"25\" r=\"1\"/><circle cx=\"31.5\" cy=\"25\" r=\"1\"/></g></svg>", "Almendras / maní / nueces": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 22c0-8 6-14 14-14s14 6 14 14-6 14-14 14S5 30 5 22z\" fill=\"#C98F4E\"/><path d=\"M19 8v28\" stroke=\"#9C6A32\" stroke-width=\"2\"/><path d=\"M8 18c4 3 7 3 11 0M8 27c4-3 7-3 11 0M19 18c4 3 7 3 11 0M19 27c4-3 7-3 11 0\" stroke=\"#9C6A32\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M36 17c5 5 6 14 1 23-7-2-11-10-8-17 2-3 4-5 7-6z\" fill=\"#B67B45\"/><path d=\"M36 20c3 5 3 12 0 17\" stroke=\"#E2B77E\" stroke-width=\"1.4\" fill=\"none\" stroke-linecap=\"round\"/></svg>", "Lechuga": "<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M24 44c-10 0-18-8-18-18C6 14 14 6 24 6s18 8 18 20c0 10-8 18-18 18z\" fill=\"#8FCB5A\"/><path d=\"M24 44c-6 0-10-8-10-18 0-9 4-16 10-20 6 4 10 11 10 20 0 10-4 18-10 18z\" fill=\"#B9E07E\"/><path d=\"M24 8v34\" stroke=\"#6BA43A\" stroke-width=\"2\" stroke-linecap=\"round\"/><path d=\"M24 20c-4-2-6-5-7-8M24 28c-5-2-8-5-9-9M24 20c4-2 6-5 7-8M24 28c5-2 8-5 9-9\" stroke=\"#6BA43A\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\"/></svg>"}).forEach(k=>{delete AL_FE[k];});


/* ===== Recetas con proteína whey + más batidos (21 nov) ===== */
(function(){
const R=(r,e)=>({r:r,e:e});
AL_O.d[4][3]=R('Licúa 1 scoop de whey con la avena, el banano, la mantequilla de maní y 250–300 ml de agua o leche. Toma de una.');
AL_O.m[3][3]=R('Licúa el whey con el banano, hielo y 250 ml de agua o leche. Listo en 1 minuto.');
AL_O.d.push(['Panqueques proteicos',null,{p:'Proteína whey (en polvo)',c:'Avena',fr:'Banano'},R('Licúa la avena, el banano maduro y el whey con un chorrito de agua hasta que quede una masa espesa. Cocina en sartén antiadherente 2 min por lado. Sirve con fruta o un toque de mantequilla de maní.','🥞🍌')]);
AL_O.d.push(['Avena proteica de nevera',null,{p:'Proteína whey (en polvo)',c:'Avena',fr:'Fresas',f:'Semillas (chía, girasol)'},R('En un frasco mezcla la avena, el whey y las semillas con agua, leche o yogurt (que cubra). Déjalo en la nevera toda la noche. En la mañana, añade las fresas y a comer.','🥣🍓')]);
AL_O.m.push(['Batido de chocolate y maní',null,{p:'Proteína whey (en polvo)',f:'Mantequilla de maní',fr:'Banano'},R('Licúa whey de chocolate (o con 1 cda de cacao), la mantequilla de maní, el banano y hielo con 250 ml de agua o leche.','🥤🍫🥜')]);
AL_O.m.push(['Helado proteico',null,{p:'Proteína whey (en polvo)',fr:'Banano'},R('Congela el banano en rodajas. Licúalo con el whey y solo un chorrito de leche hasta que quede cremoso, como helado. Cómelo con cuchara.','🍦🍌')]);
AL_O.m.push(['Pudín de chía y proteína',null,{p:'Proteína whey (en polvo)',f:'Semillas (chía, girasol)',fr:'Fresas'},R('Mezcla el whey con las semillas de chía y 200 ml de leche o agua. Reposa 2 horas en la nevera (mejor de un día para otro). Remata con fresas.','🍮🍓')]);
AL_O.m.push(['Mug cake de proteína',null,{p:'Proteína whey (en polvo)',c:'Avena',fr:'Banano'},R('En una taza mezcla el whey, la avena, medio banano aplastado y un chorrito de agua. Microondas 1½–2 min. Come con el resto del banano en rodajas.','🧁🍌')]);
const f=alOpt;alOpt=function(m,i){const r=f.apply(this,arguments),x=AL_O[m][i][3];if(x){r.recipe=x.r;if(x.e)r.e=x.e;}return r;};
const g=alModal;alModal=function(m,i,sw){g.apply(this,arguments);if(m==null)return;const o=document.getElementById('almodal'),O=alOpt(m,i);if(!o||!O.recipe)return;const b=o.querySelector('.aleat');if(!b)return;const d=document.createElement('div');d.className='alrec';d.innerHTML='<b>🥄 Cómo prepararlo</b><p>'+esc(O.recipe)+'</p><small>Usa las cantidades de arriba.</small>';b.parentNode.insertBefore(d,b);};
const st=document.createElement('style');st.textContent='.alrec{background:#FBFAF8;border:1px solid #DCD6CC;border-left:5px solid #3C7FA6;border-radius:12px;padding:10px 12px;margin:4px 0 8px}.alrec b{font:700 14px Archivo,sans-serif}.alrec p{margin:4px 0 2px;font:500 14px Archivo,sans-serif;color:#3a3732;line-height:1.35}.alrec small{color:#5A554E;font:500 12px Archivo,sans-serif}';document.head.appendChild(st);
})();

/* pechuga con icono propio (distinta del muslo 🍗) */
AL_SV['Pechuga de pollo']="<svg class=\"alsv\" viewBox=\"0 0 48 48\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M4 31c-1-9 6-18 17-21 9-2 19 0 23 6 1 2-1 4-4 5-4 2-6 6-10 11-5 6-14 8-21 5-3-1-5-3-5-6z\" fill=\"#D99A52\"/><path d=\"M8 30c-1-7 5-14 14-16 8-2 15-1 19 3-3 1-5 4-8 8-4 6-12 8-19 6-3-1-5-1-6-1z\" fill=\"#F0C98A\"/><g stroke=\"#B27432\" stroke-width=\"2.6\" stroke-linecap=\"round\"><path d=\"M15 21l7 9\"/><path d=\"M22 17l8 10\"/><path d=\"M30 15l5 7\"/></g><path d=\"M10 35c4 3 11 3 16 0\" stroke=\"#F7E3BC\" stroke-width=\"1.6\" fill=\"none\" stroke-linecap=\"round\" opacity=\".8\"/></svg>";delete AL_FE['Pechuga de pollo'];


/* ===== Mi guía simplificada (21 nov): plato + porciones con la mano + 3 consejos ===== */
alGuide=function(){const P=alPlan(),tot=P.plate.reduce((a,x)=>a+x[2],0);let acc=0;
  const grad=P.plate.map(x=>{const a=acc/tot*100;acc+=x[2];return x[3]+' '+a+'% '+(acc/tot*100)+'%';}).join(',');
  return `<section class="al">
   <h3>Tu plato</h3><div class="alcard alplate"><div class="aldonut" style="background:conic-gradient(${grad})"></div><div class="allg">${P.plate.map(x=>`<div><i style="background:${x[3]}"></i><span><b>${x[0]}</b></span><em>${x[2]}%</em></div>`).join('')}</div></div>
   <h3>Cuánto comer · sin pesar</h3><div class="alhm"><div style="--c:#C0392B"><b>🖐 Proteína</b><span>1 <strong>palma</strong></span></div><div style="--c:#C7872A"><b>🥣 Carbo</b><span>1 <strong>pocillo</strong></span></div><div style="--c:#6E8B3D"><b>🥄 Grasa</b><span>1 <strong>cucharada</strong></span></div><div style="--c:#2F8E57"><b>🥬 Vegetales</b><span><strong>Libres</strong></span></div></div>
   <div class="alrule">${esc(P.rule)}</div>
   <div class="alcard" style="padding:12px 14px;font-size:14px;line-height:1.6"><b>3 consejos</b><br>🍳 Cocina en tanda: arroz + proteína para 2–3 días.<br>🍽️ Arma el plato: palma + pocillo + vegetal + cucharada.<br>⭐ Pocas opciones que te gusten, mejor que variar por variar.</div></section>`;};
(function(){const v=alView;alView=function(){return v.apply(this,arguments).replace('Mi guía: plato, porciones y banco de alimentos','Mi guía: plato y porciones');};})();

/* Mi guía retirada de la vista (21 nov, decisión del coach). El código de alGuide queda guardado por si se retoma. */
(function(){const v=alView;alView=function(){const h=v.apply(this,arguments);const i=h.indexOf('<div class="alcard" style="margin-top:6px"><button class="alsum" data-alm="tg" data-k="guide">');return i<0?h:h.slice(0,i);};})();


/* ===== Exportar datos del cliente (texto para pegar en una IA) ===== */
var EXM=null;
function exF(iso){if(!iso)return '';const p=String(iso).slice(0,10).split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:String(iso);}
async function exLoad(cid){
  const d=(CP.d&&CP.cid===cid&&CP.d.profile)?CP.d:await DB.clientDetail(cid);
  const [meas,chk,rt]=await Promise.all([DB.measuresOf(cid).catch(()=>[]),DB.checkinsAll().catch(()=>[]),(CP.routine&&CP.cid===cid)?Promise.resolve(CP.routine):DB.routine(cid).catch(()=>null)]);
  return {d,meas,chk:(chk||[]).filter(x=>x.client_id===cid).slice(0,3),rt};
}
function exBuild(R,o){
  const d=R.d,p=d.profile||{},dt=d.data||{},u=(dt.user&&dt.user.data)||{},L=[],sec=(t)=>{L.push('','## '+t)},sd=v=>(v===undefined||v===null||v===''||(Array.isArray(v)&&!v.length))?'Sin dato':(Array.isArray(v)?v.join(', '):String(v));
  const age=p.birth_date?Math.floor((Date.now()-new Date(p.birth_date))/31557600000):null;
  const ws=(d.weights||[]),wNow=ws.length?ws[ws.length-1].kg:(p.start_weight_kg||u.weight);
  const DL=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'],GNm={bajar:'Bajar peso',complete:'Complete (recomposición)',aumentar:'Aumentar (superávit)',salud:'Salud'};
  L.push('Datos de un cliente de ERRE Complete (Método Complete). Úsalos para sugerir un plan; no diagnostiques. Marca todo lo que requiera criterio del coach o del médico.');
  L.push('Generado: '+exF(new Date().toISOString())+(o.health?'  |  ⚠ Contiene datos de salud. Pégalo solo en una herramienta que tengas aprobada.':''));
  L.push('','# Cliente'+(o.name?': '+(p.full_name||'Sin nombre'):''));
  sec('Perfil');
  [['Edad',age!=null?age+' años':null],['Sexo',u.sex||p.sex],['Estatura',(p.height_cm||u.height)?(p.height_cm||u.height)+' cm':null],['Peso actual',wNow?(+wNow).toFixed(1)+' kg':null],['Plan',p.plan],['Objetivo',GNm[p.goal]||p.goal],['Nivel',p.level],['Días de entreno',(p.train_days||[]).map(i=>DL[i]).join(', ')],['Tiempo por sesión',u.session?u.session+' min':null],['Horario preferido',u.time]].forEach(r=>L.push('- '+r[0]+': '+sd(r[1])));
  if(o.health){sec('Salud (tal como lo escribió el cliente)');
    L.push('- Molestias o lesiones: '+sd(p.injuries||(u.pain==='Sí'?u.painTxt:(u.pain==='No'?'Ninguna':''))));
    L.push('- Cirugías o condiciones médicas: '+sd(u.medical));
    L.push('- Sueño promedio: '+sd(u.sleep)+' | Estrés: '+sd(u.stress));
    L.push('- Comidas al día: '+sd(u.meals)+' | Restricciones o alergias: '+sd(u.diet));
    const fb=(d.fb||[]).filter(f=>/olest|dolor/i.test((f.feel||'')+' '+(f.note||'')));
    sec('Molestias reportadas en sesiones');
    if(!fb.length)L.push('- Sin dato');else fb.slice(0,8).forEach(f=>L.push('- '+exF(f.log_date)+' ('+(f.grp||'sesión')+'): '+sd(f.feel)+(f.note?' — '+f.note:'')));}
  const days=(R.rt&&R.rt.days)||[],exName=id=>(typeof E!=='undefined'&&E[id]&&E[id].n)||id;
  if(o.strength){sec('Fuerza (últimas 6 sesiones por ejercicio, series reps×kg)');
    const logs=dt.logs||{},sw=dt.swaps||{},map={};
    Object.keys(logs).forEach(k=>{const [date,did,bk,ix]=k.split('|'),day=days.find(x=>x.id===did);if(!day||bk==='warm'||bk==='calm')return;const blk=(day.blocks||[]).find(b=>b.k===bk),it=blk&&blk.items&&blk.items[+ix];if(!it)return;
      const sets=(Array.isArray(logs[k])?logs[k]:[]).filter(s=>s&&(s.kg>0||s.reps>0)&&(s.done||s.kg>0||s.reps>0));if(!sets.length)return;
      const nm=exName(sw[k]||it.ex);(map[nm]=map[nm]||[]).push({date,txt:sets.map(s=>(s.reps||'?')+'×'+(s.kg||0)).join(', '),rpe:(sets.map(s=>s.rpe).filter(Boolean).pop()||''),best:Math.max.apply(null,sets.map(s=>+s.kg||0))});});
    const names=Object.keys(map);
    if(!names.length)L.push('- Sin dato');
    names.forEach(nm=>{const r=map[nm].sort((a,b)=>a.date<b.date?1:-1),best=Math.max.apply(null,r.map(x=>x.best));L.push('- '+nm+(best?' (mejor: '+best+' kg)':'')+': '+r.slice(0,6).map(x=>exF(x.date)+' '+x.txt+(x.rpe?' RPE'+x.rpe:'')).join(' | '));});}
  if(o.track){sec('Seguimiento');
    const fbk=Object.keys(dt.fb||{}),cut=new Date(Date.now()-28*864e5).toISOString().slice(0,10),n28=fbk.filter(k=>k.slice(0,10)>=cut).length,ints=(d.fb||[]).map(f=>+f.intensity).filter(Boolean),avg=ints.length?(ints.reduce((a,b)=>a+b,0)/ints.length).toFixed(1):null;
    L.push('- Entrenamientos finalizados en los últimos 28 días: '+n28);
    L.push('- Intensidad percibida promedio (últimos registros): '+sd(avg));
    L.push('- Último peso registrado: '+(ws.length?exF(ws[ws.length-1].log_date)+' · '+(+ws[ws.length-1].kg).toFixed(1)+' kg':'Sin dato'));
    L.push('- Chequeo quincenal (últimos 3):'+(R.chk.length?'':' Sin dato'));
    R.chk.forEach(c=>{const kv=c.data&&typeof c.data==='object'?Object.keys(c.data).map(k=>k+': '+(typeof c.data[k]==='object'?JSON.stringify(c.data[k]):c.data[k])).join('; '):'';L.push('  · '+exF(c.created_at)+(kv?' — '+kv:'')+(c.comment?' | Comentario: '+c.comment:''));});}
  if(o.meas){sec('Medidas');const ms=(R.meas||[]).slice(-2).reverse();
    if(!ms.length)L.push('- Sin dato');
    ms.forEach((m,i)=>{const dd=m.data||{},lab={};try{MED_F.forEach(g=>g[1].forEach(f=>lab[f[0]]=f[1]+(f[2]?' ('+f[2]+')':'')));}catch(e){}L.push('- '+(i?'Medición anterior':'Última medición')+' ('+exF(m.date)+'): '+(Object.keys(dd).filter(k=>dd[k]!==''&&dd[k]!=null).map(k=>(lab[k]||k)+' '+dd[k]).join('; ')||'Sin dato'));});
    L.push('- Peso en el tiempo (últimas 8): '+(ws.length?ws.slice(-8).map(w=>exF(w.log_date)+' '+(+w.kg).toFixed(1)).join(' | '):'Sin dato'));}
  if(o.prog){sec('Programa actual');
    if(!days.length)L.push('- Sin dato');else{
      let prog='complete';try{prog=planOf(p);}catch(e){}const P=(typeof PERIOD!=='undefined'&&(PERIOD[prog]||PERIOD.complete))||null,st=(dt.prefs&&dt.prefs.start)||null;
      let wk=1;if(st&&P){wk=Math.min(P.weeks,Math.max(1,Math.floor((Date.now()-new Date(st))/6048e5)+1));}
      L.push('- Nombre: '+sd(R.rt&&R.rt.name)+' | Semana del mesociclo: '+(P?wk+' de '+P.weeks:'Sin dato'));
      days.forEach(day=>{if(day.x)return;L.push('- '+(day.label||'Día')+(day.name?' — '+day.name:'')+':');
        (day.blocks||[]).forEach(b=>{if(b.cardio){L.push('    · Cardio');return;}(b.items||[]).forEach(it=>{let sr='';if(it.fixed)sr=it.fixed.sets+'×'+it.fixed.reps;else if(P&&(it.kind==='basic'||it.kind==='acc')){const q=P[it.kind==='basic'?'basic':'acc'];sr=q.sets[wk-1]+'×'+q.reps[wk-1];}
          L.push('    · ['+(b.t||b.k)+'] '+exName(it.ex)+(sr?' '+sr:'')+(it.rir?' RIR '+it.rir:''));});});});}}
  return L.join('\n');
}
function exModal(){let o=document.getElementById('exm');if(!EXM){if(o)o.remove();return;}
  if(!o){o=document.createElement('div');o.id='exm';o.className='cpdv';document.body.appendChild(o);}
  const m=EXM,opt=[['health','Salud'],['strength','Fuerza'],['track','Seguimiento'],['meas','Medidas'],['prog','Programa']];
  if(m.loading){o.innerHTML='<div class="cpdc" style="max-width:560px"><div class="cpdhd"><div><b>Exportar datos del cliente</b><small>Preparando…</small></div><button class="cpdx" data-act="exclose" aria-label="Cerrar">✕</button></div><div class="note">Cargando datos…</div></div>';return;}
  const txt=m.err?'':exBuild(m.R,m.o);m.txt=txt;
  o.innerHTML=`<div class="cpdc" style="max-width:560px"><div class="cpdhd"><div><b>Exportar datos del cliente</b><small>Revísalo antes de pegarlo en una IA</small></div><button class="cpdx" data-act="exclose" aria-label="Cerrar">✕</button></div><div class="cpmvb">
   <label class="pfl">Qué incluir</label><div class="chips">${opt.map(([k,n])=>`<button class="chip${m.o[k]?' on':''}" data-act="exopt" data-v="${k}">${n}</button>`).join('')}<button class="chip${m.o.name?' on':''}" data-act="exopt" data-v="name">Incluir nombre</button></div>
   ${m.o.health?'<div class="note" style="margin:8px 0;color:#B87400">Contiene datos de salud. Pégalo solo en una herramienta que tengas aprobada. Nunca incluye correo, teléfono ni fotos.</div>':''}
   ${m.err?'<div class="note">No se pudieron cargar los datos del cliente.</div>':`<textarea id="exTxt" readonly style="width:100%;height:46vh;font:12px/1.45 ui-monospace,Menlo,monospace;border:1px solid #DCD6CC;border-radius:10px;padding:10px;background:#FBFAF8;color:#1C1B19;resize:vertical">${esc(txt)}</textarea>
   <div style="display:flex;gap:8px;margin-top:10px"><button class="cpmvbt pri" data-act="excopy" style="flex:1">Copiar</button><button class="cpmvbt" data-act="exdl" style="flex:1">Descargar .txt</button></div>`}</div></div>`;}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act^="ex"]');if(!t)return;const a=t.dataset.act;if(!['exdata','exclose','exopt','excopy','exdl'].includes(a))return;e.stopPropagation();e.preventDefault();
  if(a==='exdata'){const cid=t.dataset.id||CP.cid;EXM={loading:true,o:{health:true,strength:true,track:true,meas:true,prog:true,name:false}};exModal();try{EXM.R=await exLoad(cid);EXM.loading=false;}catch(x){console.warn(x);EXM.loading=false;EXM.err=true;}exModal();}
  else if(a==='exclose'){EXM=null;exModal();}
  else if(a==='exopt'&&EXM){EXM.o[t.dataset.v]=!EXM.o[t.dataset.v];exModal();}
  else if(a==='excopy'&&EXM){const tx=EXM.txt||'';try{await navigator.clipboard.writeText(tx);toast('Copiado ✓ Pégalo en tu chat con la IA');}catch(x){const ta=document.getElementById('exTxt');if(ta){ta.removeAttribute('readonly');ta.select();try{document.execCommand('copy');toast('Copiado ✓');}catch(y){toast('Selecciona el texto y cópialo');}ta.setAttribute('readonly','');}}}
  else if(a==='exdl'&&EXM){const b=new Blob([EXM.txt||''],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(b),l=document.createElement('a');l.href=url;l.download='cliente-erre-'+new Date().toISOString().slice(0,10)+'.txt';document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);}
},true);


/* ===== Menú ⋮ de atajos en la lista de Clientes ===== */
(function(){const st=document.createElement('style');st.textContent=`.cprow{position:relative;padding-right:56px!important;cursor:default}.cptr.head{padding-right:56px!important}.cprow:hover{background:none}
.cpkb{position:absolute;right:8px;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:0;background:none;font-size:24px;line-height:1;color:#5A554E;cursor:pointer}.cpkb:hover{background:#EFEDE8}
#cpmn{position:fixed;inset:0;z-index:9700;background:rgba(28,27,25,.35);display:flex;align-items:flex-end;justify-content:center}
#cpmn .cpmnc{background:#FBFAF8;width:100%;max-width:520px;border-radius:18px 18px 0 0;padding:8px 8px 14px;box-shadow:0 -6px 30px rgba(0,0,0,.2)}
#cpmn .cpmnh{padding:10px 12px 6px;font:700 15px Archivo,sans-serif;color:#1C1B19}#cpmn .cpmnh small{display:block;font-weight:500;color:#5A554E;font-size:12px}
#cpmn button.cpmi{display:flex;align-items:center;gap:12px;width:100%;border:0;background:none;text-align:left;padding:13px 12px;border-radius:10px;font:600 15px Archivo,sans-serif;color:#1C1B19}#cpmn button.cpmi:hover{background:#EFEDE8}#cpmn button.cpmi i{font-style:normal;width:24px;text-align:center;font-size:18px}
@media(min-width:700px){#cpmn{background:transparent;align-items:flex-start;justify-content:flex-start}#cpmn .cpmnc{position:absolute;width:260px;border-radius:14px;padding:6px;border:1px solid #DCD6CC;box-shadow:0 8px 28px rgba(0,0,0,.18)}}`;document.head.appendChild(st);})();
function cpMenu(id,btn){let o=document.getElementById('cpmn');if(o)o.remove();if(!id)return;
  const c=(CP.clients||[]).find(x=>x.id===id)||{},nm=c.full_name||'Cliente',chat=c.plan==='complete'||c.plan==='elite',med=(c.modules||[]).includes('medidas');
  const items=[['open','👤','Abrir ficha'],['exp','📋','Exportar datos'],chat?['chat','💬','Abrir chat']:null,['task','🗓️','Asignar tarea / workout'],['pdf','📄','Exportar rutina a PDF'],med?['meas','📏','Nueva medición']:null,['acc','💳','Acceso y pago'],c.status==='archived'?['unarch','♻️','Restaurar cliente']:['arch','🗃️','Archivar cliente'],['del','🗑️','Eliminar cliente']].filter(Boolean);
  o=document.createElement('div');o.id='cpmn';o.innerHTML=`<div class="cpmnc"><div class="cpmnh">${esc(nm)}<small>Atajos</small></div>${items.map(([k,ic,t])=>`<button class="cpmi" data-act="cpmact" data-k="${k}" data-id="${id}"><i>${ic}</i>${t}</button>`).join('')}</div>`;
  document.body.appendChild(o);
  if(window.innerWidth>=700&&btn){const r=btn.getBoundingClientRect(),bx=o.firstChild;bx.style.left=Math.max(8,Math.min(window.innerWidth-268,r.right-260))+'px';const h=bx.offsetHeight;bx.style.top=Math.max(8,Math.min(window.innerHeight-h-8,r.bottom+4))+'px';}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act="cpmenu"],[data-act="cpmact"],#cpmn');
  if(!t){return;}
  if(t.id==='cpmn'){if(e.target.id==='cpmn'){cpMenu(null);e.stopPropagation();}return;}
  e.stopPropagation();e.preventDefault();
  if(t.dataset.act==='cpmenu'){cpMenu(t.dataset.id,t);return;}
  const k=t.dataset.k,id=t.dataset.id,c=(CP.clients||[]).find(x=>x.id===id)||{};cpMenu(null);
  if(k==='open'){CP.err='';coachOpen(id);}
  else if(k==='exp'){const b=document.createElement('button');b.dataset.act='exdata';b.dataset.id=id;b.style.display='none';document.body.appendChild(b);b.click();b.remove();}
  else if(k==='chat'){CP.err='';coachOpen(id,'chat');}
  else if(k==='task'){CP.err='';coachOpen(id,'plan');}
  else if(k==='acc'){CP.err='';coachOpen(id,'resumen');}
  else if(k==='meas'){CP.cid=id;CP.med=null;medModal(true);}
  else if(k==='arch'||k==='unarch'){const on=k==='arch';if(on&&!confirm('¿Archivar a '+(c.full_name||'este cliente')+'? Deja de entrar a la app y sale de tu lista. Lo encuentras en la pestaña Archivados y puedes restaurarlo cuando quieras.'))return;
    try{await DB.archiveClient(id,on);c.status=on?'archived':'active';coachRender();toast(on?'Cliente archivado ✓':'Cliente restaurado ✓');}catch(x){console.warn(x);toast('No se pudo completar');}}
  else if(k==='del'){const nm=c.full_name||'este cliente';if(!confirm('¿Eliminar a '+nm+' y TODOS sus datos para siempre? No se puede deshacer.\n\nSi solo quieres sacarlo de tu lista, mejor usa "Archivar cliente".'))return;const w=prompt('Para confirmar, escribe ELIMINAR');if((w||'').trim().toUpperCase()!=='ELIMINAR'){toast('No se eliminó');return;}
    try{await DB.deleteClient(id);CP.clients=(CP.clients||[]).filter(x=>x.id!==id);coachRender();toast('Cliente eliminado');}catch(x){console.warn(x);toast('No se pudo eliminar');}}
  else if(k==='pdf'){try{const rt=await DB.routine(id);if(!rt||!rt.days||!rt.days.length){toast('Este cliente aún no tiene rutina para exportar');return;}
      let prog='complete';try{prog=planOf(c);}catch(x){}PDFM={days:rt.days.filter(d=>!d.x),sel:0,prog,goal:['bajar','complete','aumentar'].includes(c.goal)?c.goal:'complete',wk:1,who:c.full_name||'',title:rt.name||'Rutina',intro:PDF_INTRO,scope:'all'};pdfModal();}catch(x){console.warn(x);toast('No se pudo cargar la rutina');}}
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape')cpMenu(null);});


/* ===== Plan de alimentación por cliente (generador del coach) ===== */
var ALP_PRE={'Sin lácteos':['Yogurt griego','Queso campesino / requesón','Proteína whey (en polvo)'],'Sin huevo':['Huevos'],'Sin gluten':['Pan integral','Pasta','Avena','Granola'],'Sin carnes':['Pechuga de pollo','Muslo de pollo','Carne magra','Cerdo magro','Pescado','Atún']};
const alP=()=>S.alimplan||{};
function alpFoodOk(O){const ex=alP().ex||[];if(!ex.length)return true;return !Object.keys(O.comp).some(k=>ex.includes(O.comp[k]));}
function alpOptOk(m,i){const hid=(alP().hide||{})[m]||[];return !hid.includes(AL_O[m][i][0])&&alpFoodOk(alOpt(m,i));}
(function(){const f=alTargets;alTargets=function(raw){const T=f.apply(this,arguments),p=alP().tg;if(raw||!p)return T;return Object.assign({},T,p,{estimated:false});};})();
alDay=function(){const st=alSt();
  return `<section class="ald">`+AL_M.map(([k,n,ic])=>{const ch=(st[k]||{}).eat;
   const cards=AL_O[k].map((o,i)=>{if(!alpOptOk(k,i))return '';const O=alOpt(k,i);return `<button class="alc${ch===i?' on':''}" data-alm="open" data-m="${k}" data-i="${i}"><div class="e">${O.e}</div><b>${esc(O.n)}</b></button>`;}).join('');
   return `<div class="alh"><b>${ic} ${n}</b>${ch!=null?'<em>✓ Ya elegiste</em>':k==='m'?'<small style="color:#5A554E">opcional</small>':''}</div><div class="alrail">${cards||'<div class="note">Tu coach está preparando tus opciones.</div>'}</div>`;}).join('')+`</section>`;};
(function(){const b=alBoard;alBoard=function(){const h=b.apply(this,arguments);return alP().nomac?h.replace('<div class="alb">','<div class="alb nomac">'):h;};
 const g=alModal;alModal=function(m,i,sw){g.apply(this,arguments);if(m==null)return;const o=document.getElementById('almodal');if(!o)return;const ex=alP().ex||[];
  o.querySelectorAll('.alsw button[data-v]').forEach(x=>{if(ex.includes(x.dataset.v))x.remove();});
  if(alP().nomac)o.querySelectorAll('p').forEach(p=>{if(/^≈/.test(p.textContent.trim()))p.remove();});};
 const st=document.createElement('style');st.textContent='.alb.nomac .r1{display:none}.alb.nomac h4{margin-bottom:2px}';document.head.appendChild(st);})();

/* --- panel del coach --- */
function cpAlimSec(){const d=CP.d;if(!d||!d.profile)return '';const dt=d.data||{},pl=dt.alimplan||{},on=((d.profile.modules)||[]).includes('alim');
  const auto=cpWith(()=>alTargets(true)),T=Object.assign({},auto,pl.tg||{}),ex=pl.ex||[],hid=pl.hide||{},open=CP.alpOpen||{};
  const F=(k,n,u,v)=>`<label class="alpf"><small>${n}</small><input class="fld" id="alp_${k}" type="number" inputmode="numeric" value="${v}"><em>${u}</em></label>`;
  const foods=[].concat.apply([],['prot','carb','fat','fruit','veg'].map(g=>AL_G[g][4].filter(x=>x[0]!=='+')));
  const cnt=cpWith(()=>{const r={},bad={};AL_M.forEach(([k])=>{r[k]=0;bad[k]={};AL_O[k].forEach((o,i)=>{const okF=alpFoodOk(alOpt(k,i));bad[k][o[0]]=!okF;if(alpOptOk(k,i))r[k]++;});});return {r,bad};});
  const meals=AL_M.map(([k,n])=>{const vis=cnt.r[k];return `<div class="alpm"><button class="alpt" data-act="alptg" data-k="m${k}">${n} <em style="${vis?'':'color:#C0392B;font-weight:700'}">${vis?vis+' de '+AL_O[k].length+' opciones':'⚠ sin opciones: revisa las restricciones'}</em><i>${open['m'+k]?'▴':'▾'}</i></button>${open['m'+k]?`<div class="chips">${AL_O[k].map(o=>`<button class="chip${(hid[k]||[]).includes(o[0])?'':' on'}" data-act="alpopt" data-m="${k}" data-n="${esc(o[0])}">${esc(o[0])}${cnt.bad[k][o[0]]?' ⊘':''}</button>`).join('')}</div>${open['m'+k]&&AL_O[k].some(o=>cnt.bad[k][o[0]])?'<div class="note">⊘ = oculta por una restricción de alimentos.</div>':''}`:''}</div>`;}).join('');
  return `<section class="sec"><div class="sec-h"><b>Plan de alimentación</b><em>${pl.tg||ex.length||Object.keys(hid).some(k=>(hid[k]||[]).length)||pl.nomac?'Personalizado':'Base del objetivo'}</em></div>
   ${on?'':'<div class="note" style="margin-bottom:8px;color:#B87400">El módulo Alimentación está apagado para este cliente (Módulos de la app).</div>'}
   <div class="note" style="margin-bottom:8px">Objetivo: <b>${GN[d.profile.goal]||d.profile.goal||'—'}</b>. Las metas automáticas salen de su peso, estatura, edad, sexo y días de entreno. Cambia lo que quieras; lo que dejes igual sigue siendo automático.</div>
   <div class="alpg">${F('kc','Calorías','kcal',T.kc)}${F('P','Proteína','g',T.P)}${F('C','Carbo','g',T.C)}${F('F','Grasa','g',T.F)}${F('water','Agua','ml',T.water)}</div>
   <div style="display:flex;gap:8px;margin-top:8px"><button class="btn solid" data-act="alpsave" style="flex:1">Guardar metas</button><button class="btn" data-act="alpreset" style="flex:1">Volver a automáticas</button></div>
   <div class="chips" style="margin-top:10px"><button class="chip${pl.nomac?'':' on'}" data-act="alpmac">${pl.nomac?'Kcal y macros ocultos al cliente':'Mostrar kcal y macros al cliente'}</button></div>
   <label class="pfl" style="margin-top:12px">Restricciones</label><div class="chips">${Object.keys(ALP_PRE).map(n=>{const all=ALP_PRE[n].every(x=>ex.includes(x));return `<button class="chip${all?' on':''}" data-act="alppre" data-n="${n}">${n}</button>`;}).join('')}</div>
   <button class="alpt" data-act="alptg" data-k="foods" style="margin-top:6px">Alimentos que no come <em>${ex.length?ex.length+' excluidos':'ninguno'}</em><i>${open.foods?'▴':'▾'}</i></button>
   ${open.foods?`<div class="chips">${foods.map(x=>`<button class="chip${ex.includes(x)?' on':''}" data-act="alpex" data-n="${esc(x)}">${esc(x)}</button>`).join('')}</div><div class="note" style="margin-top:4px">Las opciones con esos alimentos se ocultan y no salen para cambiar.</div>`:''}
   <label class="pfl" style="margin-top:12px">Opciones de comida (toca para ocultar o mostrar)</label>${meals}
   <button class="btn" data-act="alppdf" style="width:100%;margin-top:12px">Exportar plan a PDF</button></section>`;}
(function(){const st=document.createElement('style');st.textContent=`.alpg{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:8px}.alpf{display:flex;flex-direction:column;gap:2px;font:600 12px Archivo,sans-serif}.alpf small{color:#5A554E;font-weight:600}.alpf em{font-style:normal;color:#8b867e;font-size:11px}.alpf .fld{padding:9px 10px;margin:0}
.alpt{display:flex;align-items:center;gap:8px;width:100%;border:1px solid #DCD6CC;background:#FBFAF8;border-radius:10px;padding:10px 12px;font:700 14px Archivo,sans-serif;text-align:left;margin-top:6px}.alpt em{font-style:normal;font-weight:500;color:#5A554E;font-size:12px;flex:1}.alpt i{font-style:normal;margin-left:auto}.alpm .chips{margin:6px 0 4px}`;document.head.appendChild(st);})();
async function alpSet(fn){const d=CP.d,cur=JSON.parse(JSON.stringify((d.data&&d.data.alimplan)||{}));fn(cur);
  try{await DB.upsert('client_data',[{client_id:CP.cid,key:'alimplan',value:cur,updated_at:new Date().toISOString()}],'client_id,key');d.data=d.data||{};d.data.alimplan=cur;const bl=(d.blobs||[]).find(x=>x.key==='alimplan');if(bl)bl.value=cur;else if(d.blobs)d.blobs.push({key:'alimplan',value:cur});try{DB.logAct(CP.cid,'cli','Ajustó su plan de alimentación');}catch(e){}coachRender();}catch(x){console.warn(x);toast('No se pudo guardar');}}
document.addEventListener('click',async e=>{const t=e.target.closest&&e.target.closest('[data-act^="alp"]');if(!t)return;const a=t.dataset.act;if(!/^alp(tg|save|reset|mac|pre|ex|opt|pdf)$/.test(a))return;e.stopPropagation();e.preventDefault();
  if(a==='alptg'){CP.alpOpen=CP.alpOpen||{};CP.alpOpen[t.dataset.k]=!CP.alpOpen[t.dataset.k];coachRender(true);return;}
  if(a==='alpsave'){const g=k=>Math.round(+((document.getElementById('alp_'+k)||{}).value));const tg={kc:g('kc'),P:g('P'),C:g('C'),F:g('F'),water:g('water')};if(Object.values(tg).some(v=>!(v>0))){toast('Revisa los números: todos deben ser mayores que 0');return;}
    const auto=cpWith(()=>alTargets(true)),same=['kc','P','C','F','water'].every(k=>tg[k]===auto[k]);await alpSet(p=>{if(same)delete p.tg;else p.tg=tg;});toast('Metas guardadas ✓');return;}
  if(a==='alpreset'){await alpSet(p=>{delete p.tg;});toast('Metas automáticas');return;}
  if(a==='alpmac'){await alpSet(p=>{p.nomac=!p.nomac;if(!p.nomac)delete p.nomac;});return;}
  if(a==='alppre'){const L=ALP_PRE[t.dataset.n]||[];await alpSet(p=>{p.ex=p.ex||[];const all=L.every(x=>p.ex.includes(x));p.ex=all?p.ex.filter(x=>!L.includes(x)):p.ex.concat(L.filter(x=>!p.ex.includes(x)));if(!p.ex.length)delete p.ex;});return;}
  if(a==='alpex'){const n=t.dataset.n;await alpSet(p=>{p.ex=p.ex||[];p.ex=p.ex.includes(n)?p.ex.filter(x=>x!==n):p.ex.concat(n);if(!p.ex.length)delete p.ex;});return;}
  if(a==='alpopt'){const m=t.dataset.m,n=t.dataset.n;await alpSet(p=>{p.hide=p.hide||{};const L=p.hide[m]||[];p.hide[m]=L.includes(n)?L.filter(x=>x!==n):L.concat(n);if(!p.hide[m].length)delete p.hide[m];if(!Object.keys(p.hide).length)delete p.hide;});return;}
  if(a==='alppdf'){try{const h=cpWith(()=>alpPdfHTML());alpPrint(h);}catch(x){console.warn(x);toast('No se pudo armar el PDF');}return;}
},true);

/* --- PDF del plan --- */
function alpPdfHTML(){const p=CP.d.profile,g=(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete',T=alTargets(),P=alPlan(),show=!alP().nomac,ex=alP().ex||[];
  const logo=new URL('erre-logo.png',location.href).href;
  const css=`.wm{position:fixed;top:50%;left:50%;width:430px;transform:translate(-50%,-50%);opacity:.07;z-index:0}@page{size:A4;margin:12mm 13mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:Archivo,Helvetica,Arial,sans-serif;color:#1C1B19;margin:0;font-size:12px}.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DCD6CC;padding-bottom:8px;margin-bottom:12px}.hd img{height:38px}.hd small{color:#5A554E;letter-spacing:.08em;text-transform:uppercase;font-size:10px}
  h1{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;font-size:24px;margin:0 0 2px}.who{color:#5A554E;margin-bottom:10px}.tg{display:flex;gap:8px;margin:8px 0 12px}.tg div{flex:1;border:1px solid #DCD6CC;border-radius:8px;padding:6px 8px;text-align:center}.tg b{display:block;font-size:16px}.tg small{color:#5A554E;font-size:10px}
  h2{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:15px;margin:14px 0 6px;border-bottom:2px solid #C0392B;padding-bottom:3px}.op{break-inside:avoid;border:1px solid #DCD6CC;border-radius:8px;padding:7px 9px;margin-bottom:6px}.op b{font-size:13px}.op em{font-style:normal;color:#5A554E;font-size:10.5px;float:right}.op div{margin-top:2px;color:#3b3833}.op i{font-style:normal;color:#8b867e}.rc{color:#5A554E;font-size:10.5px;margin-top:3px}.alsv{width:15px;height:15px;vertical-align:-3px}.nt{color:#5A554E;font-size:10.5px;margin-top:10px}.ft{margin-top:10px;color:#8b867e;font-size:10px;text-align:center}`;
  const body=AL_M.map(([k,n,ic])=>{const por=AL_PORC[g][k],cards=AL_O[k].map((o,i)=>{if(!alpOptOk(k,i))return '';const O=alOpt(k,i),X=alMacros(k,i);
      const rows=Object.keys(O.comp).map(c=>{const q=alQty(c,O.comp[c],por[c]||(c==='v'?'1 plato':'1'),'g');return `<div>${alFeIcon(O.comp[c],c)} ${esc(O.comp[c])}: <b>${esc(q.main)}</b> <i>${esc(q.sub)}</i></div>`;}).join('');
      return `<div class="op"><b>${esc(O.n)}</b>${show?`<em>≈ ${Math.round(X.kc)} kcal · P ${Math.round(X.P)} · C ${Math.round(X.C)} · G ${Math.round(X.F)}</em>`:''}${rows}${O.recipe?`<div class="rc">Cómo prepararlo: ${esc(O.recipe)}</div>`:''}</div>`;}).join('');
    return `<h2>${ic} ${n}</h2>${cards||'<div class="nt">Sin opciones definidas.</div>'}`;}).join('');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Plan de alimentación</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Oswald:wght@600;700&display=swap" rel="stylesheet"><style>${css}</style></head><body><img class="wm" src="${logo}" alt="">
   <div class="hd"><img src="${logo}" alt=""><small>ERRE Complete · Método Complete</small></div><h1>Plan de alimentación</h1><div class="who">Para: ${esc(p.full_name||'')} · ${esc(P.t)}</div>
   ${show?`<div class="tg"><div><b>${T.kc}</b><small>kcal</small></div><div><b>${T.P} g</b><small>proteína</small></div><div><b>${T.C} g</b><small>carbo</small></div><div><b>${T.F} g</b><small>grasa</small></div><div><b>${(T.water/1000).toFixed(1).replace('.',',')} L</b><small>agua</small></div></div>`:`<div class="tg"><div><b>${(T.water/1000).toFixed(1).replace('.',',')} L</b><small>agua al día</small></div></div>`}
   <div class="nt" style="margin-top:0">${esc(P.rule)}</div>${body}
   ${ex.length?`<div class="nt">Alimentos excluidos: ${ex.map(esc).join(', ')}.</div>`:''}<div class="nt">Cantidades en gramos cocidos (avena y granola en seco). Valores aproximados. Elige una opción por comida; puedes cambiar un alimento por otro del mismo grupo.</div><div class="ft">ERRE Complete</div></body></html>`;}
function alpPrint(html){const f=document.createElement('iframe');f.style.cssText='position:fixed;right:0;bottom:0;width:0;height:0;border:0';document.body.appendChild(f);f.srcdoc=html;
  f.onload=()=>{const w=f.contentWindow,go=()=>{try{w.focus();w.print();}catch(e){console.warn(e);}setTimeout(()=>f.remove(),60000);};(w.document.fonts&&w.document.fonts.ready?w.document.fonts.ready:Promise.resolve()).then(()=>setTimeout(go,300));};}

/* desayunos sin huevo ni lácteos (para restricciones) */
AL_O.d.push(['Arepa con pollo y aguacate',null,{p:'Pechuga de pollo',c:'Arepa',f:'Aguacate (½)'}]);
AL_O.d.push(['Tostadas con atún',null,{p:'Atún',c:'Pan integral',f:'Aguacate (½)',fr:'Papaya'}]);
AL_O.m.push(['Pollo desmechado y fruta',null,{p:'Pechuga de pollo',fr:'Manzana'}]);
AL_O.m.push(['Atún con aguacate',null,{p:'Atún',f:'Aguacate (½)',fr:'Naranja'}]);


/* ===== FICHA DEL CLIENTE reorganizada (21 nov): Hoy · Entreno · Nutrición · Progreso · Chat · Ajustes ===== */
(function(){const s=document.createElement('style');s.textContent=`
.cpnavx{display:flex;gap:6px;margin:10px 0 12px;overflow-x:auto;padding-bottom:2px;position:sticky;top:0;z-index:5;background:var(--bg,#EFEDE8)}
.cpnavx .cptab{flex:1 0 auto;display:flex;align-items:center;justify-content:center;gap:6px;padding:11px 14px;border-radius:12px;border:1px solid #DCD6CC;background:#FBFAF8;font:600 14px Archivo,sans-serif;color:#1C1B19;white-space:nowrap;cursor:pointer}
.cpnavx .cptab i{font-style:normal;font-size:16px}
.cpnavx .cptab.on{background:#1C1B19;color:#fff;border-color:#1C1B19}
.cpseg{display:flex;gap:6px;margin:0 0 12px}.cpseg button{flex:1;padding:10px;border-radius:10px;border:1px solid #DCD6CC;background:#FBFAF8;font:600 14px Archivo,sans-serif;cursor:pointer}.cpseg button.on{background:#C0392B;color:#fff;border-color:#C0392B}
.cph-chips{display:flex;flex-wrap:wrap;gap:6px;margin:0 0 12px}.cph-chips span{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:99px;padding:6px 12px;font-size:13px}.cph-chips span.red{background:#FBEAE7;border-color:#E9B9B1;color:#8E2A1F;font-weight:600}
.cphal{display:flex;align-items:center;gap:10px;padding:11px 12px;border-radius:12px;margin-bottom:8px;border:1px solid #DCD6CC;background:#FBFAF8}
.cphal b{flex:1;font-weight:600;font-size:14px;line-height:1.3}.cphal small{display:block;font-weight:400;color:#5A554E;margin-top:2px}
.cphal i{width:12px;height:12px;border-radius:50%;flex:none}.cphal.r{border-color:#E9B9B1;background:#FBEAE7}.cphal.r i{background:#C0392B}.cphal.o{border-color:#EBD2A4;background:#FBF3E3}.cphal.o i{background:#E8A317}.cphal.g i{background:#2E9E5B}
.cphal button{flex:none;padding:8px 14px;border-radius:10px;border:0;background:#1C1B19;color:#fff;font:600 13px Archivo,sans-serif;cursor:pointer}
.cphk4{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;margin:12px 0}
.cphk{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:14px;padding:12px}.cphk small{display:block;color:#5A554E;font-size:12px;text-transform:uppercase;letter-spacing:.04em}.cphk b{display:block;font:700 22px Oswald,sans-serif;margin:4px 0 2px;color:#1C1B19}.cphk em{font-style:normal;font-size:12px;color:#5A554E}
.cpqa{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin:12px 0}
.cpqa button{display:flex;align-items:center;gap:10px;padding:14px;border-radius:14px;border:1px solid #DCD6CC;background:#FBFAF8;font:600 14px Archivo,sans-serif;text-align:left;cursor:pointer}.cpqa button i{font-style:normal;font-size:22px}
.cpacc{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:14px;margin-bottom:10px;overflow:hidden}
.cpacc>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:12px;padding:14px}.cpacc>summary::-webkit-details-marker{display:none}
.cpacc>summary i{font-style:normal;font-size:22px}.cpacc>summary b{display:block;font-size:15px}.cpacc>summary small{color:#5A554E;font-size:12px}.cpacc>summary:after{content:'▾';margin-left:auto;color:#5A554E}.cpacc[open]>summary:after{content:'▴'}
.cpacc>.cpaccb{padding:0 10px 10px}.cpacc .sec{box-shadow:none;margin:8px 0 0}@media(max-width:600px){.cpnavx .cptab{padding:10px 11px;font-size:13px;gap:4px}}
`;document.head.appendChild(s);})();
document.addEventListener('toggle',e=>{const t=e.target;if(t&&t.classList&&t.classList.contains('cpacc')){CP.dopen=CP.dopen||{};CP.dopen[t.dataset.k]=t.open;}},true);

function cpEntSeg(){return `<div class="cpseg"><button class="${CP.tab==='plan'?'on':''}" data-act="cptab" data-v="plan">🗓 Calendario</button><button class="${CP.tab==='rutina'?'on':''}" data-act="cptab" data-v="rutina">📋 Programa</button><button class="${CP.tab==='pesos'?'on':''}" data-act="cptab" data-v="pesos">⚖ Pesos</button></div>`;}

function cpAlimTab(){try{return cpAlimSec();}catch(e){console.warn(e);return '<div class="note">No se pudo cargar la nutrición.</div>';}}

function cpAjustes(h){
  const parts=h.split('<section class="sec"');parts.shift();
  const G=[['cuenta','🔐','Cuenta y acceso','Correo, plan, pago y fidelidad',['cuenta','plan','acceso y pago','fidelidad']],
    ['perfil','👤','Perfil y salud','Objetivo, días, lesiones',['perfil']],
    ['app','📱','Lo que ve en su app','Módulos, entreno libre, prioridad muscular, medidas',['módulos de la app','entreno libre','prioridad por grupo muscular','medidas antropométricas','agarres y posturas']],
    ['tools','🧰','Herramientas y pruebas','Exportar datos, hitos y reinicio',['exportar datos','hitos celebrados','pruebas']]];
  const bk={};G.forEach(g=>bk[g[0]]=[]);
  parts.forEach(x=>{const m=x.match(/<div class="sec-h"><b>([^<]*)<\/b>/),t=(m?m[1]:'').trim().toLowerCase();let g=G.find(y=>y[4].includes(t));if(!g)g=G[3];bk[g[0]].push([g[4].indexOf(t),'<section class="sec"'+x]);});
  CP.dopen=CP.dopen||{};
  return G.map(g=>{const L=bk[g[0]].sort((a,b)=>a[0]-b[0]).map(x=>x[1]).join('');if(!L)return '';
    const op=CP.dopen[g[0]]!==undefined?CP.dopen[g[0]]:false;
    return `<details class="cpacc" data-k="${g[0]}"${op?' open':''}><summary><i>${g[1]}</i><span><b>${g[2]}</b><small>${g[3]}</small></span></summary><div class="cpaccb">${L}</div></details>`;}).join('');
}

function cpHoy(d){
  const p=d.profile,tdy=today(),dt=d.data||{},pf=dt.prefs||{},al=[];
  try{accSec();}catch(e){}
  if(!CP.chk)try{cpChkLoad();}catch(e){}
  const dd=(a,b)=>Math.round((Date.parse(b)-Date.parse(a))/864e5);
  const hasR=!!(CP.routine&&CP.routine.days&&CP.routine.days.length);
  if(p.status==='pending')al.push({c:'r',t:'Cuenta pendiente de activar',b:'Activar',a:'data-act="cpactivate"'});
  const row=(CP.acc&&CP.acc.cid===CP.cid)?CP.acc.row:null;
  try{const st=accState(row);
    if(st==='expired')al.push({c:'r',t:'Acceso vencido',s:'Revisa el pago',b:'Ver',a:'data-act="cptab" data-v="resumen"'});
    else if(st==='grace')al.push({c:'o',t:'Pago vencido · en días de gracia',b:'Ver',a:'data-act="cptab" data-v="resumen"'});
    else if(row&&row.paid_until){const n=Math.ceil((new Date(row.paid_until).getTime()-Date.now())/864e5);if(n>=0&&n<=5)al.push({c:'o',t:'El acceso vence en '+n+' día'+(n===1?'':'s'),b:'Ver',a:'data-act="cptab" data-v="resumen"'});}}catch(e){}
  const fb=(d.fb||[]).slice().sort((a,b)=>a.log_date<b.log_date?1:-1);
  const mol=fb.find(f=>f.feel==='molestia'&&dd(f.log_date,tdy)<=14);
  if(mol)al.push({c:'r',t:'Molestia en '+(GRN[mol.grp]||mol.grp),s:fdate(mol.log_date)+(mol.note?' · “'+mol.note+'”':''),b:'Ver',a:'data-act="cptab" data-v="evol"'});
  try{const ck=(CP.chk||[]).filter(x=>x.client_id===CP.cid)[0];if(ck){const fl=chkFlags(ck.data||{});if(fl.length&&dd(ck.period,tdy)<=21)al.push({c:'o',t:'Chequeo quincenal: '+fl.join(' · '),b:'Ver',a:'data-act="cptab" data-v="evol"'});}}catch(e){}
  const ms=d.chat||[],lm=ms[ms.length-1];let rd=0;try{rd=+localStorage.getItem('cpread_'+CP.cid)||0;}catch(e){}
  if(lm&&lm.sender_id===CP.cid&&(!lm.kind||lm.kind==='msg')&&Date.parse(lm.created_at)>rd)al.push({c:'o',t:'Mensaje sin responder',s:String(lm.body||'').slice(0,70),b:'Responder',a:'data-act="cptab" data-v="chat"'});
  if(!hasR)al.push({c:'o',t:'Sin programa asignado',b:'Asignar',a:'data-act="cptab" data-v="rutina"'});
  let wk=null,tot=null;
  try{const prog=planOf(p);tot=PERIOD[prog].weeks;if(pf.start&&hasR){wk=Math.floor(dd(pf.start,tdy)/7)+1;
    if(wk>tot)al.push({c:'o',t:'Mesociclo terminado · programa el siguiente',s:'Iba por la semana '+wk+' de '+tot,b:'Programa',a:'data-act="cptab" data-v="rutina"'});
    else if(wk===tot)al.push({c:'g',t:'Semana '+wk+' de '+tot+' · descarga'});}}catch(e){}
  if(hasR&&fb.length){const n=dd(fb[0].log_date,tdy);if(n>=6)al.push({c:'o',t:'Sin entrenos registrados hace '+n+' días',b:'Escribir',a:'data-act="cptab" data-v="chat"'});}
  const W=(d.weights||[]).map(r=>({d:r.log_date,k:+r.kg})).sort((a,b)=>a.d<b.d?-1:1);
  if(W.length&&dd(W[W.length-1].d,tdy)>=10)al.push({c:'g',t:'Sin pesarse hace '+dd(W[W.length-1].d,tdy)+' días'});
  const rank={r:0,o:1,g:2};al.sort((a,b)=>rank[a.c]-rank[b.c]);
  const alH=al.length?al.map(x=>`<div class="cphal ${x.c}"><i></i><b>${esc(x.t)}${x.s?`<small>${esc(x.s)}</small>`:''}</b>${x.b?`<button ${x.a}>${x.b}</button>`:''}</div>`).join(''):'<div class="cphal g"><i></i><b>Todo al día ✓</b></div>';
  const last=W.length?W[W.length-1].k:null,w0=W.length>1?W[Math.max(0,W.length-8)].k:null,dl=(last!=null&&w0!=null&&W.length>1)?last-w0:null;
  const S7=(d.steps||[]).slice(-7).map(r=>r.steps),avg=S7.length?Math.round(S7.reduce((a,b)=>a+b,0)/S7.length):null;
  const w7=new Set(fb.filter(f=>dd(f.log_date,tdy)<7&&dd(f.log_date,tdy)>=0).map(f=>f.log_date)).size,plan=(p.train_days||[]).length;
  const k=(l,v,e)=>`<div class="cphk"><small>${l}</small><b>${v}</b><em>${e||'&nbsp;'}</em></div>`;
  const edad=p.birth_date?Math.floor((Date.now()-new Date(p.birth_date))/31557600000):null;
  const inj=(p.injuries||'').trim(),hasInj=inj&&!/^ning/i.test(inj);
  const chips=`<div class="cph-chips">${p.level?`<span>${esc(p.level)}</span>`:''}${(p.train_days||[]).length?`<span>${(p.train_days||[]).map(i=>DAYL[i]).join(' · ')}</span>`:''}${edad!=null?`<span>${edad} años</span>`:''}${p.height_cm?`<span>${p.height_cm} cm</span>`:''}${hasInj?`<span class="red">⚠ ${esc(inj)}</span>`:''}${typeof pgChip==='function'?pgChip(d):''}</div>`;
  const c=d.call?bogota(d.call.starts_at):null;
  const call=`<section class="sec"><div class="sec-h"><b>Llamada 1:1</b><em>${c?fmtCall(c):'Sin agendar'}</em></div>
    <div class="rtgrid g3" style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><label>Fecha<input class="fld" type="date" id="cpD" value="${c?c.date:addD(tdy,10)}"></label><label>Hora (Bogotá)<input class="fld" type="time" id="cpT" value="${c?c.time:'19:00'}"></label></div>
    <button class="btn solid" data-act="cpcall" style="width:100%;margin-top:10px;padding:12px">${c?'Reprogramar y avisar':'Agendar y avisar'}</button></section>`;
  const qa=[['💬','Escribir','data-act="cptab" data-v="chat"'],['🗓','Asignar tarea','data-act="cptab" data-v="plan"'],['📋','Editar programa','data-act="cptab" data-v="rutina"'],['🍽','Plan de comidas','data-act="cptab" data-v="alim"'],['🧍','Valoración inicial',`data-act="vlopen" data-cid="${CP.cid}"`],['📄','Rutina en PDF',`data-act="cpmact" data-k="pdf" data-id="${CP.cid}"`],['🤖','Exportar para IA',`data-act="exdata" data-id="${CP.cid}"`]];
  return `${chips}<div class="sec-h" style="margin:4px 2px 8px"><b>Atención</b></div>${alH}
   <div class="cphk4">${k('Peso',last!=null?last.toFixed(1)+' kg':'—',dl!=null?(dl>0?'+':dl<0?'−':'')+Math.abs(dl).toFixed(1)+' kg':'sin registros')}${k('Entrenos 7 días',w7+(plan?' / '+plan:''),plan?'del plan semanal':'')}${k('Pasos prom.',avg!=null?(avg/1000).toFixed(1)+'k':'—',p.step_goal?'meta '+(p.step_goal/1000).toFixed(1)+'k':'')}${k('Mesociclo',wk!=null&&wk>=1?'S'+Math.min(wk,tot)+' / '+tot:'—',wk!=null&&wk>tot?'terminado':(wk===tot?'descarga':''))}</div>
   <div class="cpqa">${qa.map(x=>`<button ${x[2]}><i>${x[0]}</i>${x[1]}</button>`).join('')}</div>${call}`;
}


/* ===== día del calendario: más limpio + cerrar tocando afuera ===== */
(function(){const st=document.createElement('style');st.textContent=`
.cpdhd{position:sticky;top:0;z-index:3;background:var(--card,#FBFAF8);padding-bottom:8px}
.cpdact{display:flex;gap:8px;margin:0 0 10px}.cpdact .btn{flex:1;margin:0;padding:11px 8px;font-size:14px}
.cpdsec{font:600 11px Archivo,sans-serif;text-transform:uppercase;letter-spacing:.06em;color:#5A554E;margin:4px 0 6px}
.cpdtt{display:flex;align-items:center;gap:10px;justify-content:space-between;background:#1C1B19;color:#fff;border-radius:12px;padding:12px 14px;margin:6px 0 10px}.cpdtt b{font-size:15px;line-height:1.25}
.cpdk{gap:6px!important}.cpdk span{padding:6px 4px!important}.cpdk b{font-size:16px!important}.cpdk small{font-size:10px!important}
.cpdg{border:1px solid #DCD6CC;border-left:4px solid var(--tc);border-radius:12px;margin:8px 0;background:var(--card,#FBFAF8);overflow:hidden}
.cpdg>summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:8px;padding:12px}.cpdg>summary::-webkit-details-marker{display:none}
.cpdg>summary i{font-style:normal;font-size:18px}.cpdg>summary b{font-size:14px}.cpdg>summary small{color:#5A554E;font-size:12px;flex:1}
.cpdg>summary:after{content:'▾';color:#5A554E;margin-left:4px}.cpdg[open]>summary:after{content:'▴'}
.cpdg .cpdb{background:none!important;color:#5A554E!important;font-size:11px;text-transform:uppercase;letter-spacing:.06em;padding:6px 12px 2px}
.cpdg .cpde{padding:8px 12px 10px;border-top:1px solid #EFEDE8}
.cpsrs{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.cpsc{background:#EFEDE8;border-radius:8px;padding:4px 9px;font-size:12px;color:#5A554E;white-space:nowrap}.cpsc b{margin-right:5px;color:#1C1B19}.cpsc.d{background:#E4F3EA;color:#1F7A4D}
.cptask{padding:8px 10px!important;margin-bottom:6px!important}.cptask b{font-size:14px!important}.cptask small{font-size:12px!important}
`;document.head.appendChild(st);})();
document.addEventListener('click',e=>{const t=e.target;if(!t||!t.id)return;
  if(t.id==='cptm'){CP.tm=null;cpTaskModal();e.stopPropagation();}
  else if(t.id==='cpdv'){cpDayClose();e.stopPropagation();}
  else if(t.id==='qpv'){qpClose();e.stopPropagation();}},true);
document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;
  if(document.getElementById('cptm')){CP.tm=null;cpTaskModal();}
  else if(document.getElementById('cpdv'))cpDayClose();});


/* ===== Plan de comidas para alguien SIN cuenta (cliente externo) ===== */
var QP=null;
const qpDef=()=>({name:'',sex:'Hombre',age:30,h:175,w:75,days:3,goal:'complete',pre:{},nomac:false,tg:null});
function qpWith(o,fn){
  const sv={user:S.user,goal:S.goal,weights:S.weights,alimplan:S.alimplan,cd:CP.d};
  S.user={sex:o.sex,sched:Array.from({length:o.days},(_,i)=>i),data:{weight:String(o.w),height:String(o.h),yy:new Date().getFullYear()-o.age}};
  S.goal=o.goal;S.weights={};
  const ex=[];Object.keys(o.pre).forEach(n=>{if(o.pre[n])ALP_PRE[n].forEach(x=>{if(!ex.includes(x))ex.push(x);});});
  S.alimplan={};if(o.tg)S.alimplan.tg=o.tg;if(o.nomac)S.alimplan.nomac=1;if(ex.length)S.alimplan.ex=ex;
  CP.d={profile:{full_name:o.name}};
  try{return fn();}finally{S.user=sv.user;S.goal=sv.goal;S.weights=sv.weights;S.alimplan=sv.alimplan;CP.d=sv.cd;}
}
function qpClose(){QP=null;const o=document.getElementById('qpv');if(o)o.remove();document.body.style.overflow='';}
function qpRender(){
  if(!QP)return;let o=document.getElementById('qpv');if(!o){o=document.createElement('div');o.id='qpv';o.className='cpdv';document.body.appendChild(o);document.body.style.overflow='hidden';}
  const q=QP,T=q.tg||qpWith(q,()=>alTargets(true)),ch=(on,act,v,t)=>`<button class="chip${on?' on':''}" data-act="${act}" data-v="${v}">${t}</button>`;
  const f=(id,l,v,ty)=>`<label class="pfl" style="margin:0">${l}<input class="fld" id="${id}" value="${esc(String(v))}" inputmode="${ty||'numeric'}" style="margin-top:3px"></label>`;
  o.innerHTML=`<div class="cpdc"><div class="cpdhd"><div><b>Plan de comidas sin cuenta</b><small>Para alguien que no está en la app</small></div><button class="cpdx" data-act="qpclose" aria-label="Cerrar">✕</button></div>
   <label class="pfl" style="margin:0 0 10px">📋 Pega aquí los datos del cliente y se llena solo<textarea class="fld" id="qp_paste" rows="3" placeholder="Pega el texto con sexo, edad, estatura, peso, objetivo…" style="margin-top:3px;resize:vertical"></textarea></label>
   <button class="btn" data-act="qpfill" style="width:100%;margin:0 0 12px">✨ Rellenar con lo pegado</button>
   <label class="pfl" style="margin:0 0 8px">Nombre<input class="fld" id="qp_name" value="${esc(q.name)}" placeholder="Ej. Yojan Taborda" style="margin-top:3px"></label>
   <div class="chips" style="margin-bottom:8px">${ch(q.sex==='Hombre','qpsex','Hombre','Hombre')}${ch(q.sex==='Mujer','qpsex','Mujer','Mujer')}</div>
   <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px">${f('qp_age','Edad',q.age)}${f('qp_h','Estatura (cm)',q.h)}${f('qp_w','Peso (kg)',q.w,'decimal')}</div>
   <label class="pfl" style="margin:0 0 4px">Días de entreno por semana</label><div class="chips" style="margin-bottom:10px">${[1,2,3,4,5,6,7].map(n=>ch(q.days===n,'qpdays',n,n)).join('')}</div>
   <label class="pfl" style="margin:0 0 4px">Objetivo</label><div class="chips" style="margin-bottom:10px">${[['bajar','Bajar peso'],['complete','Complete'],['aumentar','Aumentar']].map(([k,n])=>ch(q.goal===k,'qpgoal',k,n)).join('')}</div>
   <label class="pfl" style="margin:0 0 4px">Restricciones</label><div class="chips" style="margin-bottom:10px">${Object.keys(ALP_PRE).map(n=>ch(!!q.pre[n],'qppre',esc(n),n)).join('')}</div>
   <label class="pfl" style="margin:0 0 4px">Metas ${q.tg?'(editadas)':'(automáticas, puedes cambiarlas)'}</label>
   <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin-bottom:8px">${f('qp_kc','kcal',T.kc)}${f('qp_P','Prot g',T.P)}${f('qp_C','Carbo g',T.C)}${f('qp_F','Grasa g',T.F)}${f('qp_wa','Agua ml',T.water)}</div>
   <div class="chips" style="margin-bottom:12px">${ch(!q.nomac,'qpmac','1','Mostrar kcal y macros en el PDF')}${q.tg?ch(false,'qpauto','1','↺ Volver a automáticas'):''}</div>
   <button class="btn solid" data-act="qppdf" style="width:100%;padding:13px">Exportar plan a PDF</button>
   <div class="note" style="margin-top:8px">Calculado con Mifflin-St Jeor y los mismos platos y porciones de los clientes. Sirve igual para una persona que aún no está registrada.</div></div>`;
}
document.addEventListener('input',e=>{const t=e.target;if(!QP||!t.id||t.id.indexOf('qp_')!==0)return;const v=id=>(document.getElementById(id)||{}).value;
  if(t.id==='qp_name'){QP.name=t.value;return;}
  if(['qp_kc','qp_P','qp_C','qp_F','qp_wa'].includes(t.id)){QP.tg={kc:+v('qp_kc')||0,P:+v('qp_P')||0,C:+v('qp_C')||0,F:+v('qp_F')||0,water:+v('qp_wa')||0,fr:3,vg:3};return;}
  const m={qp_age:['age',16],qp_h:['h',120],qp_w:['w',30]};if(m[t.id]){const n=parseFloat(String(t.value).replace(',','.'));if(n>0){QP[m[t.id][0]]=n;if(!QP.tg){const T=qpWith(QP,()=>alTargets(true));[['qp_kc',T.kc],['qp_P',T.P],['qp_C',T.C],['qp_F',T.F],['qp_wa',T.water]].forEach(([i,x])=>{const el=document.getElementById(i);if(el)el.value=x;});}}}
},true);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act^="qp"]');if(!t)return;const a=t.dataset.act,v=t.dataset.v;e.stopPropagation();e.preventDefault();
  if(a==='qpopen'){QP=qpDef();qpRender();return;}
  if(!QP&&a!=='qpclose')return;
  if(a==='qpclose'){qpClose();return;}
  if(a==='qpfill'){const r=qpParse((document.getElementById('qp_paste')||{}).value||'');if(!r.n){toast('No encontré datos en el texto');return;}Object.assign(QP,r.o);QP.tg=null;qpRender();toast('Detecté: '+r.found.join(' · '));return;}
  if(a==='qpsex'){QP.sex=v;if(!QP.tg){}qpRender();return;}
  if(a==='qpdays'){QP.days=+v;qpRender();return;}
  if(a==='qpgoal'){QP.goal=v;QP.tg=null;qpRender();return;}
  if(a==='qppre'){QP.pre[v]=!QP.pre[v];qpRender();return;}
  if(a==='qpmac'){QP.nomac=!QP.nomac;qpRender();return;}
  if(a==='qpauto'){QP.tg=null;qpRender();return;}
  if(a==='qppdf'){if(!QP.name.trim()){toast('Escribe el nombre');return;}try{alpPrint(qpWith(QP,()=>alpPdfHTML()));}catch(x){console.warn(x);toast('No se pudo generar el PDF');}return;}
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&QP)qpClose();});


function qpParse(t){
  const o={},found=[];t=String(t||'');
  const g=(re)=>{const m=t.match(re);return m?m[1]:null;};
  const first=(t.split(/\n/).map(x=>x.trim()).filter(Boolean)[0]||'').replace(/^["'“”\s*#-]+/,'');
  let nm=g(/nombre\s*[:：]\s*\**\s*([^\n·|]+)/i);
  if(!nm){const m=first.match(/^([A-ZÁÉÍÓÚÑ][\wáéíóúñ]+(?: [A-ZÁÉÍÓÚÑ][\wáéíóúñ]+){0,3})(?=\s+(?:consolidad|datos|ficha)|$)/);if(m)nm=m[1];}
  if(nm){o.name=nm.trim();found.push(o.name);}
  const sx=g(/sexo\s*[:：]?\s*\**\s*(masculino|femenino|hombre|mujer|male|female)/i);
  if(sx){o.sex=/^(m(asc|ale)|hombre)/i.test(sx)?'Hombre':'Mujer';found.push(o.sex);}
  const ed=g(/edad\s*[:：]?\s*\**\s*(\d{1,2})/i);if(ed){o.age=+ed;found.push(ed+' años');}
  const ht=g(/estatura\s*[:：]?\s*\**\s*(\d{3}|\d[.,]\d{1,2})/i);if(ht){let h=parseFloat(ht.replace(',','.'));if(h<3)h*=100;o.h=Math.round(h);found.push(o.h+' cm');}
  const wt=g(/\bpeso\s*[:：]?\s*\**\s*(\d{2,3}(?:[.,]\d)?)\s*kg/i);if(wt){o.w=parseFloat(wt.replace(',','.'));found.push(o.w+' kg');}
  const dy=g(/(\d)\s*d[ií]as?\s*(?:\/|por|a la)?\s*(?:sem|semana)/i);if(dy&&+dy>=1&&+dy<=7){o.days=+dy;found.push(dy+' días');}
  const ob=(t.match(/objetivo[^\n]*(?:\n[^\n]*){0,2}/i)||[''])[0].toLowerCase();
  if(ob){let gl=null;if(/bajar|perder|p[eé]rdida de peso|definici|d[eé]ficit/.test(ob))gl='bajar';else if(/aument|ganar|volumen|super[aá]vit|lean gain|bulk/.test(ob))gl='aumentar';else if(/complete|recomposici|mantener|mantenimiento/.test(ob))gl='complete';if(gl){o.goal=gl;found.push({bajar:'Bajar peso',aumentar:'Aumentar',complete:'Complete'}[gl]);}}
  const al=(t.match(/(?:alergias?|intolerancias?|restricciones?|alimentaci[oó]n)[^\n]*/gi)||[]).join(' ').toLowerCase();
  const pre={};if(/lactosa|l[aá]cteo/.test(al))pre['Sin lácteos']=1;if(/huevo/.test(al))pre['Sin huevo']=1;if(/gluten|cel[ií]aco/.test(al))pre['Sin gluten']=1;
  if(/vegano/.test(al)){pre['Sin carnes']=1;pre['Sin lácteos']=1;pre['Sin huevo']=1;}else if(/vegetarian/.test(al))pre['Sin carnes']=1;
  if(Object.keys(pre).length){o.pre=pre;found.push(Object.keys(pre).join(', '));}
  return {o,found,n:found.length};
}
(function(){const st=document.createElement('style');st.textContent='.cpbadge{display:inline-block;margin-top:4px;background:#C0392B;color:#fff;font:700 10px Archivo,sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:3px 8px;border-radius:99px}';document.head.appendChild(st);})();


/* ===== Recetario por culturas (21 nov) — piloto México + España + etiquetas Colombia ===== */
(function(){
/* alimentos nuevos: [g por porción, unidad natural|null, kcal/100g, P, C, G] */
Object.assign(AL_FD,{
 'Tortilla de maíz':[90,[30,'tortilla','tortillas'],218,5.7,45,2.9],
 'Garbanzos':[150,null,164,9,27,2.6],
 'Camarones':[110,null,99,24,0.2,0.3],
 'Bacalao / merluza':[110,null,90,20,0,0.7],
 'Salmón':[110,null,208,20,0,13],
 'Nopales':[150,null,16,1.3,3.3,0.1]});
Object.assign(AL_FE,{'Tortilla de maíz':'🫓','Garbanzos':'🫘','Camarones':'🦐','Bacalao / merluza':'🐟','Salmón':'🐟','Nopales':'🌵'});
AL_G.prot[4].splice(7,0,'Camarones','Bacalao / merluza','Salmón');
AL_G.carb[4].push('Tortilla de maíz','Garbanzos');
AL_G.veg[4].splice(AL_G.veg[4].length-1,0,'Nopales');
ALP_PRE['Sin carnes']=ALP_PRE['Sin carnes'].concat(['Camarones','Bacalao / merluza','Salmón']);
const R=(r,e)=>({r:r,e:e});
AL_O.d.push(
 ['Huevos rancheros','🍳🫓🍅',{p:'Huevos',c:'Tortilla de maíz',v:'Tomate',f:'Aguacate (½)'},R('Calienta las tortillas en sartén seca. Fríe o poché los huevos y ponlos encima. Cubre con salsa de tomate picado, cebolla, limón y chile al gusto. Termina con aguacate.')],
 ['Pan con tomate y huevo','🍞🍅🍳',{p:'Huevos',c:'Pan integral',v:'Tomate',f:'Aceite de oliva'},R('Tuesta el pan, frota medio ajo y ralla tomate maduro encima. Rocía aceite de oliva y sal. Sirve con los huevos a la plancha o revueltos.')]);
AL_O.a.push(
 ['Tacos de pollo con nopales','🌮🍗🌵',{p:'Pechuga de pollo',c:'Tortilla de maíz',v:'Nopales',f:'Aguacate (½)'},R('Cocina el pollo en tiras con cebolla y comino. Asa los nopales en cuadritos 5 min. Arma los tacos en tortilla de maíz con tomate picado, cilantro y limón.')],
 ['Potaje de garbanzos con bacalao','🍲🫘🐟',{p:'Bacalao / merluza',c:'Garbanzos',v:'Espinaca',f:'Aceite de oliva'},R('Sofríe cebolla, ajo y una cucharadita de paprika en poco aceite. Añade los garbanzos cocidos, caldo y la espinaca; cocina 10 min. Suma el bacalao (o merluza) en trozos los últimos 5 min.')],
 ['Paella ligera de pollo','🥘🍗🫑',{p:'Pechuga de pollo',c:'Arroz',v:'Pimentón',f:'Aceite de oliva'},R('Dora el pollo en cubos con ajo y paprika en una sartén amplia. Añade el pimentón en tiras, el arroz y el doble de caldo con una pizca de cúrcuma o azafrán. 18 min a fuego medio sin revolver.')]);
AL_O.m.push(
 ['Mango con limón y chile','🥭🌶️🧀',{p:'Queso campesino / requesón',fr:'Mango'},R('Corta el mango en tiras, exprime limón y espolvorea chile en polvo con una pizca de sal. Acompaña con el queso fresco.')]);
AL_O.c.push(
 ['Aguachile de camarón','🦐🥒🍋',{p:'Camarones',c:'Tortilla de maíz',v:'Pepino',f:'Aguacate (½)'},R('Saltea los camarones 2 min con ajo y déjalos enfriar. Mézclalos con jugo de limón, chile, pepino en rodajas y cebolla morada. Sirve con tortilla de maíz tostada y aguacate.')],
 ['Tortilla española ligera','🍳🥔🧅',{p:'Huevos',c:'Papa',v:'Ensalada',f:'Aceite de oliva'},R('Cocina la papa en rodajas finas y la cebolla a fuego bajo con poco aceite (o al horno). Mézclalas con los huevos batidos y cuaja 4 min por lado. Sirve con ensalada.')]);
/* cultura de cada opción */
window.AL_CULS=[['co','🇨🇴','Colombia'],['mx','🇲🇽','México'],['es','🇪🇸','España'],['pe','🇵🇪','Perú'],['eu','🇪🇺','Europa'],['us','🇺🇸','EE. UU.'],['au','🇦🇺','Australia']];
window.AL_CUL={'Arepa con huevos':'co','Pollo con fríjol':'co','Cerdo con yuca':'co','Atún con arepa':'co','Crema de pollo':'co',
 'Huevos rancheros':'mx','Tacos de pollo con nopales':'mx','Mango con limón y chile':'mx','Aguachile de camarón':'mx',
 'Pan con tomate y huevo':'es','Potaje de garbanzos con bacalao':'es','Paella ligera de pollo':'es','Tortilla española ligera':'es'};
const of=alpOptOk;alpOptOk=function(m,i){if(!of.apply(this,arguments))return false;const c=(typeof S!=='undefined'&&S)?S.alcul:null;return !c||c==='all'||AL_CUL[AL_O[m][i][0]]===c||(m==='m'&&!AL_CUL[AL_O[m][i][0]]);};
const dy=alDay;alDay=function(){let h=dy.apply(this,arguments);const cur=S.alcul||'all',have=AL_CULS.filter(c=>Object.values(AL_CUL).includes(c[0]));
 Object.keys(AL_CUL).forEach(n=>{const fl=(AL_CULS.find(c=>c[0]===AL_CUL[n])||[])[1];if(fl)h=h.split('<b>'+esc(n)+'</b></button>').join('<b>'+esc(n)+'</b><span class="alfl">'+fl+'</span></button>');});
 const chips=`<div class="alcul"><button class="${cur==='all'?'on':''}" data-alcul="all">🍽 Todas</button>${have.map(c=>`<button class="${cur===c[0]?'on':''}" data-alcul="${c[0]}">${c[1]} ${c[2]}</button>`).join('')}</div>`;
 if(cur!=='all')h=h.split('<div class="note">Tu coach está preparando tus opciones.</div>').join('<div class="note">Aún no hay opciones de esta cultura para esta comida.</div>');
 return chips+h;};
const st=document.createElement('style');st.textContent='.alcul{display:flex;gap:8px;overflow-x:auto;padding:2px 0 10px;scrollbar-width:none}.alcul::-webkit-scrollbar{display:none}.alcul button{flex:0 0 auto;border:2px solid #DCD6CC;background:#FBFAF8;border-radius:99px;padding:8px 14px;font:700 13px Archivo,sans-serif;color:#1C1B19}.alcul button.on{background:#1C1B19;border-color:#1C1B19;color:#fff}.alfl{display:block;margin-top:4px;font-size:14px;line-height:1}';
document.head.appendChild(st);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-alcul]');if(!t)return;e.stopPropagation();S.alcul=t.dataset.alcul;try{save();}catch(x){}render();},true);
})();


/* ===== Recetario por culturas, parte 2: Perú, Europa, EE. UU., Australia (21 nov) ===== */
(function(){
const R=(r,e)=>({r:r,e:e});
const add=(m,c,n,e,comp,r)=>{AL_O[m].push([n,e,comp,R(r)]);AL_CUL[n]=c;};
/* Perú */
add('d','pe','Quinua caliente con yogurt','🥣🌾🍎',{p:'Yogurt griego',c:'Quinua',fr:'Manzana'},'Cocina la quinua con canela y un chorrito de agua hasta que quede cremosa. Sírvela tibia con el yogurt y la manzana en cubitos.');
add('a','pe','Lomo saltado ligero','🥩🍅🍚',{p:'Carne magra',c:'Arroz',v:'Tomate'},'Saltea la carne en tiras en sartén muy caliente con cebolla, tomate, ajo y un chorrito de salsa de soya. Sirve sobre el arroz con cilantro.');
add('a','pe','Ceviche con camote','🐟🍋🍠',{p:'Pescado',c:'Batata',v:'Cebolla',f:'Aguacate (½)'},'Usa pescado muy fresco en cubos y báñalo 3–5 min en jugo de limón con sal, ají y cebolla morada (o cocínalo 2 min en sartén). Sirve con la batata cocida y aguacate.');
add('c','pe','Ají de gallina ligero','🍗🥔🌶️',{p:'Pechuga de pollo',c:'Papa',v:'Ensalada',f:'Almendras / maní / nueces'},'Desmecha el pollo cocido. Licúa nueces con caldo, ají amarillo (o pimentón con una pizca de cúrcuma) y un poco de leche; calienta con el pollo. Sirve con la papa cocida y ensalada.');
/* Europa (mediterránea / italiana / griega) */
add('d','eu','Bruschetta de requesón y tomate','🍞🧀🍅',{p:'Queso campesino / requesón',c:'Pan integral',v:'Tomate',f:'Aceite de oliva'},'Tuesta el pan, unta el requesón y cubre con tomate picado, albahaca, sal y aceite de oliva.');
add('a','eu','Pasta con salmón y espinaca','🍝🐟🥬',{p:'Salmón',c:'Pasta',v:'Espinaca'},'Cocina la pasta al dente. Dora el salmón en trozos con ajo, añade la espinaca y un chorrito de limón. Mezcla todo con un poco del agua de la pasta.');
add('a','eu','Pollo griego con papas','🍗🥔🥒',{p:'Pechuga de pollo',c:'Papa',v:'Pepino',f:'Aceite de oliva'},'Marina el pollo con limón, orégano y ajo. Hornea o dora con las papas en cuñas. Sirve con pepino, tomate y yogurt si quieres.');
add('c','eu','Merluza al horno con verduras','🐟🥒🥔',{p:'Bacalao / merluza',c:'Papa',v:'Calabacín',f:'Aceite de oliva'},'Pon la merluza sobre rodajas de papa y calabacín con ajo, limón y aceite. Hornea a 190 °C unos 20 min.');
/* EE. UU. */
add('d','us','Overnight oats de maní y banano','🥣🥜🍌',{p:'Yogurt griego',c:'Avena',f:'Mantequilla de maní',fr:'Banano'},'En un frasco mezcla avena, yogurt y la mantequilla de maní. Déjalo en la nevera toda la noche y termina con el banano en rodajas.');
add('a','us','Hamburguesa casera con ensalada','🍔🥬🥑',{p:'Carne magra',c:'Pan integral',v:'Lechuga',f:'Aguacate (½)'},'Forma la carne con sal, pimienta y cebolla en polvo y dórala a la plancha. Arma con el pan, lechuga, tomate y aguacate. Sin papas fritas: ensalada al lado.');
add('a','us','Chili de carne con fríjol','🌶️🥩🫘',{p:'Carne magra',c:'Fríjol / lenteja',v:'Pimentón'},'Sofríe cebolla, ajo y pimentón con la carne molida. Añade el fríjol, tomate triturado, comino y paprika; cocina a fuego bajo 25 min.');
add('c','us','Salmón al horno con batata','🐟🍠🥦',{p:'Salmón',c:'Batata',v:'Brócoli'},'Hornea el salmón y la batata en cuñas a 200 °C unos 20 min con sal, pimienta y limón. Acompaña con el brócoli al vapor.');
/* Australia */
add('d','au','Smashed avo con huevo','🥑🍞🍳',{p:'Huevos',c:'Pan integral',v:'Tomate',f:'Aguacate (½)'},'Aplasta el aguacate con limón, sal y pimienta sobre el pan tostado. Corona con el huevo pochado y tomate en rodajas.');
add('a','au','Pescado al horno con papas','🐟🥔🥗',{p:'Pescado',c:'Papa',v:'Ensalada',f:'Aceite de oliva'},'Hornea el pescado y las papas en cuñas con limón y un chorrito de aceite a 200 °C. Es el fish and chips en versión ligera. Sirve con ensalada.');
add('c','au','Ensalada de camarón y aguacate','🦐🥑🌾',{p:'Camarones',c:'Quinua',v:'Lechuga',f:'Aguacate (½)'},'Saltea los camarones 2 min con ajo y limón. Sirve sobre lechuga con la quinua y el aguacate en cubos.');
add('m','au','Yogurt con mango y maracuyá','🥣🥭',{p:'Yogurt griego',fr:'Mango'},'Mezcla el yogurt con mango en cubos y la pulpa de 1 maracuyá. Fresco y listo en 1 minuto.');
})();


/* ===== Cómo prepararlo para TODAS las opciones (21 nov) ===== */
(function(){
const T={
'd|Huevos con avena':'Cocina la avena con agua o leche 3–4 min. Prepara los huevos revueltos o fritos a tu gusto. Sirve con el banano en rodajas encima de la avena.',
'd|Yogurt con granola':'Sirve el yogurt en un bowl, añade la granola justo antes de comer para que quede crocante y termina con las fresas.',
'd|Arepa con huevos':'Asa la arepa en sartén o tostadora. Prepara los huevos pericos (con tomate y cebolla) o fritos y sírvelos con el aguacate.',
'd|Tostadas con huevo':'Tuesta el pan, prepara los huevos a la plancha o revueltos y ponlos encima. Acompaña con la manzana.',
'd|Omelette de vegetales':'Saltea la espinaca con cebolla 1 min. Bate los huevos, viértelos en la sartén y añade las verduras. Dobla y sirve con el pan tostado.',
'd|Arepa con pollo y aguacate':'Abre la arepa caliente, rellénala con pollo desmechado y aguacate en láminas. Tip: desmecha pollo de sobra en tanda.',
'd|Tostadas con atún':'Mezcla el atún escurrido con limón y un poco de cebolla. Ponlo sobre el pan tostado con el aguacate. Acompaña con la papaya.',
'a|Pollo con arroz':'Dora la pechuga en sartén 5–6 min por lado con sal, ajo y pimienta. Sirve con el arroz, una ensalada grande y el aguacate.',
'a|Carne con papa':'Sella la carne en sartén caliente 3–4 min por lado. Cocina la papa al vapor o al horno. Sirve con el brócoli salteado y un chorrito de aceite de oliva.',
'a|Pescado con quinua':'Cocina la quinua (1 parte por 2 de agua, 15 min). Dora el pescado 3–4 min por lado con limón. Sirve con ensalada y aceite de oliva.',
'a|Pollo con fríjol':'Dora el pollo con sal y comino. Calienta el fríjol o la lenteja ya cocidos con un poco de cebolla y ajo. Sirve con ensalada y aguacate.',
'a|Pasta con pollo':'Cocina la pasta al dente. Saltea el pollo en cubos con ajo y el brócoli. Mezcla todo con un chorrito de aceite de oliva y pimienta.',
'a|Cerdo con yuca':'Cocina la yuca en agua con sal hasta que esté blanda. Asa el cerdo magro a la plancha con ajo y limón. Sirve con ensalada y el aguacate.',
'm|Yogurt con fruta':'Sirve el yogurt con las fresas picadas. Listo en 1 minuto.',
'm|Frutos secos y fruta':'Acompaña el queso o requesón con el puñado de frutos secos y la manzana en gajos.',
'm|Huevos duros':'Cuece los huevos 10 min en agua hirviendo, enfríalos y pélalos. Tip: cuece varios para la semana (duran 5 días en nevera). Come con el banano.',
'm|Atún con arepa':'Mezcla el atún con limón y cebolla. Sirve sobre la arepa asada y acompaña con la naranja.',
'm|Queso con fruta':'Corta el queso en cubos y la piña en trozos. Combínalos en un plato o en palillos.',
'm|Pollo desmechado y fruta':'Usa el pollo desmechado que tengas de la tanda y acompáñalo con la manzana en gajos.',
'm|Atún con aguacate':'Mezcla el atún con el aguacate machacado, limón y sal. Come con cuchara o sobre galletas de arroz. Acompaña con la naranja.',
'c|Pollo con verduras':'Dora el pollo en tiras con ajo. Añade el brócoli y saltea 4 min. Sirve con el arroz (poco) y el aguacate.',
'c|Tortilla de huevos':'Cuece la papa en rodajas finas. Bate los huevos, mézclalos con la papa y cuaja en sartén con un chorrito de aceite, 3–4 min por lado. Sirve con ensalada.',
'c|Pescado con batata':'Hornea la batata en cuñas a 200 °C unos 25 min. Dora el pescado con limón 3–4 min por lado. Sirve con el brócoli al vapor y aceite de oliva.',
'c|Carne con ensalada':'Sella la carne 3–4 min por lado y déjala reposar 2 min. Sirve con una ensalada grande aderezada con aceite de oliva y el arroz (poco).',
'c|Crema de pollo':'Cuece la papa y la zanahoria en caldo 15 min. Añade el pollo cocido y licúa todo hasta que quede cremoso. Termina con aceite de oliva.',
'c|Atún con ensalada':'Mezcla el atún con limón. Arma una ensalada grande, pon el atún encima con el aguacate y acompaña con el pan tostado.'};
let n=0;AL_M.forEach(([k])=>AL_O[k].forEach(o=>{const t=T[k+'|'+o[0]];if(t&&!(o[3]&&o[3].r)){o[3]=Object.assign({},o[3]||{},{r:t});n++;}}));
window.AL_REC_N=n;
})();


/* ===== Lista de compras semanal (21 nov) ===== */
(function(){
const CAT=[['p','Proteínas','#C0392B','🍗'],['c','Carbohidratos','#C7872A','🍚'],['v','Vegetales','#2F8E57','🥬'],['f','Grasas buenas','#6E8B3D','🥑'],['fr','Frutas','#B23E6E','🍎']];
/* las porciones del plan son cocidas; para comprar se convierten a crudo */
const BUY={'Arroz':.37,'Pasta':.4,'Quinua':.35,'Fríjol / lenteja':.4,'Garbanzos':.4,'Pechuga de pollo':1.3,'Muslo de pollo':1.3,'Carne magra':1.3,'Cerdo magro':1.3,'Pescado':1.25,'Salmón':1.25,'Bacalao / merluza':1.25,'Camarones':1.2};
const SH=()=>{S.alshop=S.alshop||{sel:{d:[],a:[],m:[],c:[]},days:7,chk:{}};S.alshop.sel=S.alshop.sel||{d:[],a:[],m:[],c:[]};S.alshop.chk=S.alshop.chk||{};return S.alshop;};
const goal=()=>(S.goal==='bajar'||S.goal==='aumentar')?S.goal:'complete';
function okOpts(m){const keep=S.alcul;S.alcul='all';try{return AL_O[m].map((o,i)=>[o,i]).filter(x=>alpOptOk(m,x[1]));}finally{S.alcul=keep;}}
function planOpts(m){let L=AL_O[m].filter((o,i)=>alpOptOk(m,i));if(!L.length){const keep=S.alcul;S.alcul='all';try{L=AL_O[m].filter((o,i)=>alpOptOk(m,i));}finally{S.alcul=keep;}}return L;}
function recent(){const out={d:[],a:[],m:[],c:[]},t=today();for(let i=0;i<7;i++){const d=addD(t,-i),st=(S.alim||{})[d]||{};AL_M.forEach(([k])=>{const e=(st[k]||{}).eat;if(e!=null&&AL_O[k][e]&&!out[k].includes(AL_O[k][e][0]))out[k].push(AL_O[k][e][0]);});}return out;}
function calc(){const sh=SH(),por=AL_PORC[goal()],tot={};
  AL_M.forEach(([k])=>{const L=planOpts(k);if(!L.length)return;const times=sh.days/L.length;
    L.forEach(o=>{Object.keys(o[2]).forEach(q=>{const food=o[2][q],f=alFd(food),g=alMul(por[k][q]||'1')*f[0]*times*(BUY[food]||1),key=q+'|'+food;tot[key]=(tot[key]||0)+g;});});});
  return CAT.map(([q,n,c,ic])=>({q,n,c,ic,rows:Object.keys(tot).filter(k=>k.split('|')[0]===q).map(k=>{const food=k.slice(q.length+1),f=alFd(food),g=tot[k];let txt;
      if(f[1]&&f[1][0]){const u=Math.max(1,Math.ceil(g/f[1][0]-0.01));txt=u+' '+(u>1?f[1][2]:f[1][1]);}
      else{const r=Math.max(50,Math.ceil(g/50)*50);txt=r>=1000?(r/1000).toString().replace('.',',')+' kg':r+' g';}
      return {key:k,food,txt,e:AL_FE[food]||(food==='Pechuga de pollo'?'🍗':'')};}).sort((a,b)=>a.food.localeCompare(b.food,'es'))})).filter(c=>c.rows.length);}
function asText(){const sh=SH(),L=calc();return '🛒 Lista de compras · '+sh.days+' días · según mi plan\n\n'+L.map(c=>c.ic+' '+c.n+'\n'+c.rows.map(r=>'• '+r.food.replace(/ \(½\)/,'')+': '+r.txt).join('\n')).join('\n\n')+'\n\n(Cantidades aproximadas, en crudo. ERRE Complete)';}
function view(){const sh=SH(),L=calc();
  const days=[3,5,7].map(d=>`<button class="${sh.days===d?'on':''}" data-alshop="days" data-v="${d}">${d} días</button>`).join('');
  const cul=S.alcul&&S.alcul!=='all'&&AL_CULS?(AL_CULS.find(c=>c[0]===S.alcul)||[])[1]:'';
  const list=L.map(c=>`<div class="alsl" style="--c:${c.c}"><h4>${c.ic} ${c.n}</h4>${c.rows.map(r=>`<button class="alsr${sh.chk[r.key]?' ok':''}" data-alshop="chk" data-k="${esc(r.key)}"><i>${sh.chk[r.key]?'✓':''}</i><span>${r.e} ${esc(r.food.replace(/ \(½\)/,''))}</span><b>${r.txt}</b></button>`).join('')}</div>`).join('');
  const done=Object.values(sh.chk).filter(Boolean).length;
  return `<div class="alsh"><button class="alx" data-alshop="close">‹ Volver</button><div class="big">🛒</div><h2>Lista de compras</h2>
   <p class="alsn" style="margin:-6px 0 10px">Todo tu plan de alimentación, ya calculado${cul?' · '+esc(cul):''}</p>
   <div class="alsd">${days}</div>
   ${list}<div class="alsbt"><button data-alshop="pdf">📄 PDF</button><button data-alshop="copy">📋 Copiar</button><button data-alshop="share">📤 Enviar</button></div>
   ${done?`<button class="alsauto" style="border-color:#B9B2A6;background:#fff;color:#5A554E" data-alshop="clear">↺ Desmarcar todo (${done})</button>`:''}
   <p class="alsn">Cantidades aproximadas, en crudo, según las porciones de tu plan. Marca lo que ya tienes en casa y reparte entre las opciones que más te gusten.</p></div>`;}
function pdfHTML(){const sh=SH(),L=calc(),logo=new URL('erre-logo.png',location.href).href,nm=(S.user&&S.user.name)||'';
  const css=`@page{size:A4;margin:12mm 13mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:Archivo,Helvetica,Arial,sans-serif;color:#1C1B19;margin:0;font-size:13px}.wm{position:fixed;top:50%;left:50%;width:430px;transform:translate(-50%,-50%);opacity:.07}.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DCD6CC;padding-bottom:8px;margin-bottom:12px}.hd img{height:38px}.hd small{color:#5A554E}h1{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;font-size:24px;margin:0 0 2px}.who{color:#5A554E;margin-bottom:10px}.g{break-inside:avoid;margin-bottom:12px}h2{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:15px;margin:0 0 4px;padding-bottom:3px;border-bottom:2px solid var(--c);color:var(--c)}.r{display:flex;align-items:center;gap:8px;padding:5px 2px;border-bottom:1px solid #EFEDE8}.r i{width:13px;height:13px;border:1.5px solid #8b867e;border-radius:3px}.r span{flex:1}.r b{font-weight:700}.nt{color:#5A554E;font-size:11px;margin-top:10px}`;
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Lista de compras</title><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Oswald:wght@600;700&display=swap" rel="stylesheet"><style>${css}</style></head><body><img class="wm" src="${logo}" alt="">
   <div class="hd"><img src="${logo}" alt=""><small>ERRE Complete · Método Complete</small></div><h1>Lista de compras</h1><div class="who">${nm?esc(nm)+' · ':''}${sh.days} días · según tu plan de alimentación</div>
   ${L.map(c=>`<div class="g" style="--c:${c.c}"><h2>${c.ic} ${c.n}</h2>${c.rows.map(r=>`<div class="r"><i></i><span>${r.e} ${esc(r.food.replace(/ \(½\)/,''))}</span><b>${r.txt}</b></div>`).join('')}</div>`).join('')}
   <div class="nt">Cantidades aproximadas, en crudo, según las porciones de tu plan. Reparte entre las opciones que más te gusten.</div></body></html>`;}
function show(){let o=document.getElementById('alshopm');if(!o){o=document.createElement('div');o.id='alshopm';o.style.cssText='position:fixed;inset:0;z-index:9600;background:rgba(28,27,25,.55);display:flex;align-items:flex-end;justify-content:center';document.body.appendChild(o);document.body.style.overflow='hidden';
  o.addEventListener('click',e=>{if(e.target===o)hide();});}
  const keep=o.querySelector('.alsh'),sy=keep?keep.scrollTop:0,op=[...o.querySelectorAll('details')].map(d=>d.open);
  o.innerHTML=view();const sh=o.querySelector('.alsh');o.querySelectorAll('details').forEach((d,i)=>{if(op[i])d.open=true;});sh.scrollTop=sy;}
function hide(){const o=document.getElementById('alshopm');if(o)o.remove();document.body.style.overflow='';}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-alshop]');if(!t)return;e.stopPropagation();const a=t.dataset.alshop,sh=SH();
  if(a==='open'){show();return;}
  if(a==='pdf'){alpPrint(pdfHTML());return;}
  if(a==='close'){hide();return;}
  if(a==='days'){sh.days=+t.dataset.v;sh.chk={};save();show();return;}
  if(a==='tog'){const k=t.dataset.m,n=decodeURIComponent(t.dataset.n),s=sh.sel[k]=sh.sel[k]||[],i=s.indexOf(n);if(i>=0)s.splice(i,1);else s.push(n);sh.chk={};save();show();return;}
  if(a==='chk'){sh.chk[t.dataset.k]=!sh.chk[t.dataset.k];save();show();return;}
  if(a==='auto'){const r=recent();AL_M.forEach(([k])=>sh.sel[k]=r[k].filter(nm=>AL_O[k].some(o=>o[0]===nm)));sh.chk={};save();show();return;}
  if(a==='clear'){sh.chk={};save();show();return;}
  if(a==='copy'){const tx=asText();(navigator.clipboard?navigator.clipboard.writeText(tx):Promise.reject()).then(()=>{t.textContent='✓ Copiada';},()=>{const ta=document.createElement('textarea');ta.value=tx;document.body.appendChild(ta);ta.select();try{document.execCommand('copy');t.textContent='✓ Copiada';}catch(x){}ta.remove();});return;}
  if(a==='share'){const tx=asText();if(navigator.share)navigator.share({text:tx}).catch(()=>{});else{try{navigator.clipboard.writeText(tx);t.textContent='✓ Copiada';}catch(x){}}return;}
},true);
const av=alView;alView=function(){const h=av.apply(this,arguments);return h+`<button class="alshbtn" data-alshop="open"><span>🛒</span><b>Lista de compras</b><small>Todo tu plan, calculado y lista para exportar</small></button>`;};
window.alShopText=asText;window.alShopCalc=calc;
const st=document.createElement('style');st.textContent=`
.alshbtn{display:flex;flex-direction:column;align-items:center;gap:2px;width:100%;margin:14px 0 4px;border:2px solid #1C1B19;background:#FBFAF8;border-radius:16px;padding:14px;font-family:Archivo,sans-serif}.alshbtn span{font-size:26px}.alshbtn b{font:700 16px Archivo,sans-serif}.alshbtn small{color:#5A554E;font-size:12px}
#alshopm .alsd{display:flex;background:#E4DFD6;border-radius:99px;padding:3px;margin:0 0 10px}#alshopm .alsd button{flex:1;border:0;background:none;border-radius:99px;padding:8px;font:700 13px Archivo,sans-serif;color:#5A554E}#alshopm .alsd button.on{background:#1C1B19;color:#fff}
.alsauto{width:100%;border:2px dashed #1F8F53;background:#E7F4EC;color:#1F6B43;border-radius:12px;padding:10px;font:700 14px Archivo,sans-serif;margin-bottom:6px}
.alsl{background:#FBFAF8;border:1px solid #DCD6CC;border-left:6px solid var(--c);border-radius:12px;padding:8px 10px;margin:10px 0}.alsl h4{margin:0 0 4px;font:700 14px Oswald,Archivo,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--c)}
.alsr{display:flex;align-items:center;gap:10px;width:100%;border:0;background:none;border-bottom:1px solid #EFEDE8;padding:9px 2px;font:500 15px Archivo,sans-serif;text-align:left}.alsl .alsr:last-child{border-bottom:0}.alsr i{width:22px;height:22px;flex:0 0 22px;border:2px solid #C9C2B6;border-radius:6px;font-style:normal;color:#fff;font-size:14px;line-height:18px;text-align:center}.alsr span{flex:1}.alsr b{font-weight:700}
.alsr.ok i{background:#1F8F53;border-color:#1F8F53}.alsr.ok span,.alsr.ok b{text-decoration:line-through;color:#9A948A}
.alsbt{display:flex;gap:8px;margin:8px 0}.alsbt button{flex:1;border:0;border-radius:12px;padding:12px 6px;background:#1C1B19;color:#fff;font:700 13px Archivo,sans-serif}.alsbt button:last-child{background:#fff;color:#1C1B19;border:1.5px solid #1C1B19}
.alsn{font-size:12px;color:#5A554E;margin:0 0 6px;text-align:center}.alsq{font:700 15px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.06em;margin:16px 0 6px}
.alsp{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:12px;margin-bottom:8px}.alsp summary{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;font:700 15px Archivo,sans-serif;list-style:none;cursor:pointer}.alsp summary::-webkit-details-marker{display:none}.alsp summary em{font-style:normal;font-weight:600;font-size:12px;color:#5A554E}
.alsc{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 12px}.alsc button{border:1.5px solid #DCD6CC;background:#fff;border-radius:99px;padding:7px 11px;font:500 13px Archivo,sans-serif;color:#1C1B19}.alsc button.on{background:#1F8F53;border-color:#1F8F53;color:#fff}`;
document.head.appendChild(st);
})();


/* ===== Valoración inicial del coach (22 nov): datos · medidas · fotos · movilidad y estabilidad ===== */
var VL=null;
(function(){
const C={0:['#DCD6CC','Sin evaluar'],1:['#1F8F53','Bien'],2:['#B87400','Por mejorar'],3:['#C0392B','Limitado']};
const T={
 mov:[['hombro','Hombros','Elevar y rotar el brazo',2],['toracica','Rotación torácica','Girar la parte alta de la espalda',2],['cadera','Cadera','Flexión y rotación',2],['tobillo','Tobillo','Dorsiflexión: rodilla sobre el pie',2]],
 est:[['manguito','Hombro · manguito rotador','Control en rotación externa',2],['core','Core · abdomen','Control de la zona media',1],['gmax','Glúteo mayor','Fuerza y control',2],['gmed','Glúteo medio','Estabilidad lateral de cadera',2],['cadera_e','Cadera','Estabilidad de la cadera',2]]};
const HS={
 mov:[['hombro','f','d',42,76,13],['hombro','f','i',118,76,13],['cadera','f','d',64,186,13],['cadera','f','i',96,186,13],['tobillo','f','d',66,338,12],['tobillo','f','i',94,338,12],['toracica','b','i',60,104,14],['toracica','b','d',100,104,14]],
 est:[['manguito','b','i',50,84,13],['manguito','b','d',110,84,13],['core','f','u',80,136,0],['gmax','b','i',66,200,14],['gmax','b','d',94,200,14],['gmed','b','i',55,170,11],['gmed','b','d',105,170,11],['cadera_e','f','d',64,186,13],['cadera_e','f','i',96,186,13]]};
const SIDE={i:'izq.',d:'der.',u:''};
const LAY={mov:'Movilidad',est:'Estabilidad'};
const def=()=>({id:null,cid:null,tab:'datos',layer:'mov',view:'edit',list:null,date:today(),dirty:false,busy:false,banner:null,
 d:{name:'',sex:'Mujer',age:'',h:'',w:'',goal:'',les:'',ale:'',med:'',obs:'',raw:''},meas:{},ph:{},ev:{},nt:{mov:'',est:''}});
const get=(t,s)=>(VL.ev[t+'|'+s]||0);
const LIM='<g fill="none" stroke="#E4DED2" stroke-linecap="round" stroke-linejoin="round"><path d="M46 70 Q32 112 26 150 L22 208" stroke-width="15"/><path d="M114 70 Q128 112 134 150 L138 208" stroke-width="15"/><path d="M67 178 L65 264 L62 346" stroke-width="25"/><path d="M93 178 L95 264 L98 346" stroke-width="25"/></g><ellipse cx="58" cy="360" rx="13" ry="5" fill="#E4DED2"/><ellipse cx="102" cy="360" rx="13" ry="5" fill="#E4DED2"/>';
const TOR='<path d="M44 62 Q80 52 116 62 L108 118 Q104 152 100 182 L60 182 Q56 152 52 118 Z" fill="#EFEDE8" stroke="#CFC8BB" stroke-width="1.5"/>';
const HEAD='<circle cx="80" cy="26" r="17" fill="#EFEDE8" stroke="#CFC8BB" stroke-width="1.5"/><rect x="73" y="41" width="14" height="14" rx="4" fill="#EFEDE8" stroke="#CFC8BB" stroke-width="1.5"/>';
const BODY={f:LIM+TOR+HEAD+'<circle cx="80" cy="150" r="1.8" fill="#CFC8BB"/>',b:LIM+TOR+HEAD+'<path d="M80 58 L80 176" stroke="#CFC8BB" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M80 182 Q80 196 80 206" stroke="#CFC8BB" stroke-width="1.2"/>'};
function fig(view,layer,ev,live,w){
  const dots=HS[layer].filter(h=>h[1]===view).map(([t,v,s,x,y,r])=>{const st=ev[t+'|'+s]||0,col=C[st][0],lab=s==='u'?'':(s==='i'?'I':'D'),a=live?` data-vl="hs" data-t="${t}" data-s="${s}" style="cursor:pointer"`:'';
    const shape=t==='core'?`<ellipse cx="${x}" cy="${y}" rx="24" ry="25" fill="${col}" fill-opacity="${st?1:.55}" stroke="#fff" stroke-width="2.5"/>`:`<circle cx="${x}" cy="${y}" r="${r}" fill="${col}" fill-opacity="${st?1:.55}" stroke="#fff" stroke-width="2.5"/>`;
    return `<g${a}>${shape}${t==='core'?`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="10" font-weight="700" fill="${st?'#fff':'#5A554E'}" font-family="Archivo,Arial,sans-serif" pointer-events="none">CORE</text>`:''}${lab?`<text x="${x}" y="${y+4}" text-anchor="middle" font-size="11" font-weight="700" fill="${st?'#fff':'#5A554E'}" font-family="Archivo,Arial,sans-serif" pointer-events="none">${lab}</text>`:''}</g>`;}).join('');
  return `<svg viewBox="0 0 160 372" ${w?`width="${w}"`:''} role="img" aria-label="${view==='f'?'Frente':'Espalda'}">${BODY[view]}${dots}</svg>`;}
const figs=(layer,live,w)=>`<div class="vlfg"><div>${fig('f',layer,VL.ev,live,w)}<small>Frente</small></div><div>${fig('b',layer,VL.ev,live,w)}<small>Espalda</small></div></div>`;
function prio(){const out=[];['mov','est'].forEach(l=>T[l].forEach(([k,n,,ns])=>(ns===2?['d','i']:['u']).forEach(s=>{const st=get(k,s);if(st>=2)out.push({st,l,txt:n+(s==='u'?'':' '+SIDE[s])});})));return out.sort((a,b)=>b.st-a.st);}
function cnt(l){const c=[0,0,0,0];T[l].forEach(([k,n,,ns])=>(ns===2?['d','i']:['u']).forEach(s=>c[get(k,s)]++));return c;}
const age=bd=>{if(!bd)return '';const b=new Date(bd+'T12:00:00'),n=new Date();let a=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))a--;return a>0&&a<100?String(a):'';};
const num=v=>{const n=parseFloat(String(v).replace(',','.'));return isFinite(n)?n:null;};
const fm=v=>v==null?'—':(Math.round(v*10)/10).toString().replace('.',',');
function parse(t){const r=qpParse(t),o=r.o,found=r.found.slice(),src=String(t||'').replace(/\r/g,'').replace(/[ \t]+[*•]\s+/g,'\n').replace(/^[\s*•-]+/gm,'');
  const none=/^(ninguna?|no|n\/a|sin [\wáéíóú ]+|-|—)(\s+registrad[ao]s?)?\.?$/i;
  const line=(re,k,l)=>{const m=src.match(re);if(!m)return;let v=m[1].trim().replace(/\*+/g,'').trim();if(!v)return;if(none.test(v))v='Ninguna';o[k]=v;found.push(l);};
  line(/(?:^|\n)\s*(?:lesion(?:es)?|molestias?|dolor(?:es)?)[^:\n]*[:：]\s*([^\n]+)/i,'les','Lesiones');
  line(/(?:^|\n)\s*alergias?[^:\n]*[:：]\s*([^\n]+)/i,'ale','Alergias');
  line(/(?:^|\n)\s*medicaci[oó]n[^:\n]*[:：]\s*([^\n]+)/i,'med','Medicación');
  line(/(?:^|\n)\s*(?:observaciones?|condici[oó]n m[eé]dica|antecedentes)[^:\n]*[:：]\s*([^\n]+)/i,'obs','Observaciones');
  const g=src.match(/(?:^|\n)\s*objetivo[^:\n]*[:：]\s*([^\n]+)/i);if(g&&g[1].trim()){o.goalTxt=g[1].replace(/\*+/g,'').trim();}
  return {o,found,n:found.length};}
function fill(r){const o=r.o,d=VL.d;if(o.name)d.name=o.name;if(o.sex)d.sex=o.sex;if(o.age)d.age=String(o.age);if(o.h)d.h=String(o.h);if(o.w)d.w=String(o.w).replace('.',',');
  if(o.goalTxt)d.goal=o.goalTxt;else if(o.goal)d.goal={bajar:'Bajar peso',aumentar:'Aumentar masa',complete:'Complete (recomposición)'}[o.goal];
  ['les','ale','med','obs'].forEach(k=>{if(o[k]!=null)d[k]=o[k];});}
const inp=(p,l,v,ty,ph)=>`<label class="vlfl">${l}<input class="vlin" data-vp="${p}" value="${esc(v||'')}" inputmode="${ty||'text'}" ${ph?`placeholder="${esc(ph)}"`:''}></label>`;
const ta=(p,l,v,ph,rows)=>`<label class="vlfl">${l}<textarea class="vlin" data-vp="${p}" rows="${rows||2}" placeholder="${esc(ph||'')}">${esc(v||'')}</textarea></label>`;
function tabDatos(){const d=VL.d;return `<div class="vlpaste"><b>📋 Pega aquí el formulario del cliente</b><small>El texto que te dio Claude o el que llenó el cliente. Se rellena solo.</small><textarea class="vlin" id="vl_paste" rows="4" placeholder="Nombre, sexo, edad, estatura, peso, lesiones, alergias, objetivo…"></textarea><button class="vlb2" data-vl="fill">✨ Rellenar con lo pegado</button></div>
  ${VL.banner||''}
  <div class="vlg">${inp('d.name','Nombre',d.name,'text','Ej. Yojan Taborda')}<label class="vlfl">Sexo<div class="vlchips"><button class="vlchip${d.sex==='Mujer'?' on':''}" data-vl="sex" data-v="Mujer">Mujer</button><button class="vlchip${d.sex==='Hombre'?' on':''}" data-vl="sex" data-v="Hombre">Hombre</button></div></label>
   ${inp('d.age','Edad',d.age,'numeric')}${inp('d.h','Estatura (cm)',d.h,'numeric')}${inp('d.w','Peso (kg)',d.w,'decimal')}<label class="vlfl">Fecha de valoración<input class="vlin" type="date" data-vp="date" value="${VL.date}"></label></div>
  ${inp('d.goal','Objetivo',d.goal,'text','Ej. Recomposición: mantener peso y construir músculo')}
  ${ta('d.les','Lesiones o molestias',d.les,'Ninguna registrada')}${ta('d.ale','Alergias',d.ale,'Ninguna registrada',1)}${ta('d.med','Medicación',d.med,'Ninguna',1)}${ta('d.obs','Observaciones / condición médica',d.obs,'Ninguna',2)}
  ${d.raw?`<details class="vld"><summary>Texto original pegado</summary><pre>${esc(d.raw)}</pre></details>`:''}`;}
function tabMed(){const g=MED_IN(),dv=medDerived({peso:VL.d.w,talla:VL.d.h,cintura:VL.meas.cintura,cadera:VL.meas.cadera,pl_tri:VL.meas.pl_tri,pl_sub:VL.meas.pl_sub,pl_bic:VL.meas.pl_bic,pl_ili:VL.meas.pl_ili,pl_sup:VL.meas.pl_sup,pl_abd:VL.meas.pl_abd,pl_mus:VL.meas.pl_mus,pl_pan:VL.meas.pl_pan});
  return `${VL.cid?`<button class="vlb2" data-vl="lastmed" style="margin-bottom:10px">↧ Traer la última medición del cliente</button>`:''}
  ${g.map(([n,fs])=>`<h4 class="vlh4">${n==='Perímetros'?'📏 Perímetros (cm)':'🧷 Pliegues cutáneos (mm)'}</h4><div class="vlg3">${fs.map(([k,nm])=>inp('meas.'+k,nm.replace(/\s*\(.*?\)/g,''),VL.meas[k],'decimal')).join('')}</div>`).join('')}
  ${dv.length?`<div class="vlder">${dv.map(([n,v,u])=>`<span><b>${fm(v)}${u?' '+u:''}</b>${n}</span>`).join('')}</div>`:''}<div class="vlnote">Todo es opcional. Peso y estatura salen de la pestaña Datos.</div>`;}
const PHS=[['f','Frente'],['pd','Perfil derecho'],['pi','Perfil izquierdo'],['b','Espalda']];
function tabFotos(){return `<div class="vlph">${PHS.map(([k,n])=>`<div class="vlpc">${VL.ph[k]?`<img src="${VL.ph[k]}" alt="${n}"><button class="vlx" data-vl="phdel" data-k="${k}" aria-label="Quitar">✕</button>`:`<label class="vlempty"><span>📷</span><b>${n}</b><small>Tocar para subir</small><input type="file" accept="image/*" data-vlph="${k}" hidden></label>`}${VL.ph[k]?`<b class="vlpn">${n}</b>`:''}</div>`).join('')}</div><div class="vlnote">Las fotos se guardan comprimidas dentro de la valoración y salen en el PDF. Pide autorización al cliente antes de guardarlas.</div>`;}
function tabMov(){const l=VL.layer,c=cnt(l);
  return `<div class="vlseg">${['mov','est'].map(k=>`<button class="${l===k?'on':''}" data-vl="layer" data-v="${k}">${k==='mov'?'🦴':'🧱'} ${LAY[k]}</button>`).join('')}</div>
  ${figs(l,true)}<div class="vlleg">${[1,2,3,0].map(v=>`<span><i style="background:${C[v][0]}"></i>${C[v][1]} <b>${c[v]}</b></span>`).join('')}</div>
  <div class="vlnote" style="text-align:center;margin:-2px 0 10px">Toca un punto del cuerpo para cambiar su color · <b>I</b> = izquierdo del cliente, <b>D</b> = derecho</div>
  ${T[l].map(([k,n,ds,ns])=>`<div class="vlr"><div class="vlrt"><b>${n}</b><small>${ds}</small></div><div class="vlsd">${(ns===2?['d','i']:['u']).map(s=>`<div class="vls">${s==='u'?'':`<em>${s.toUpperCase()}</em>`}${[1,2,3].map(v=>`<button class="vlbt v${v}${get(k,s)===v?' on':''}" data-vl="set" data-t="${k}" data-s="${s}" data-v="${v}" aria-label="${C[v][1]}"></button>`).join('')}</div>`).join('')}</div></div>`).join('')}
  ${ta('nt.'+l,'Notas de '+LAY[l].toLowerCase(),VL.nt[l],'Ej. Hombro izq.: elevación limitada, compensa con la espalda',3)}`;}
function listView(){const L=VL.list;return `<div class="vlbody"><button class="vlb2" data-vl="new" style="margin-bottom:10px">＋ Nueva valoración</button>${L==null?'<div class="vlnote">Cargando…</div>':!L.length?'<div class="vlnote">Aún no has guardado valoraciones.</div>':L.map(r=>`<div class="vlrow"><div><b>${esc(r.ext_name||'Sin nombre')}</b><small>${fdate(r.date)}${r.client_id?' · cliente de la app':' · sin cuenta'}</small></div><button class="vlb2" data-vl="open" data-id="${r.id}">Abrir</button><button class="vlb2 vldel" data-vl="del" data-id="${r.id}" aria-label="Borrar">🗑</button></div>`).join('')}</div>`;}
function pdfHTML(){const d=VL.d,logo=new URL('erre-logo.png',location.href).href,sex=d.sex,
  css=`.wm{position:fixed;top:50%;left:50%;width:430px;transform:translate(-50%,-50%);opacity:.07;z-index:0}@page{size:A4;margin:12mm 13mm}*{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}body{font-family:Archivo,Helvetica,Arial,sans-serif;color:#1C1B19;margin:0;font-size:12px}.hd{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #DCD6CC;padding-bottom:8px;margin-bottom:12px}.hd img{height:38px}.hd small{color:#5A554E;letter-spacing:.08em;text-transform:uppercase;font-size:10px}
  h1{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;font-size:26px;margin:0 0 2px}.who{color:#5A554E;margin-bottom:10px}h2{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;letter-spacing:.06em;font-size:15px;margin:16px 0 6px;border-bottom:2px solid #C0392B;padding-bottom:3px;break-after:avoid}h3{font-family:Oswald,Arial,sans-serif;text-transform:uppercase;letter-spacing:.05em;font-size:12px;margin:10px 0 4px;color:#5A554E}
  .kv{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px}.kv div{border:1px solid #DCD6CC;border-radius:8px;padding:6px 8px}.kv small{display:block;color:#5A554E;font-size:9.5px;text-transform:uppercase;letter-spacing:.06em}.kv b{font-size:14px}
  .tx{border:1px solid #DCD6CC;border-radius:8px;padding:6px 9px;margin-bottom:6px;break-inside:avoid}.tx small{color:#5A554E;font-size:9.5px;text-transform:uppercase;letter-spacing:.06em;display:block}
  table{width:100%;border-collapse:collapse;margin-bottom:6px}td,th{border-bottom:1px solid #E4DFD6;padding:4px 6px;text-align:left;font-size:11.5px}th{font-size:9.5px;text-transform:uppercase;letter-spacing:.06em;color:#5A554E}.two{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .bd{display:inline-block;color:#fff;border-radius:99px;padding:1px 8px;font-size:10px;font-weight:700}.ph{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}.ph div{break-inside:avoid;text-align:center}.ph img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:8px;border:1px solid #DCD6CC}.ph small{font-size:10px;color:#5A554E}
  .fg{display:flex;gap:18px;justify-content:center;margin:4px 0 8px}.fg div{text-align:center;width:150px}.fg small{color:#5A554E;font-size:10px}.lg{display:flex;gap:12px;justify-content:center;font-size:10.5px;margin-bottom:6px}.lg i{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:4px;vertical-align:-1px}
  .sec{break-inside:avoid}.pr{border-left:5px solid;border-radius:6px;background:#FBFAF8;padding:6px 10px;margin-bottom:5px;break-inside:avoid}.ft{margin-top:16px;color:#5A554E;font-size:10.5px;border-top:1px solid #DCD6CC;padding-top:8px}`,
  cell=(l,v)=>v?`<div><small>${l}</small><b>${esc(v)}</b></div>`:'',
  hh=num(d.h),ww=num(d.w),imc=hh&&ww?ww/Math.pow(hh/100,2):null,
  mrow=(k,n)=>{const v=num(VL.meas[k]);return v==null?'':`<tr><td>${n}</td><td><b>${fm(v)}</b></td></tr>`;},
  grp=MED_IN(),per=grp[0]?grp[0][1].map(([k,n])=>mrow(k,n.replace(/\s*\(.*?\)/g,''))).join(''):'',
  pli=grp[1]?grp[1][1].map(([k,n])=>{const v=num(VL.meas[k]);if(v==null)return '';const b=medBand(sex,v);return `<tr><td>${n}</td><td><b>${fm(v)}</b></td><td><span class="bd" style="background:${b.c}">${b.t}</span></td></tr>`;}).join(''):'',
  dv=medDerived({peso:d.w,talla:d.h,cintura:VL.meas.cintura,cadera:VL.meas.cadera,pl_tri:VL.meas.pl_tri,pl_sub:VL.meas.pl_sub,pl_bic:VL.meas.pl_bic,pl_ili:VL.meas.pl_ili,pl_sup:VL.meas.pl_sup,pl_abd:VL.meas.pl_abd,pl_mus:VL.meas.pl_mus,pl_pan:VL.meas.pl_pan}),
  photos=PHS.filter(([k])=>VL.ph[k]),
  evalSec=['mov','est'].map(l=>{const c=cnt(l),any=c[1]+c[2]+c[3]>0;return `<div class="sec"><h2>${l==='mov'?'Movilidad':'Estabilidad'}</h2>${any?`<div class="fg"><div>${fig('f',l,VL.ev,false)}<small>Frente</small></div><div>${fig('b',l,VL.ev,false)}<small>Espalda</small></div></div><div class="lg">${[1,2,3,0].map(v=>`<span><i style="background:${C[v][0]}"></i>${C[v][1]}</span>`).join('')}</div>
   <table><tr><th>Prueba</th><th>Izq.</th><th>Der.</th></tr>${T[l].map(([k,n,,ns])=>{const b=s=>{const st=get(k,s);return `<span class="bd" style="background:${C[st][0]}${st?'':';color:#5A554E'}">${C[st][1]}</span>`;};return `<tr><td>${n}</td>${ns===2?`<td>${b('i')}</td><td>${b('d')}</td>`:`<td colspan="2">${b('u')}</td>`}</tr>`;}).join('')}</table>${VL.nt[l]?`<div class="tx"><small>Notas</small>${esc(VL.nt[l]).replace(/\n/g,'<br>')}</div>`:''}`:'<div class="tx">No evaluada.</div>'}</div>`;}).join(''),
  pr=prio();
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Valoración inicial</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;700&family=Oswald:wght@600;700&display=swap" rel="stylesheet"><style>${css}</style></head><body><img class="wm" src="${logo}" alt="">
  <div class="hd"><img src="${logo}" alt=""><small>ERRE Complete · Método Complete</small></div><h1>Valoración inicial</h1><div class="who">${esc(d.name||'')} · ${fdate(VL.date)}</div>
  <h2>Datos</h2><div class="kv">${cell('Edad',d.age?d.age+' años':'')}${cell('Sexo',d.sex)}${cell('Estatura',d.h?d.h+' cm':'')}${cell('Peso',d.w?d.w+' kg':'')}${imc?cell('IMC',fm(imc)):''}</div>
  ${d.goal?`<div class="tx"><small>Objetivo</small>${esc(d.goal)}</div>`:''}${[['Lesiones o molestias',d.les],['Alergias',d.ale],['Medicación',d.med],['Observaciones',d.obs]].map(([l,v])=>v?`<div class="tx"><small>${l}</small>${esc(v).replace(/\n/g,'<br>')}</div>`:'').join('')}
  ${per||pli?`<h2>Medidas antropométricas</h2><div class="two">${per?`<div><h3>Perímetros (cm)</h3><table>${per}</table></div>`:'<div></div>'}${pli?`<div><h3>Pliegues (mm)</h3><table>${pli}</table></div>`:''}</div>${dv.length?`<div class="kv">${dv.map(([n,v,u])=>`<div><small>${n}</small><b>${fm(v)}${u?' '+u:''}</b></div>`).join('')}</div>`:''}`:''}
  ${photos.length?`<h2>Fotos de progreso · punto de partida</h2><div class="ph">${photos.map(([k,n])=>`<div><img src="${VL.ph[k]}"><small>${n}</small></div>`).join('')}</div>`:''}
  ${evalSec}
  ${pr.length?`<h2>Prioridades para tu programa</h2>${pr.map(x=>`<div class="pr" style="border-color:${C[x.st][0]}"><b>${esc(x.txt)}</b> · ${C[x.st][1].toLowerCase()} <span style="color:#5A554E">(${x.l==='mov'?'movilidad':'estabilidad'})</span></div>`).join('')}`:''}
  <div class="ft">Valoración realizada por ${esc((PROFILE&&PROFILE.full_name)||'tu coach')} · ERRE Complete. Es una evaluación funcional de entrenamiento y no reemplaza un diagnóstico médico.</div></body></html>`;}
function render(){if(!VL)return;let o=document.getElementById('vlv');if(!o){o=document.createElement('div');o.id='vlv';document.body.appendChild(o);document.body.style.overflow='hidden';}
  const sv=o.querySelector('.vlbody'),sy=sv?sv.scrollTop:0,tab=VL.tab,list=VL.view==='list';
  const tabs=[['datos','📋 Datos'],['med','📏 Medidas'],['fotos','📷 Fotos'],['mov','🧍 Movilidad y estabilidad']];
  o.innerHTML=`<div class="vlc"><div class="vlh"><div><b>Valoración inicial</b><small>${esc(VL.d.name||'Nueva valoración')}${VL.id?' · guardada':''}</small></div><div style="display:flex;gap:6px"><button class="vlb2" data-vl="list">📂 Guardadas</button><button class="vlx2" data-vl="close" aria-label="Cerrar">✕</button></div></div>
   ${list?listView():`<div class="vltabs">${tabs.map(([k,n])=>`<button class="${tab===k?'on':''}" data-vl="tab" data-v="${k}">${n}</button>`).join('')}</div><div class="vlbody">${tab==='datos'?tabDatos():tab==='med'?tabMed():tab==='fotos'?tabFotos():tabMov()}</div>
   <div class="vlf"><button class="vlb2 vlsave" data-vl="save">${VL.busy?'Guardando…':'💾 Guardar'}</button><button class="vlb2 vlpdf" data-vl="pdf">📄 Exportar PDF</button></div>`}</div>`;
  const nb=o.querySelector('.vlbody');if(nb)nb.scrollTop=sy;}
function close(force){if(!VL)return;if(VL.dirty&&!force&&!confirm('Hay cambios sin guardar. ¿Salir de todas formas?'))return;VL=null;const o=document.getElementById('vlv');if(o)o.remove();document.body.style.overflow='';}
function open(cid){VL=def();
  if(cid&&typeof CP!=='undefined'&&CP.d&&CP.cid===cid&&CP.d.profile){const p=CP.d.profile;VL.cid=cid;const d=VL.d;d.name=p.full_name||'';d.sex=/hombre|masc|male/i.test(p.sex||'')?'Hombre':'Mujer';d.age=age(p.birth_date);d.h=p.height_cm?String(Math.round(p.height_cm)):'';
    const ws=(CP.d.weights||[]).slice().sort((a,b)=>a.log_date<b.log_date?1:-1);d.w=String(ws[0]?ws[0].kg:(p.start_weight_kg||'')).replace('.',',');d.les=p.injuries||'';d.goal={bajar:'Bajar peso',aumentar:'Aumentar masa',complete:'Complete (recomposición)'}[p.goal]||'';
    try{DB.asmList().then(L=>{if(!VL||VL.cid!==cid)return;const m=L.find(r=>r.client_id===cid);if(m){VL.banner=`<div class="vlban">Ya hay una valoración guardada de este cliente (${fdate(m.date)}). <button class="vlb2" data-vl="open" data-id="${m.id}">Abrir</button></div>`;if(VL.tab==='datos'&&VL.view==='edit')render();}}).catch(()=>{});}catch(e){}}
  render();}
async function loadList(){VL.view='list';VL.list=null;render();try{VL.list=await DB.asmList();}catch(e){console.warn(e);VL.list=[];toast('No se pudo cargar la lista');}if(VL)render();}
function payload(){return {client_id:VL.cid||null,ext_name:VL.d.name.trim(),date:VL.date,data:{d:VL.d,meas:VL.meas,ph:VL.ph,ev:VL.ev,nt:VL.nt}};}
function setPath(p,v){const ks=p.split('.');if(ks.length===1){VL[ks[0]]=v;return;}VL[ks[0]][ks[1]]=v;}
function rs(file,cb){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,900/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*k);c.height=Math.round(im.height*k);c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.72));};im.src=fr.result;};fr.readAsDataURL(file);}
document.addEventListener('input',e=>{const t=e.target;if(!VL||!t.dataset||!t.dataset.vp)return;setPath(t.dataset.vp,t.value);VL.dirty=true;});
document.addEventListener('change',e=>{const t=e.target;if(!VL||!t.dataset||!t.dataset.vlph)return;const f=t.files&&t.files[0];if(!f)return;rs(f,u=>{VL.ph[t.dataset.vlph]=u;VL.dirty=true;render();});});
document.addEventListener('click',async e=>{
  const op=e.target.closest&&e.target.closest('[data-act="vlopen"]');if(op){e.stopPropagation();e.preventDefault();open(op.dataset.cid||null);return;}
  if(VL&&e.target.id==='vlv'){e.stopPropagation();close();return;}
  const t=e.target.closest&&e.target.closest('[data-vl]');if(!t||!VL)return;e.stopPropagation();e.preventDefault();const a=t.dataset.vl,v=t.dataset.v;
  if(a==='close'){close();return;}
  if(a==='tab'){VL.tab=v;render();return;}
  if(a==='layer'){VL.layer=v;render();return;}
  if(a==='sex'){VL.d.sex=v;VL.dirty=true;render();return;}
  if(a==='fill'){const tx=(document.getElementById('vl_paste')||{}).value||'',r=parse(tx);if(!r.n){toast('No encontré datos en el texto');return;}fill(r);VL.d.raw=tx;VL.dirty=true;render();toast('Detecté: '+r.found.join(' · '));return;}
  if(a==='hs'){const k=t.dataset.t+'|'+t.dataset.s;VL.ev[k]=((VL.ev[k]||0)+1)%4;VL.dirty=true;render();return;}
  if(a==='set'){const k=t.dataset.t+'|'+t.dataset.s;VL.ev[k]=VL.ev[k]===+v?0:+v;VL.dirty=true;render();return;}
  if(a==='phdel'){delete VL.ph[t.dataset.k];VL.dirty=true;render();return;}
  if(a==='lastmed'){try{const rs0=await DB.measuresOf(VL.cid),r=rs0[rs0.length-1];if(!r){toast('Este cliente aún no tiene mediciones');return;}Object.keys(r.data||{}).forEach(k=>{if(!['peso','talla','grasa','musculo'].includes(k))VL.meas[k]=String(r.data[k]).replace('.',',');});VL.dirty=true;render();toast('Medición del '+fdate(r.date)+' cargada');}catch(x){toast('No se pudo traer la medición');}return;}
  if(a==='list'){loadList();return;}
  if(a==='new'){const cid=VL.cid;VL=def();VL.cid=null;render();return;}
  if(a==='open'){try{const r=await DB.asmGet(t.dataset.id),x=r.data||{};VL=Object.assign(def(),{id:r.id,cid:r.client_id||null,date:r.date,d:Object.assign(def().d,x.d||{}),meas:x.meas||{},ph:x.ph||{},ev:x.ev||{},nt:Object.assign({mov:'',est:''},x.nt||{})});render();}catch(x){toast('No se pudo abrir');}return;}
  if(a==='del'){if(!confirm('¿Borrar esta valoración? No se puede deshacer.'))return;try{await DB.asmDel(t.dataset.id);VL.list=(VL.list||[]).filter(r=>r.id!==t.dataset.id);if(VL.id===t.dataset.id)VL.id=null;render();toast('Valoración borrada');}catch(x){toast('No se pudo borrar');}return;}
  if(a==='save'){if(!VL.d.name.trim()){toast('Escribe el nombre del cliente');VL.tab='datos';render();return;}if(VL.busy)return;VL.busy=true;render();try{const row=payload();if(VL.id)row.id=VL.id;VL.id=await DB.asmSave(row);VL.dirty=false;VL.busy=false;render();toast('Valoración guardada ✓');}catch(x){console.warn(x);VL.busy=false;render();toast('No se pudo guardar. Revisa tu internet.');}return;}
  if(a==='pdf'){if(!VL.d.name.trim()){toast('Escribe el nombre del cliente');VL.tab='datos';render();return;}try{alpPrint(pdfHTML());}catch(x){console.warn(x);toast('No se pudo generar el PDF');}return;}
},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&VL)close();});
window.vlPdfHTML=pdfHTML;window.vlParse=parse;
const st=document.createElement('style');st.textContent=`
#vlv{position:fixed;inset:0;z-index:9550;background:rgba(28,27,25,.55);display:flex;justify-content:center;padding:2vh 2vw;overflow:hidden}
.vlc{background:#EFEDE8;border-radius:18px;width:min(960px,100%);max-height:96vh;display:flex;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,.35);margin:auto 0;min-height:60vh}
.vlh{flex:none;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:14px 18px;border-bottom:1px solid #DCD6CC}.vlh b{display:block;font:700 19px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.04em}.vlh small{color:#5A554E}
.vlx2{border:0;background:#1C1B19;color:#fff;border-radius:50%;width:34px;height:34px;font-size:15px}
.vltabs{flex:none;display:flex;gap:6px;padding:10px 14px 4px;overflow-x:auto;scrollbar-width:none}.vltabs button{flex:0 0 auto;border:2px solid #DCD6CC;background:#FBFAF8;border-radius:99px;padding:8px 14px;font:700 13px Archivo,sans-serif;color:#1C1B19}.vltabs button.on{background:#1C1B19;border-color:#1C1B19;color:#fff}
.vlbody{padding:14px 18px;overflow:auto;flex:1;-webkit-overflow-scrolling:touch}
.vlf{flex:none;display:flex;gap:8px;padding:12px 18px;border-top:1px solid #DCD6CC;background:#FBFAF8;border-radius:0 0 18px 18px}
.vlb2{border:1.5px solid #1C1B19;background:#fff;color:#1C1B19;border-radius:12px;padding:10px 14px;font:700 13px Archivo,sans-serif;cursor:pointer}.vlsave{flex:1;background:#1C1B19;color:#fff}.vlpdf{flex:1;background:#C0392B;border-color:#C0392B;color:#fff}.vldel{border-color:#C0392B;color:#C0392B}
.vlpaste{background:#FBFAF8;border:2px dashed #C0392B;border-radius:14px;padding:12px;margin-bottom:14px;display:flex;flex-direction:column;gap:6px}.vlpaste small{color:#5A554E}
.vlin{width:100%;border:1.5px solid #DCD6CC;background:#fff;border-radius:10px;padding:10px;font:500 15px Archivo,sans-serif;color:#1C1B19;box-sizing:border-box;resize:vertical}
.vlfl{display:block;font:700 12px Archivo,sans-serif;color:#5A554E;margin-bottom:10px}.vlfl .vlin{margin-top:4px}
.vlg{display:grid;grid-template-columns:repeat(3,1fr);gap:0 10px}.vlg3{display:grid;grid-template-columns:repeat(4,1fr);gap:0 10px}@media(max-width:640px){.vlg,.vlg3{grid-template-columns:repeat(2,1fr)}.vlc{max-height:100vh;border-radius:14px}#vlv{padding:0}}
.vlchips{display:flex;gap:6px;margin-top:4px}.vlchip{flex:1;border:2px solid #DCD6CC;background:#fff;border-radius:10px;padding:10px;font:700 14px Archivo,sans-serif}.vlchip.on{background:#1C1B19;color:#fff;border-color:#1C1B19}
.vlh4{font:700 14px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.06em;margin:12px 0 6px}.vlnote{color:#5A554E;font-size:12px;margin-top:6px}
.vlder{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.vlder span{background:#FBFAF8;border:1px solid #DCD6CC;border-radius:10px;padding:6px 10px;font-size:11px;color:#5A554E}.vlder b{display:block;font-size:16px;color:#1C1B19}
.vlph{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}@media(max-width:640px){.vlph{grid-template-columns:repeat(2,1fr)}}
.vlpc{position:relative;text-align:center}.vlpc img{width:100%;aspect-ratio:3/4;object-fit:cover;border-radius:12px;border:1.5px solid #DCD6CC}.vlpn{display:block;font-size:12px;margin-top:4px}
.vlempty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;aspect-ratio:3/4;border:2px dashed #C9C2B6;border-radius:12px;background:#FBFAF8;cursor:pointer}.vlempty span{font-size:28px}.vlempty small{color:#5A554E;font-size:11px}
.vlx{position:absolute;top:6px;right:6px;border:0;background:rgba(28,27,25,.8);color:#fff;width:26px;height:26px;border-radius:50%}
.vlseg{display:flex;background:#E4DFD6;border-radius:99px;padding:3px;margin-bottom:10px}.vlseg button{flex:1;border:0;background:none;border-radius:99px;padding:9px;font:700 14px Archivo,sans-serif;color:#5A554E}.vlseg button.on{background:#1C1B19;color:#fff}
.vlfg{display:flex;justify-content:center;gap:clamp(10px,6vw,60px)}.vlfg>div{text-align:center;width:min(170px,38vw)}.vlfg svg{width:100%;height:auto;display:block}.vlfg small{color:#5A554E;font-weight:700;font-size:12px}
.vlleg{display:flex;flex-wrap:wrap;justify-content:center;gap:6px 14px;margin:8px 0;font-size:12px}.vlleg i{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px}
.vlr{display:flex;justify-content:space-between;align-items:center;gap:10px;background:#FBFAF8;border:1px solid #DCD6CC;border-radius:12px;padding:10px 12px;margin-bottom:8px}.vlrt b{display:block;font-size:14px}.vlrt small{color:#5A554E;font-size:11.5px}
.vlsd{display:flex;gap:12px;flex:0 0 auto}.vls{display:flex;align-items:center;gap:5px}.vls em{font-style:normal;font:700 11px Archivo,sans-serif;color:#5A554E;width:12px}
.vlbt{width:30px;height:30px;border-radius:50%;border:2.5px solid #DCD6CC;background:#fff;padding:0}.vlbt.v1{--c:#1F8F53}.vlbt.v2{--c:#B87400}.vlbt.v3{--c:#C0392B}.vlbt{border-color:var(--c);opacity:.55}.vlbt.on{background:var(--c);opacity:1;box-shadow:0 0 0 3px #fff,0 0 0 5px var(--c)}
.vlrow{display:flex;align-items:center;gap:8px;background:#FBFAF8;border:1px solid #DCD6CC;border-radius:12px;padding:10px 12px;margin-bottom:8px}.vlrow>div{flex:1}.vlrow b{display:block}.vlrow small{color:#5A554E}
.vlban{background:#E7F4EC;border:1px solid #1F8F53;color:#1F6B43;border-radius:12px;padding:8px 12px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px}
.vld{margin-top:8px}.vld pre{white-space:pre-wrap;font:12px Archivo,sans-serif;background:#FBFAF8;border:1px solid #DCD6CC;border-radius:10px;padding:8px}`;
document.head.appendChild(st);
})();


/* ===== Foto del coach (22 nov): el coach la sube; el cliente la ve en el botón Coach y en el chat ===== */
(function(){
const K='erre_coach_av',CA={mine:null,mineTry:false,cl:null,clTry:false};
const lsGet=()=>{try{return JSON.parse(localStorage.getItem(K)||'null');}catch(e){return null;}};
const lsSet=v=>{try{localStorage.setItem(K,JSON.stringify(v));}catch(e){}};
function crop(file,size,cb){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(im.width,im.height),c=document.createElement('canvas');c.width=c.height=size;c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,size,size);const du=c.toDataURL('image/jpeg',.85);c.toBlob(b=>cb(b,du),'image/jpeg',.85);};im.src=fr.result;};fr.readAsDataURL(file);}
const dataUrl=async u=>{const r=await fetch(u),b=await r.blob();return await new Promise(ok=>{const f=new FileReader();f.onload=()=>ok(f.result);f.readAsDataURL(b);});};
const signed=async p=>{const r=await DB.signed([p]);const x=r&&r[0];return x&&(x.signedUrl||x.signedURL);};
/* --- lado coach --- */
function mineLoad(){if(CA.mineTry||!PROFILE||PROFILE.role!=='coach'||!PROFILE.avatar_path)return;CA.mineTry=true;
  signed(PROFILE.avatar_path).then(u=>u?dataUrl(u):null).then(d=>{if(d){CA.mine=d;try{coachRender(true);}catch(e){}}}).catch(e=>console.warn('av',e));}
const cs=cpShell;cpShell=function(inner){mineLoad();let h=cs.apply(this,arguments);
  const av=`<label class="coavb" title="Tu foto de coach. La ven tus clientes en el chat.">${CA.mine?`<img src="${CA.mine}" alt="">`:'<span>＋</span>'}<b>${CA.mine?'Cambiar foto':'Tu foto de coach'}</b><input type="file" accept="image/*" data-coav hidden></label>`;
  return h.replace('<div class="cpfoot">','<div class="cpfoot">'+av);};
function coAdjust(file){const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{
  const V=280,m=Math.min(im.width,im.height),base=V/m;let z=1,ox=0,oy=0;
  const w=document.createElement('div');w.id='coadj';w.innerHTML=`<div class="coadb"><b>Ajusta tu foto</b><small>Arrástrala y usa el zoom</small><canvas width="${V}" height="${V}"></canvas><input type="range" min="1" max="3" step="0.01" value="1"><div class="coadr"><button data-x="no">Cancelar</button><button data-x="ok" class="ok">Guardar foto</button></div></div>`;
  document.body.appendChild(w);const cv=w.querySelector('canvas'),g=cv.getContext('2d'),rg=w.querySelector('input');
  const lim=()=>{const sw=im.width*base*z,sh=im.height*base*z;ox=Math.min(0,Math.max(V-sw,ox));oy=Math.min(0,Math.max(V-sh,oy));};
  const draw=()=>{lim();g.clearRect(0,0,V,V);g.drawImage(im,ox,oy,im.width*base*z,im.height*base*z);};
  ox=(V-im.width*base)/2;oy=(V-im.height*base)/2;draw();
  let dr=null;cv.onpointerdown=e=>{dr={x:e.clientX,y:e.clientY,ox,oy};cv.setPointerCapture(e.pointerId);};
  cv.onpointermove=e=>{if(!dr)return;ox=dr.ox+(e.clientX-dr.x);oy=dr.oy+(e.clientY-dr.y);draw();};
  cv.onpointerup=cv.onpointercancel=()=>{dr=null;};
  const zoom=nz=>{const c=V/2,r=nz/z;ox=c-(c-ox)*r;oy=c-(c-oy)*r;z=nz;rg.value=z;draw();};
  rg.oninput=()=>zoom(+rg.value);cv.onwheel=e=>{e.preventDefault();zoom(Math.min(3,Math.max(1,z*(e.deltaY<0?1.06:.94))));};
  w.onclick=async e=>{const x=e.target.dataset&&e.target.dataset.x;if(e.target===w||x==='no'){w.remove();return;}if(x!=='ok')return;
    const o=document.createElement('canvas');o.width=o.height=400;o.getContext('2d').drawImage(cv,0,0,V,V,0,0,400,400);const du=o.toDataURL('image/jpeg',.88);
    e.target.textContent='Guardando…';e.target.disabled=true;
    o.toBlob(async blob=>{try{const path=PROFILE.id+'/coach-avatar.jpg';await DB.upload(path,blob);await DB.saveProfile(PROFILE.id,{avatar_path:path});PROFILE.avatar_path=path;CA.mine=du;w.remove();try{coachRender(true);}catch(x2){}toast('Foto guardada ✓ Tus clientes la ven en el chat');}catch(x3){console.warn(x3);toast('No se pudo subir la foto');w.remove();}},'image/jpeg',.88);};
  };im.src=fr.result;};fr.readAsDataURL(file);}
document.addEventListener('change',e=>{const t=e.target;if(!t.dataset||t.dataset.coav==null)return;const f=t.files&&t.files[0];t.value='';if(!f||!PROFILE)return;coAdjust(f);});
/* --- lado cliente --- */
function clLoad(){if(CA.clTry||!ME||!PROFILE||PROFILE.role==='coach'||!PROFILE.coach_id)return;CA.clTry=true;CA.cl=lsGet();
  (async()=>{try{const cp=await DB.profile(PROFILE.coach_id);if(!cp)return;const had=CA.cl&&CA.cl.p===cp.avatar_path&&CA.cl.u;
    if(cp.avatar_path&&!had){const u=await signed(cp.avatar_path);if(u){const d=await dataUrl(u);CA.cl={u:d,n:cp.full_name||'',p:cp.avatar_path};lsSet(CA.cl);}}
    else if(!cp.avatar_path){CA.cl=null;lsSet(null);}
    else CA.cl.n=cp.full_name||CA.cl.n;
    try{render();}catch(x){}}catch(e){console.warn('coav',e);}})();}
const img=(c)=>CA.cl&&CA.cl.u?`<img class="coav${c?' '+c:''}" src="${CA.cl.u}" alt="">`:'';
const sh=shellHeader;shellHeader=function(){clLoad();let h=sh.apply(this,arguments);if(CA.cl&&CA.cl.u)h=h.replace(/(<button class="pill chatpill[^"]*" data-act="chat">)[\s\S]*?(<span>Mi coach<\/span>)/,'$1'+img('')+'$2');return h;};
const cv=chatView;chatView=function(){clLoad();let h=cv.apply(this,arguments);if(CA.cl&&CA.cl.u)h=h.replace('<i>J</i>',img('md')).replace('Juanjo · tu coach',esc((CA.cl.n||'Juanjo').split(' ')[0])+' · tu coach');return h;};
const th=threadHTML;threadHTML=function(role){let h=th.apply(this,arguments);if(role==='client'&&CA.cl&&CA.cl.u)h=h.replace(/<div class="bubble co">([\s\S]*?)<\/div>/g,(m,x)=>`<div class="corow">${img('sm')}<div class="bubble co">${x}</div></div>`);return h;};
window.coachAvState=()=>CA;
const st=document.createElement('style');st.textContent=`.coav{width:26px;height:26px;border-radius:50%;object-fit:cover;border:1.5px solid #1C1B19;flex:none}.coav.sm{width:30px;height:30px;border-width:1px}.coav.md{width:40px;height:40px;border:2px solid #C0392B}
.cochead{display:flex;align-items:center;gap:12px;background:#FBFAF8;border:1px solid #DCD6CC;border-radius:16px;padding:10px 12px;margin:0 0 10px}.cochead b{display:block;font:700 17px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.03em}.cochead small{color:#5A554E}
.coadj,#coadj{position:fixed;inset:0;z-index:9999;background:rgba(28,27,25,.6);display:flex;align-items:center;justify-content:center}.coadb{background:#FBFAF8;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;gap:10px;max-width:92vw}.coadb b{font:700 18px Oswald,Archivo,sans-serif;text-transform:uppercase}.coadb small{color:#5A554E}.coadb canvas{width:280px;height:280px;border-radius:50%;border:3px solid #C0392B;touch-action:none;cursor:grab;background:#DCD6CC}.coadb input{width:240px;accent-color:#C0392B}.coadr{display:flex;gap:10px}.coadr button{padding:10px 16px;border-radius:12px;border:1px solid #DCD6CC;background:#fff;font:700 14px Archivo,sans-serif}.coadr .ok{background:#C0392B;color:#fff;border-color:#C0392B}
.corow{display:flex;align-items:flex-end;gap:6px;margin-bottom:8px}.corow .bubble{margin-bottom:0}
.coavb{display:flex;align-items:center;gap:8px;cursor:pointer;margin-bottom:8px}.coavb img,.coavb span{width:38px;height:38px;border-radius:50%;object-fit:cover;border:2px solid #C0392B;display:flex;align-items:center;justify-content:center;background:#FBFAF8;color:#C0392B;font-size:18px;flex:none}.coavb b{font:700 12px Archivo,sans-serif}`;
document.head.appendChild(st);
})();


/* ===== Modo sesión (22 nov): entrar a fuerza / cardio / vuelta a la calma se siente como otra pantalla ===== */
(function(){
const TH={g_fuerza:{c:'#1C1B19',c2:'#5A1B14',bg:'#F1E7E3',ic:'🏋️',tag:'Modo fuerza'},g_cardio:{c:'#0F3B52',c2:'#1B6E8F',bg:'#E3EDF2',ic:'🏃',tag:'Modo cardio'},g_calm:{c:'#1D3B2F',c2:'#2F7A57',bg:'#E3EFE8',ic:'🧘',tag:'Vuelta a la calma'}};
let was=null;
function clear(){document.body.classList.remove('insess','sesfx');document.body.style.removeProperty('--sbg');document.body.style.removeProperty('--sc');document.body.style.removeProperty('--sc2');}
function sess(){
  const app=document.getElementById('app');
  const on=app&&S&&S.role!=='coach'&&S.tab==='entrenar'&&S.tg&&!S.profile&&!S.chatOpen&&TH[S.tg]&&app.querySelector('.gdet');
  if(!on){if(was)clear();was=null;return;}
  const th=TH[S.tg],b=document.body;
  if(!app.querySelector('.sesh')){
    const back=app.querySelector('[data-act="gback"]'),h2=app.querySelector('h2.h2'),sub=app.querySelector('.sub2'),pr=app.querySelector('.progress i');
    if(!back||!h2)return;
    const pct=pr?pr.style.width:'0%';
    const hero=document.createElement('div');hero.className='sesh';
    hero.innerHTML=`<div class="sesr"><button class="sesb" data-act="gback" aria-label="Volver a la rutina de hoy">‹</button><span class="sesi">${th.ic}</span><div class="sest"><b>${h2.textContent}</b><span>${sub?sub.textContent:''}</span></div></div><div class="sesp"><i style="width:${pct}"></i></div>`;
    const first=back;first.parentNode.insertBefore(hero,first);
    [back,h2,sub,app.querySelector('.progress')].forEach(n=>n&&n.remove());
  }
  b.classList.add('insess');b.style.setProperty('--sbg',th.bg);b.style.setProperty('--sc',th.c);b.style.setProperty('--sc2',th.c2);
  if(was!==S.tg){b.classList.add('sesfx');setTimeout(()=>b.classList.remove('sesfx'),700);window.scrollTo(0,0);}
  was=S.tg;
}
const r0=render;render=function(){const x=r0.apply(this,arguments);try{sess();}catch(e){console.warn('sess',e);}return x;};
const st=document.createElement('style');st.textContent=`
body.insess{background:var(--sbg)!important;--bg:var(--sbg)}
body.insess header.top,body.insess .tabbar,body.insess .proto{display:none!important}
body.insess .app,body.insess #app{padding-top:0!important}
.sesh{margin:0 -16px 12px;padding:calc(env(safe-area-inset-top,0px) + 8px) 12px 10px;background:linear-gradient(135deg,var(--sc),var(--sc2));color:#fff;border-radius:0 0 18px 18px;box-shadow:0 4px 14px rgba(0,0,0,.2);position:sticky;top:0;z-index:20}
.sesr{display:flex;align-items:center;gap:10px}.sesb{flex:none;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.18);border:0;color:#fff;font:700 22px/1 Archivo,sans-serif;padding:0 0 3px}
.sesi{flex:none;font-size:20px}.sest{min-width:0;flex:1}.sest b{display:block;font:700 14px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.04em;line-height:1.15;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.sest span{display:block;font-size:11px;opacity:.8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sesp{height:4px;border-radius:99px;background:rgba(255,255,255,.25);margin-top:8px;overflow:hidden}.sesp i{display:block;height:100%;background:#fff;border-radius:99px;transition:width .3s}
body.insess .gdet{padding-bottom:30px}
body.insess .btn.solid{background:var(--sc);border-color:var(--sc)}
body.sesfx .sesh{animation:sesdrop .45s cubic-bezier(.2,.9,.3,1)}body.sesfx .gdet,body.sesfx .fbdone{animation:sesup .5s .08s both}
@keyframes sesdrop{from{transform:translateY(-40px);opacity:0}to{transform:none;opacity:1}}@keyframes sesup{from{transform:translateY(24px);opacity:0}to{transform:none;opacity:1}}`;
document.head.appendChild(st);
})();


/* ===== Temas de la app (22 nov): Claro · Oscuro · Azul ===== */
(function(){
const K='erre_theme',TH={claro:['☀️','Claro','#F7F6F3'],oscuro:['🌙','Oscuro','#121418']};
const get=()=>{try{const v=localStorage.getItem(K);return TH[v]?v:'claro';}catch(e){return 'claro';}};
function apply(v){const h=document.documentElement;if(v==='claro')h.removeAttribute('data-theme');else h.setAttribute('data-theme',v);
  try{localStorage.setItem(K,v);}catch(e){}
  document.querySelectorAll('meta[name="theme-color"]').forEach(m=>m.setAttribute('content',TH[v][2]));}
apply(get());
/* Tamaño de letra (24 nov): zoom suave de toda la app, se guarda en el dispositivo */
const FK='erre_fs',FS={n:['A','Normal',1],g:['A','Grande',1.08],x:['A','Muy grande',1.18]};
const fsGet=()=>{try{const v=localStorage.getItem(FK);return FS[v]?v:'n';}catch(e){return 'n';}};
function fsApply(v){try{localStorage.setItem(FK,v);}catch(e){}document.documentElement.style.zoom=FS[v][2]===1?'':FS[v][2];}
fsApply(fsGet());
function fsRow(){const cur=fsGet();return `<b style="margin-top:14px">Tamaño de letra</b><div class="fsrow">${Object.keys(FS).map(k=>`<button class="thc fsb${cur===k?' on':''}" data-fs="${k}"><span style="font-size:${k==='n'?16:k==='g'?21:27}px;font-weight:700">A</span><i>${FS[k][1]}</i></button>`).join('')}</div>`;}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-fs]');if(!t)return;fsApply(t.dataset.fs);document.querySelectorAll('.thpk').forEach(x=>x.outerHTML=picker());});
window.erreTheme=apply;window.erreThemeGet=get;
function picker(){const cur=get();return `<div class="thpk"><b>Tema de la app</b><div>${Object.keys(TH).map(k=>`<button class="thc th-${k}${cur===k?' on':''}" data-theme="${k}"><span>${TH[k][0]}</span><i>${TH[k][1]}</i></button>`).join('')}</div>${fsRow()}</div>`;}
window.erreThemePicker=picker;
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-theme]');if(!t)return;apply(t.dataset.theme);document.querySelectorAll('.thpk').forEach(x=>x.outerHTML=picker());});
const pv=profileView;profileView=function(){let h=pv.apply(this,arguments);try{return h.replace(/(<details class="sec acc" data-pk="Mi plan"[\s\S]*?<\/details>)/,m=>m+`<section class="sec">${picker()}</section>`);}catch(e){return h;}};
const cs=cpShell;cpShell=function(){let h=cs.apply(this,arguments);return h.replace('<div class="cpfoot">','<div class="cpfoot">'+picker());};
const st=document.createElement('style');st.textContent=`
.thpk b{display:block;font:700 14px Archivo,sans-serif;margin-bottom:8px}.thpk>div{display:flex;gap:8px}.fsb{justify-content:flex-end}.fsb span{line-height:1}
.thc{flex:1;border:2px solid #DCD6CC;background:#FBFAF8;border-radius:14px;padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:4px;font:700 12px Archivo,sans-serif;color:#1C1B19}.thc span{font-size:22px}.thc i{font-style:normal}.thc.on{border-color:#C0392B;box-shadow:0 0 0 2px #C0392B inset}
.cpfoot .thpk{margin-bottom:8px}.cpfoot .thpk b{font-size:11px}.cpfoot .thc{padding:6px 2px}.cpfoot .thc span{font-size:16px}.cpfoot .thc i{font-size:10px}
html[data-theme]{color-scheme:dark}
html[data-theme=oscuro]{--bg0:#121418;--bg:#121418;--card:#1B1E24;--paper:#242830;--line:#30353F;--ink:#EEF0F4;--gray:#A9B0BC;--gray2:#8E96A3;--red:#EF5A4C;--red-strong:#D44A3D;--red-tint:#3A201E;--btn:#2C313A;--wh:#242830;--tm:17%}
html[data-theme] body,html[data-theme]{background:var(--bg);color:var(--ink)}
html[data-theme] body.insess{background:color-mix(in srgb,var(--sc) 18%,var(--bg0))!important;--bg:color-mix(in srgb,var(--sc) 18%,var(--bg0))}
html[data-theme] .tabbar{box-shadow:0 -6px 20px rgba(0,0,0,.35)}
html[data-theme] input,html[data-theme] textarea,html[data-theme] select{color:var(--ink);background:var(--paper)}
html[data-theme] ::placeholder{color:var(--gray2)}
html[data-theme] svg [fill="#1C1B19"]{fill:var(--ink)}html[data-theme] svg [stroke="#1C1B19"]{stroke:var(--ink)}
html[data-theme] [style*="background:#F"],html[data-theme] [style*="background:#E"],html[data-theme] [style*="background: #F"],html[data-theme] [style*="background: #E"]{background:var(--paper)!important}
html[data-theme=oscuro] .sesh{filter:saturate(.9)}`;
document.head.appendChild(st);
})();


/* ===== Hábitos (22 nov): checklist Mañana · Tarde · Noche con base científica ===== */
(function(){
const M=[['m','☀️','Mañana','Activa tu día','#D9822B'],['t','🌤️','Tarde','Baja revoluciones','#3C7FA6'],['n','🌙','Noche','Desactivación','#5B4B9A']];
const EV={3:['Evidencia sólida','#1F8F53'],2:['Evidencia moderada','#B87400'],1:['Evidencia limitada','#7A746B']};
/* core = cuenta para el día; extra = opcional */
const H=[
 {id:'agua',m:'m',ic:'💧',t:'Vaso de agua al despertar',min:'1 min',core:1,fu:7,ev:2,
  how:'Un vaso grande (300 a 500 ml) apenas te levantas. Si entrenas temprano, sudas mucho o hace calor, agrégale una pizca de sal o electrolitos.',
  sci:'Después de 7 u 8 horas sin tomar nada empiezas el día con un pequeño déficit de líquido. Reponerlo ayuda a sentirte más despierto y concentrado. Lo que de verdad cuenta es tomar suficiente durante todo el día; los electrolitos sirven sobre todo si sudas mucho.'},
 {id:'luz',m:'m',ic:'🌞',t:'Luz natural y sol',min:'5 a 20 min',core:1,fu:9,ev:2,
  how:'Sal afuera en la primera hora después de despertar: balcón, caminata o ventana abierta. Con cielo despejado bastan 5 a 10 minutos; si está nublado, 15 a 20. Nunca mires directo al sol.',
  sci:'La luz fuerte de la mañana le avisa a tu reloj interno que ya es de día: ayuda a dormir mejor esa noche y a estar más alerta. Afuera hay muchísima más luz que adentro, incluso nublado. Las revisiones lo respaldan, aunque muchos estudios son de calidad variable.'},
 {id:'mov_m',m:'m',ic:'🤸',t:'Movilidad articular suave',min:'3 a 5 min',core:1,fu:6,ev:2,
  how:'Círculos de cuello, hombros, cadera y tobillos, y rotación de columna. Lento, sin dolor y sin forzar el rango.',
  sci:'Mueve las articulaciones por su rango y sube un poco la temperatura del cuerpo antes de empezar el día. Mejora cómo te sientes y tu rango de movimiento; que prevenga lesiones por sí sola está menos claro.'},
 {id:'pump',m:'m',ic:'🦵',t:'Bombeo de pantorrillas',min:'1 a 2 min',core:1,fu:4,ev:1,
  how:'20 a 30 elevaciones de talones, subiendo y bajando sin prisa, o saltitos suaves sobre las puntas durante 1 a 2 minutos.',
  sci:'Cada elevación de talones comprime las venas de la pantorrilla y empuja la sangre de vuelta hacia el corazón: es fisiología bien establecida (por eso la llaman el segundo corazón). Los estudios directos sobre drenaje linfático en personas sanas son escasos; lo seguro es la circulación y la sensación de piernas livianas.'},
 {id:'resp_m',m:'m',ic:'🫁',t:'Respiración 5-5',min:'3 min',core:0,fu:6,ev:2,go:'man',
  how:'Inhala 5 segundos y exhala 5 segundos, suave y continuo, antes de empezar a moverte.',
  sci:'Respirar lento, cerca de 6 veces por minuto, sube la variabilidad de la frecuencia cardiaca y baja la frecuencia y la presión en los minutos siguientes. Es una forma simple de empezar el día con más calma.'},
 {id:'camina',m:'t',ic:'🚶',t:'Caminata corta después de comer',min:'5 a 10 min',core:1,fu:8,ev:3,
  how:'Camina a paso tranquilo 5 a 10 minutos después de tu comida principal. Si no puedes caminar, quédate de pie y muévete un poco.',
  sci:'Un meta-análisis encontró que caminar suave entre 2 y 5 minutos después de comer reduce el pico de azúcar y de insulina, y funciona mejor que quedarse de pie o sentado. Es de lo más respaldado de esta lista.'},
 {id:'resp_t',m:'t',ic:'🫁',t:'Respiración después de comer',min:'3 a 5 min',core:1,fu:6,ev:2,go:'com',
  how:'Sentado y relajado, inhala por la nariz y exhala más largo de lo que inhalas. Hazlo entre 3 y 5 minutos.',
  sci:'La respiración lenta aumenta la variabilidad cardiaca y baja la frecuencia cardiaca y la presión: señales de un sistema nervioso más calmado. Que además mejore la digestión es plausible, pero hay poca evidencia directa.'},
 {id:'mov',m:'t',ic:'🧘',t:'Movilidad y estiramientos de la tarde',min:'3 a 5 min',core:1,fu:5,ev:2,
  how:'Una pausa corta para soltar cadera, espalda y hombros. No necesitas ropa deportiva ni equipo.',
  sci:'Interrumpir las horas sentado con movimiento ligero mejora la circulación y afloja la rigidez de espalda, cadera y hombros. Es un hábito pequeño con buen retorno.'},
 {id:'nat',m:'t',ic:'🌳',t:'Contacto con la naturaleza',min:'10 a 20 min',core:1,fu:8,ev:2,
  how:'Siéntate o camina 10 a 20 minutos en un parque, jardín, montaña o playa, sin celular ni redes. Si puedes, quítate los zapatos y pisa pasto o tierra (grounding). La meta semanal: sumar unos 120 minutos.',
  sci:'En un estudio con cortisol en saliva, 20 a 30 minutos en un lugar que se sintiera naturaleza bajaron más el estrés (muestra pequeña). Y en casi 20.000 personas, quienes pasaban 120 minutos o más por semana en la naturaleza reportaban mejor salud y bienestar (estudio de asociación, no prueba causa). Sobre pisar descalzo: los beneficios atribuidos a la conexión eléctrica con la tierra vienen de estudios pequeños y con poca calidad; el beneficio claro es estar afuera, en calma.'},
 {id:'cafe',m:'t',ic:'☕',t:'Última cafeína temprano',min:'8 a 10 h antes de dormir',core:1,fu:7,ev:3,
  how:'Define tu hora límite: si duermes a las 10 p. m., tu último café, té fuerte, pre-entreno o bebida energética es a más tardar a las 12 a 2 p. m. Después, agua o infusiones sin cafeína.',
  sci:'La cafeína puede seguir en tu cuerpo muchas horas y, aunque te duermas, reduce la cantidad y la calidad del sueño profundo. En un estudio, tomarla incluso 6 horas antes de acostarse redujo el sueño. Varía mucho entre personas; si eres sensible, adelanta más la hora.'},
 {id:'ultcom',m:'n',ic:'🍽️',t:'Última comida 2 a 3 h antes de dormir',min:'Cena temprano',core:1,fu:6,ev:2,
  how:'Termina de cenar 2 a 3 horas antes de acostarte. Si te da hambre después, un snack liviano (yogur, fruta, algo con proteína) y no una comida completa.',
  sci:'Acostarte con el estómago lleno se asocia con peor sueño y más reflujo, y tu cuerpo digiere peor de noche. La evidencia es moderada y viene sobre todo de estudios de observación; en la práctica a muchas personas les cambia mucho cómo duermen y amanecen.'},
 {id:'luces',m:'n',ic:'🕯️',t:'Luces bajas y sin pantallas',min:'30 a 60 min antes',core:1,fu:7,ev:2,
  how:'Apaga las luces fuertes y deja lámparas cálidas y bajas. Guarda el celular y la TV; si usas pantalla, con poco brillo y fuera de la cama.',
  sci:'La luz brillante de noche retrasa tu reloj interno y empeora el sueño. Ojo: la luz azul de la pantalla en sí tiene un efecto pequeño en los experimentos (unos minutos). Lo que más pesa es la estimulación mental y acostarte tarde por un contenido más.'},
 {id:'jour',m:'n',ic:'✍️',t:'Journaling: lista para mañana',min:'5 min',core:1,fu:6,ev:2,
  how:'Escribe 5 minutos las tareas y preocupaciones de mañana, y cierra con una cosa buena del día. Así las sacas de tu cabeza antes de acostarte.',
  sci:'En un experimento con polisomnografía, escribir 5 minutos la lista de pendientes de mañana hizo que las personas se durmieran unos 9 minutos más rápido que quienes escribían lo que ya habían hecho.'},
 {id:'grat',m:'n',ic:'🤝',t:'Gratitud y conexión',min:'3 a 5 min',core:1,fu:7,ev:2,
  how:'Anota tres cosas buenas del día o dile a alguien que quieres algo que agradeces. Si puedes, habla o comparte unos minutos con una persona cercana, sin pantalla de por medio.',
  sci:'Las intervenciones de gratitud mejoran un poco el bienestar y el ánimo (efecto pequeño pero consistente). Los vínculos sociales cercanos se asocian con mejor salud y mayor longevidad, aunque es un resultado de observación.'},
 {id:'resp_n',m:'n',ic:'🌬️',t:'Respiración con exhalación larga',min:'5 min',core:1,fu:8,ev:2,go:'dor',
  how:'Ya en la cama o antes de acostarte: inhala por la nariz y exhala lento, más largo que la inhalación. Repite 5 minutos.',
  sci:'Un meta-análisis de 31 estudios mostró que la respiración lenta baja la frecuencia cardiaca y la presión sistólica y sube la variabilidad cardiaca en poco tiempo. Hay menos estudios que midan directamente cuánto tardas en dormirte.'},
 {id:'sueno',m:'n',ic:'😴',t:'Dormir tus horas objetivo',min:'7 a 9 h',core:1,fu:10,ev:3,
  how:'Acuéstate a una hora parecida cada noche, con el cuarto oscuro y fresco. Tu coach define la meta contigo.',
  sci:'Dormir es cuando recuperas y te adaptas al entrenamiento. Es la base de todo lo demás: sin sueño, la fuerza, el ánimo y el apetito se resienten.'},
 {id:'est_n',m:'n',ic:'🧎',t:'Estiramientos suaves antes de acostarte',min:'5 min',core:0,fu:4,ev:1,
  how:'Estiramientos lentos de espalda, cadera y piernas, sin dolor y respirando tranquilo.',
  sci:'La evidencia directa sobre dormir mejor es limitada. Su valor está en ser un ritual que le avisa a tu cuerpo que el día terminó y en soltar tensión.'}
];
window.HB_LIST=H;
/* los hábitos que cuentan para el día reemplazan a los del prototipo */
try{const it=TASKS.habitos.items;it.length=0;H.filter(h=>h.core).forEach(h=>it.push({id:h.id,t:h.t,s:h.min,d:h.how}));TASKS.habitos.intro='Mañana, tarde y noche: pequeñas conductas que sostienen todo lo demás.';}catch(e){console.warn('hb',e);}
const seg=()=>{if(S.hbSeg)return S.hbSeg;const h=new Date(Date.now()-5*36e5).getUTCHours();return h<12?'m':h<18?'t':'n';};
const cnt=(m,t)=>{const L=H.filter(h=>h.m===m&&h.core);return {d:L.filter(h=>t['habitos.'+h.id]).length,n:L.length};};
const fuBar=n=>`<span class="hbfu">${Array.from({length:10},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</span><b>${n}/10</b>`;
function card(h,col,t){const k='habitos.'+h.id,on=t[k],open=S.exp['hb.'+h.id],ev=EV[h.ev];
  return `<div class="hbc${open?' open':''}${on?' done':''}" style="--c:${col}">
   <div class="hbr"><button class="chk2${on?' on':''}" data-act="task" data-k="${k}" aria-label="Marcar">✓</button>
    <button class="hbo" data-hb="${h.id}"><span class="hbi">${h.ic}</span><span class="hbn"><b>${h.t}</b><small>${h.min}${h.core?'':' · opcional'}</small></span><i class="chev">›</i></button></div>
   ${open?`<div class="hbb"><div class="hbs"><em>Cómo hacerlo</em><p>${h.how}</p></div>
     <div class="hbs"><em>Qué dice la ciencia</em><p>${h.sci}</p><span class="hbev" style="--e:${ev[1]}">${ev[0]}</span></div>
     <div class="hbs"><em>Qué tan fundamental es</em><div class="hbfr">${fuBar(h.fu)}</div></div>
     ${h.go?`<button class="btn solid hbgo" data-act="breath" data-id="${h.go}">🫁 Respirar guiado</button>`:''}</div>`:''}
  </div>`;}
function view(){const t=tk(),cur=seg(),mm=M.find(x=>x[0]===cur),col=mm[4];
  const tabs=M.map(([k,ic,n,s,c])=>{const q=cnt(k,t);return `<button class="hbt${cur===k?' on':''}" data-hbseg="${k}" style="--c:${c}"><span>${ic}</span><b>${n}</b><small>${q.d}/${q.n}</small></button>`;}).join('');
  const L=H.filter(h=>h.m===cur),core=L.filter(h=>h.core),ext=L.filter(h=>!h.core),q=cnt(cur,t);
  const all=H.filter(h=>h.core),dn=all.filter(h=>t['habitos.'+h.id]).length;
  return `<div class="hbhero" style="--c:${col}"><div><small>${S.sel===today()?'Hoy':fmtL(S.sel).split(',')[0]}</small><b>${dn} de ${all.length} hábitos</b></div><div class="hbring"><i style="width:${all.length?Math.round(dn/all.length*100):0}%"></i></div></div>
   <div class="hbtabs">${tabs}</div>
   <div class="hbtit" style="--c:${col}"><span>${mm[1]}</span><div><b>${mm[2]} · ${mm[3]}</b><small>${q.d} de ${q.n} listos</small></div></div>
   ${core.map(h=>card(h,col,t)).join('')}
   ${ext.length?`<div class="hbop">Opcional</div>${ext.map(h=>card(h,col,t)).join('')}`:''}
   <p class="hbn2">Toca un hábito para ver cómo hacerlo y qué dice la ciencia. "Qué tan fundamental" es una guía general; tu coach la ajusta a ti. Información general: no reemplaza el consejo de un profesional de la salud.</p>`;}
const pv=pillarView;pillarView=function(p){if(p!=='habitos')return pv.apply(this,arguments);try{return view();}catch(e){console.warn('hb view',e);return pv.apply(this,arguments);}};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-hb],[data-hbseg]');if(!t)return;e.stopPropagation();
  if(t.dataset.hbseg){S.hbSeg=t.dataset.hbseg;save();render();return;}
  const k='hb.'+t.dataset.hb;S.exp=S.exp||{};S.exp[k]=!S.exp[k];save();render();},true);
const st=document.createElement('style');st.textContent=`
.hbhero{display:flex;align-items:center;gap:14px;background:#1C1B19;color:#fff;border-radius:18px;padding:14px 16px;margin:4px 0 12px}.hbhero>div:first-child{flex:none}.hbhero small{display:block;font:700 10.5px Archivo,sans-serif;letter-spacing:.12em;text-transform:uppercase;opacity:.7}.hbhero b{font:700 17px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.03em}
.hbring{flex:1;height:8px;border-radius:99px;background:rgba(255,255,255,.2);overflow:hidden}.hbring i{display:block;height:100%;background:#fff;border-radius:99px;transition:width .3s}
.hbtabs{display:flex;gap:8px;margin-bottom:12px}.hbt{flex:1;display:flex;flex-direction:column;align-items:center;gap:1px;border:2px solid #DCD6CC;background:#FBFAF8;border-radius:16px;padding:10px 4px;font-family:Archivo,sans-serif;color:#1C1B19}.hbt span{font-size:22px}.hbt b{font-size:13px}.hbt small{font-size:11px;color:#5A554E}.hbt.on{border-color:var(--c);background:var(--c);color:#fff}.hbt.on small{color:#fff;opacity:.85}
.hbtit{display:flex;align-items:center;gap:10px;margin:2px 0 10px}.hbtit>span{font-size:26px}.hbtit b{display:block;font:700 15px Oswald,Archivo,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:var(--c)}.hbtit small{color:#5A554E;font-size:12px}
.hbc{background:#FBFAF8;border:1px solid #DCD6CC;border-left:6px solid var(--c);border-radius:14px;margin-bottom:8px;overflow:hidden}.hbc.done{background:#F1F8F3}
.hbr{display:flex;align-items:center;gap:8px;padding:6px 10px 6px 8px}.hbo{flex:1;display:flex;align-items:center;gap:10px;border:0;background:none;text-align:left;padding:6px 0;font-family:Archivo,sans-serif;color:#1C1B19;min-width:0}
.hbi{width:42px;height:42px;flex:none;border-radius:12px;background:#EFEDE8;display:flex;align-items:center;justify-content:center;font-size:22px}.hbn{flex:1;min-width:0}.hbn b{display:block;font-size:15px;line-height:1.2}.hbn small{color:#5A554E;font-size:12px}.hbc.done .hbn b{text-decoration:line-through;color:#7A746B}
.hbc.open .chev{transform:rotate(90deg)}
.hbb{padding:2px 14px 14px 14px;border-top:1px dashed #DCD6CC}.hbs{margin-top:10px}.hbs em{display:block;font:700 10.5px Archivo,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:var(--c);font-style:normal;margin-bottom:3px}.hbs p{margin:0;font-size:14px;line-height:1.45;color:#1C1B19}
.hbev{display:inline-block;margin-top:6px;font:700 11px Archivo,sans-serif;color:var(--e);border:1.5px solid var(--e);border-radius:99px;padding:3px 9px}
.hbfr{display:flex;align-items:center;gap:8px}.hbfu{display:flex;gap:3px;flex:1}.hbfu i{flex:1;height:9px;border-radius:3px;background:#DCD6CC}.hbfu i.on{background:var(--c)}.hbfr b{font-size:13px}
.hbgo{width:100%;margin-top:12px}.hbop{font:700 11px Archivo,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#5A554E;margin:14px 0 6px}.hbn2{font-size:11.5px;color:#7A746B;line-height:1.4;margin:14px 2px 4px}`;
document.head.appendChild(st);
})();


/* ===== Respiración con sonidos sintetizados (22 nov) ===== */
(function(){
const KEY='erre_bsnd';let mode='olas';try{mode=localStorage.getItem(KEY)||'olas';}catch(e){}
const MODES=[['olas','🌊','Olas'],['tono','🎵','Tono'],['cuenco','🔔','Cuenco'],['off','🔇','Silencio']];
if(!MODES.some(m=>m[0]===mode))mode='olas';
let ctx=null,master=null,gbus=null,abus=null,an=null,nodes=null,sil=null,pv=null;
function silent(){try{const n=8000,b=new Uint8Array(44+n),v=new DataView(b.buffer),w=(o,s)=>{for(let i=0;i<s.length;i++)b[o+i]=s.charCodeAt(i);};
  w(0,'RIFF');v.setUint32(4,36+n,true);w(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,8000,true);v.setUint32(28,8000,true);v.setUint16(32,1,true);v.setUint16(34,8,true);w(36,'data');v.setUint32(40,n,true);b.fill(128,44);
  sil=new Audio(URL.createObjectURL(new Blob([b],{type:'audio/wav'})));sil.loop=true;sil.volume=.01;sil.play().catch(()=>{});}catch(e){}}
function init(){
  if(ctx){if(ctx.state==='suspended')ctx.resume();return true;}
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return false;
  try{ctx=new AC();}catch(e){return false;}
  master=ctx.createGain();master.gain.value=.9;gbus=ctx.createGain();gbus.connect(master);abus=ctx.createGain();abus.connect(master);an=ctx.createAnalyser();master.connect(an);an.connect(ctx.destination);
  window.__bsnd={ctx,an};silent();return true;}
let noiseBuf=null;
function noise(){if(noiseBuf)return noiseBuf;const sr=ctx.sampleRate,len=sr*4,b=ctx.createBuffer(1,len,sr),d=b.getChannelData(0);let l=0;
  for(let i=0;i<len;i++){const w=Math.random()*2-1;l=(l+.02*w)/1.02;d[i]=l*3.5;}
  const f=sr*.05|0;for(let i=0;i<f;i++){const a=i/f;d[len-f+i]=d[len-f+i]*(1-a)+d[i]*a;}   // empalme suave
  return noiseBuf=b;}
function stopNodes(){if(!nodes)return;const n=nodes;nodes=null;try{const t=ctx.currentTime;n.g.gain.cancelScheduledValues(t);n.g.gain.setValueAtTime(n.g.gain.value,t);n.g.gain.linearRampToValueAtTime(0,t+.35);
  setTimeout(()=>{try{(n.src||[]).forEach(s=>s.stop());}catch(e){}},450);}catch(e){}}
function start(){
  if(nodes||mode==='off'||mode==='cuenco'&&false)return;
  if(mode==='cuenco'){nodes={g:ctx.createGain(),src:[]};return;}
  const g=ctx.createGain();g.gain.value=0;g.connect(gbus);
  if(mode==='olas'){const s=ctx.createBufferSource();s.buffer=noise();s.loop=true;const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.Q.value=.9;lp.frequency.value=250;s.connect(lp);lp.connect(g);s.start();nodes={g,lp,src:[s]};}
  else{const o1=ctx.createOscillator(),o2=ctx.createOscillator(),g2=ctx.createGain();o1.type='sine';o2.type='sine';g2.gain.value=.5;o1.connect(g);o2.connect(g2);g2.connect(g);o1.start();o2.start();nodes={g,o1,o2,src:[o1,o2]};}
}
function bell(f,vol){const t=ctx.currentTime;[[1,1],[2.76,.35],[5.4,.12]].forEach(([m,a])=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=f*m;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol*a,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+4.5/m**.5);o.connect(g);g.connect(gbus);o.start(t);o.stop(t+5);});}
/* nivel 0..1: 0 pulmones vacíos, 1 llenos */
const gq=l=>.03+.5*l*l, fq=l=>230*Math.pow(7.5,l), tq=l=>170*Math.pow(1.55,l), tg=l=>.02+.15*l;
function phase(from,to,secs){
  if(!ctx||mode==='off')return;start();if(!nodes)return;const t=ctx.currentTime;
  if(mode==='cuenco'){if(Math.abs(to-from)>.01&&from<.05+.0&&to>from||to<from&&from>.5){bell(to>from?392:294,.22);}return;}
  const g=nodes.g.gain;g.cancelScheduledValues(t);g.setValueAtTime(mode==='olas'?gq(from):tg(from),t);g.linearRampToValueAtTime(mode==='olas'?gq(to):tg(to),t+secs);
  if(mode==='olas'){const f=nodes.lp.frequency;f.cancelScheduledValues(t);f.setValueAtTime(fq(from),t);f.exponentialRampToValueAtTime(fq(to),t+secs);}
  else{[[nodes.o1,1],[nodes.o2,1.5]].forEach(([o,m])=>{o.frequency.cancelScheduledValues(t);o.frequency.setValueAtTime(tq(from)*m,t);o.frequency.exponentialRampToValueAtTime(tq(to)*m,t+secs);});}
}
function cur(){const B=BR;if(!B||B.st!=='run')return null;const P=B.P.ph,n=P.length,ph=P[B.pi],prev=P[(B.pi-1+n)%n][2],to=ph[2],fr=ph[1]?Math.min(1,B.pe/ph[1]):0;
  return {from:prev+(to-prev)*fr,to,secs:Math.max(.2,ph[1]-B.pe),hold:to===prev,start:fr<.05};}
function sync(){const c=cur();if(!c||mode==='off'){return;}if(!init())return;
  if(mode==='cuenco'){if(c.start&&!c.hold)bell(c.to>c.from?392:294,.22);return;}
  phase(c.from,c.to,c.secs);}
const sp=setPhase;setPhase=function(){sp.apply(this,arguments);try{sync();}catch(e){console.warn('snd',e);}};
const dw=drawBreath;drawBreath=function(){dw.apply(this,arguments);try{
  const B=BR;if(!B)return;
  if(B.st!=='run')stopNodes();
  const row=`<div class="bsnd"><small>Sonido</small><div class="chips" style="justify-content:center">${MODES.map(m=>`<button class="chip${mode===m[0]?' on':''}" data-bsnd="${m[0]}">${m[1]} ${m[2]}</button>`).join('')}</div></div>`;
  const e=document.getElementById('bre');if(!e)return;
  const go=e.querySelector('[data-act=bgo]'),pa=e.querySelector('[data-act=bpause]');
  if(go)go.insertAdjacentHTML('beforebegin',row);else if(pa)pa.insertAdjacentHTML('afterend',row);
 }catch(x){console.warn('snd ui',x);}};
const bc=breathClose;breathClose=function(){stopNodes();try{if(sil)sil.pause();}catch(e){}return bc.apply(this,arguments);};
function preview(){if(!init())return;if(mode==='off'){stopNodes();return;}stopNodes();
  if(mode==='cuenco'){bell(392,.22);setTimeout(()=>bell(294,.22),2200);return;}
  phase(0,1,2);setTimeout(()=>{if(BR&&BR.st==='ready'&&nodes)phase(1,0,2.2);},2000);setTimeout(()=>{if(BR&&BR.st==='ready')stopNodes();},4400);}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-bsnd]');if(!t)return;e.stopPropagation();
  mode=t.dataset.bsnd;try{localStorage.setItem(KEY,mode);}catch(x){}
  document.querySelectorAll('[data-bsnd]').forEach(b=>b.classList.toggle('on',b.dataset.bsnd===mode));
  if(BR&&BR.st==='run'){stopNodes();if(mode!=='off')setTimeout(sync,60);}else if(BR&&BR.st==='ready')preview();},true);
const st=document.createElement('style');st.textContent=`.bsnd{width:100%;max-width:340px;margin-top:16px;text-align:center}.bsnd small{display:block;font:700 10.5px Archivo,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#5A554E;margin-bottom:6px}.bsnd .chip{font-size:13px;padding:7px 11px}`;
document.head.appendChild(st);
window.__bsx={init,ctx:()=>ctx,abus:()=>abus,gbus:()=>gbus};
})();


/* ===== Respiración: pestaña rediseñada + pantalla guiada con más visual (22 nov) ===== */
(function(){
const COL={man:'#D9822B',dor:'#5B4B9A',ent:'#3F6B86',com:'#4E7D63',sigh:'#3C7FA6',caja:'#3F6B86','478':'#7A5FA0'};
const EV={3:['Evidencia sólida','#1F8F53'],2:['Evidencia moderada','#B87400'],1:['Evidencia limitada','#7A746B']};
const R={
 man:{ic:'☀️',n:'Respiración 5-5',when:'Al despertar',fu:6,ev:2,use:['Empezar el día con calma','Antes de entrenar'],
  how:'Inhala 5 segundos por la nariz y exhala 5 segundos, suave y continuo. Siéntate o acuéstate cómodo, 2 a 3 minutos.',
  sci:'Respirar lento, cerca de 6 veces por minuto, sube la variabilidad de la frecuencia cardiaca y baja la frecuencia cardiaca y la presión en los minutos siguientes (revisiones de decenas de estudios). Es una forma simple de empezar el día regulado.'},
 dor:{ic:'🌙',n:'Antes de dormir',when:'Ya en la cama o antes de acostarte',fu:8,ev:2,use:['Dormir mejor','Soltar la mente'],
  how:'Inhala 4 segundos y exhala 6. La exhalación más larga que la inhalación calma. Hazlo 3 a 5 minutos con luces bajas.',
  sci:'La respiración lenta con exhalación larga activa la rama calmante del sistema nervioso (parasimpático). Hay evidencia clara de que baja la activación del cuerpo; hay menos estudios que midan directamente cuánto tardas en dormirte.'},
 ent:{ic:'🏋️',n:'Vuelta a la calma',when:'Al terminar tu sesión',fu:5,ev:1,use:['Después de entrenar','Bajar revoluciones'],
  how:'Sentado o acostado, inhala 4 y exhala 6 por la nariz, 2 minutos, apenas termines de entrenar.',
  sci:'Bajar la frecuencia respiratoria ayuda a que el cuerpo salga del modo de esfuerzo. Los estudios sobre recuperación física directa son limitados; el valor claro es la sensación de calma y el cierre de la sesión.'},
 com:{ic:'🍽️',n:'Asentar la comida',when:'Si te cae pesado',fu:6,ev:2,use:['Después de comer','Digestión pesada'],
  how:'Sentado y relajado, inhala 4 y exhala 6, 2 a 5 minutos después de comer.',
  sci:'La respiración lenta sube la variabilidad cardiaca, una señal de más calma del sistema nervioso. Que además mejore la digestión es plausible pero hay poca evidencia directa.'},
 sigh:{ic:'😮‍💨',n:'Suspiro fisiológico',when:'Cuando estés estresado',fu:6,ev:2,use:['Estrés del momento','Reset rápido de 1 min'],
  how:'Dos inhalaciones cortas por la nariz (la segunda para llenar del todo) y una exhalación larga por la boca. Repite unas 5 veces o 1 minuto.',
  sci:'En un ensayo de Stanford con 108 personas, 5 minutos al día de "suspiro cíclico" mejoraron el ánimo y bajaron la frecuencia respiratoria algo más que la meditación mindfulness. Es un estudio, así que lo tomamos como prometedor.'},
 caja:{ic:'🟦',n:'Respiración en caja',when:'Cuando quieras concentrarte',fu:4,ev:1,use:['Enfocarte','Antes de una tarea difícil'],
  how:'Inhala 4, sostén 4, exhala 4, sostén 4. Ritmo constante, sin tensar el cuello ni los hombros.',
  sci:'Es respiración pautada y lenta, usada mucho para foco y calma. Hay pocos estudios que la evalúen por sí sola; funciona por el mismo mecanismo de bajar la frecuencia respiratoria.'},
 '478':{ic:'🌀',n:'Respiración 4-7-8',when:'Para soltar tensión',fu:4,ev:1,use:['Soltar tensión','Antes de dormir'],
  how:'Inhala 4 por la nariz, sostén 7 y exhala 8 por la boca. Empieza con 4 ciclos. Si te mareas, acorta las pausas.',
  sci:'Es muy popular, pero hay muy pocos estudios directos. Lo más probable es que ayude por la exhalación larga, igual que las otras técnicas lentas.'}
};
window.RB_INFO=R;
const pat=(id,c)=>{const ph=BP[id].ph,tot=ph.reduce((s,p)=>s+p[1],0),prev=i=>ph[(i-1+ph.length)%ph.length][2];
  return `<div class="rbpat">${ph.map((p,i)=>{const up=p[2]>prev(i),dn=p[2]<prev(i),cl=up?'u':dn?'d':'h';return `<span class="rbs ${cl}" style="flex:${p[1]};--c:${c}"><b>${p[1]}</b></span>`;}).join('')}</div>
  <div class="rbleg"><span><i class="u" style="--c:${c}"></i>Inhala</span><span><i class="h"></i>Sostén</span><span><i class="d" style="--c:${c}"></i>Exhala</span></div>`;};
const fuBar=n=>`<span class="hbfu">${Array.from({length:10},(_,i)=>`<i class="${i<n?'on':''}"></i>`).join('')}</span><b>${n}/10</b>`;
function card(id,col,t,check){const x=R[id],c=COL[id],open=S.exp['rb.'+id],k='recovery.'+id,on=t[k],ev=EV[x.ev];
  return `<div class="hbc rbc${open?' open':''}${check&&on?' done':''}" style="--c:${c}">
   <div class="hbr">${check?`<button class="chk2${on?' on':''}" data-act="task" data-k="${k}" aria-label="Marcar">✓</button>`:''}
    <button class="hbo" data-rb="${id}"><span class="hbi" style="background:color-mix(in srgb,${c} 16%,var(--card))">${x.ic}</span><span class="hbn"><b>${x.n}</b><small>${x.when}</small></span><i class="chev">›</i></button></div>
   <div class="rbmini">${pat(id,c)}</div>
   ${open?`<div class="hbb"><div class="hbs"><em>Cómo hacerlo</em><p>${x.how}</p></div>
    <div class="hbs"><em>Te sirve para</em><div class="rbuse">${x.use.map(u=>`<span style="--c:${c}">${u}</span>`).join('')}</div></div>
    <div class="hbs"><em>Qué dice la ciencia</em><p>${x.sci}</p><span class="hbev" style="--e:${ev[1]}">${ev[0]}</span></div>
    <div class="hbs"><em>Qué tan fundamental es</em><div class="hbfr">${fuBar(x.fu)}</div></div></div>`:''}
   <button class="btn solid rbgo" data-act="breath" data-id="${id}" style="background:${c};border-color:${c}">🫁 Respirar guiado · ${BP[id].min} min</button>
  </div>`;}
function view(){const t=tk(),col='#3F6B86',core=['man','dor'],dn=core.filter(i=>t['recovery.'+i]).length,extra=['ent','com','sigh','caja','478'];
  return `<div class="hbhero" style="--c:${col}"><div><small>${S.sel===today()?'Hoy':fmtL(S.sel).split(',')[0]}</small><b>${dn} de 2 respiraciones</b></div><div class="hbring"><i style="width:${dn*50}%"></i></div></div>
   <button class="rbnow" data-act="breath" data-id="sigh"><span>😮‍💨</span><div><b>Calmarme ahora</b><small>Suspiro fisiológico · 1 minuto</small></div><i>›</i></button>
   <div class="hbtit" style="--c:${col}"><span>🫁</span><div><b>Tus momentos del día</b><small>Mañana y noche: las dos que cuentan</small></div></div>
   ${core.map(i=>card(i,col,t,true)).join('')}
   <div class="hbtit" style="--c:${col};margin-top:16px"><span>🧰</span><div><b>Cuando lo necesites</b><small>Técnicas extra, sin marcar</small></div></div>
   ${extra.map(i=>card(i,col,t,false)).join('')}
   <p class="hbn2">Toca una técnica para ver cómo hacerla y qué dice la ciencia. Si te mareas, para y respira normal. Información general: no reemplaza el consejo de un profesional de la salud.</p>`;}
const pv=pillarView;pillarView=function(p){if(p!=='recovery')return pv.apply(this,arguments);try{return view();}catch(e){console.warn('rb view',e);return pv.apply(this,arguments);}};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-rb]');if(!t)return;e.stopPropagation();const k='rb.'+t.dataset.rb;S.exp=S.exp||{};S.exp[k]=!S.exp[k];save();render();},true);

/* pantalla guiada */
const dw=drawBreath;drawBreath=function(){dw.apply(this,arguments);try{const B=BR,e=document.getElementById('bre');if(!B||!e)return;
  const c=COL[B.id]||'#3F6B86';e.style.setProperty('--bc',c);
  if(B.st==='ready'){const h=e.querySelector('.sub2');if(h)h.insertAdjacentHTML('afterend',`<div class="rbpw">${pat(B.id,c)}</div>`);}
  if(B.st==='run'||B.st==='pause'){const w=e.querySelector('.brwrap');if(w&&!document.getElementById('brp'))w.insertAdjacentHTML('beforebegin',`<div class="brp"><i id="brp" style="width:${Math.min(100,B.el/B.dur*100)}%"></i></div>`);}
 }catch(x){console.warn('rb ui',x);}};
const bt=breathTick;breathTick=function(){bt.apply(this,arguments);const B=BR,p=document.getElementById('brp');if(B&&p)p.style.width=Math.min(100,B.el/B.dur*100)+'%';};

const st=document.createElement('style');st.textContent=`
.rbc .hbr{padding-bottom:0}.rbmini{padding:2px 14px 10px 62px}
.rbpat{display:flex;gap:3px;height:22px}.rbs{display:flex;align-items:center;justify-content:center;border-radius:6px;min-width:22px;font:700 11px Archivo,sans-serif}.rbs b{font-weight:700}
.rbs.u{background:var(--c);color:#fff}.rbs.d{background:color-mix(in srgb,var(--c) 30%,var(--card));color:var(--ink,#1C1B19)}.rbs.h{background:rgba(128,128,128,.3);color:var(--ink,#1C1B19)}
.rbleg{display:flex;gap:12px;margin-top:5px;font-size:10.5px;color:var(--gray,#5A554E)}.rbleg span{display:flex;align-items:center;gap:4px}.rbleg i{width:9px;height:9px;border-radius:3px;display:inline-block}.rbleg i.u{background:var(--c)}.rbleg i.d{background:color-mix(in srgb,var(--c) 30%,var(--card))}.rbleg i.h{background:rgba(128,128,128,.4)}
.rbuse{display:flex;flex-wrap:wrap;gap:6px;margin-top:2px}.rbuse span{font:600 12px Archivo,sans-serif;color:var(--c);background:color-mix(in srgb,var(--c) 14%,var(--card));border-radius:99px;padding:5px 10px}
.rbgo{display:block;width:calc(100% - 28px);margin:10px 14px 14px;color:#fff!important}
.rbnow{display:flex;align-items:center;gap:12px;width:100%;border:0;border-radius:18px;padding:14px 16px;margin:0 0 14px;color:#fff;text-align:left;background:linear-gradient(135deg,#3C7FA6,#5B4B9A);font-family:Archivo,sans-serif}.rbnow span{font-size:30px}.rbnow b{display:block;font-size:16px}.rbnow small{opacity:.85;font-size:12px}.rbnow>i{margin-left:auto;font-size:24px;font-style:normal}
.rbpw{width:100%;max-width:300px;margin:12px 0 0}
#bre{background:radial-gradient(ellipse at 50% 34%,color-mix(in srgb,var(--bc,#3F6B86) 30%,var(--bg)) 0%,var(--bg) 72%)}
#bre .brwrap{height:310px}
#bre .brc{width:210px;height:210px;border:0;margin:40px 0 24px;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,#fff 28%,var(--bc,#3F6B86)),var(--bc,#3F6B86) 70%);box-shadow:0 0 0 16px color-mix(in srgb,var(--bc,#3F6B86) 18%,transparent),0 0 0 36px color-mix(in srgb,var(--bc,#3F6B86) 9%,transparent),0 0 90px color-mix(in srgb,var(--bc,#3F6B86) 55%,transparent)}
#bre .brc b,#bre .brc span{color:#fff;text-shadow:0 1px 8px rgba(0,0,0,.18)}
.brp{width:100%;max-width:300px;height:5px;border-radius:99px;background:color-mix(in srgb,var(--bc,#3F6B86) 18%,transparent);overflow:hidden;margin-top:10px}.brp i{display:block;height:100%;background:var(--bc,#3F6B86);border-radius:99px;transition:width .2s linear}
#bre .chip.on{background:var(--bc,#1C1B19);border-color:var(--bc,#1C1B19);color:#fff}
#bre .btn.solid{background:var(--bc,#1C1B19);border-color:var(--bc,#1C1B19);color:#fff}`;
document.head.appendChild(st);
})();


/* ===== Respiración: más duraciones + mezclador de ambientes (22 nov) ===== */
(function(){
const X=()=>window.__bsx,KEY='erre_bmix';
let mix={guide:.9,amb:{}};try{const m=JSON.parse(localStorage.getItem(KEY)||'{}');if(typeof m.guide==='number')mix.guide=m.guide;if(m.amb&&typeof m.amb==='object')mix.amb=m.amb;}catch(e){}
const save2=()=>{try{localStorage.setItem(KEY,JSON.stringify(mix));}catch(e){}};
const AMB=[['lluvia','🌧️','Lluvia'],['mar','🌊','Mar'],['viento','🌬️','Viento'],['bosque','🦗','Noche de grillos'],['blanco','⚪','Ruido blanco'],['marron','🟤','Ruido marrón']];
const MIX_ARCHIVED=true; /* archivado 22 nov: los sonidos sintetizados no convencen; volver a false para reactivar */
let live={},open=false,bw=null,bb=null;
function bufs(ctx){if(bw)return;const sr=ctx.sampleRate,len=sr*4;bw=ctx.createBuffer(1,len,sr);bb=ctx.createBuffer(1,len,sr);const a=bw.getChannelData(0),b=bb.getChannelData(0);let l=0;
  for(let i=0;i<len;i++){const w=Math.random()*2-1;a[i]=w;l=(l+.02*w)/1.02;b[i]=l*3.5;}
  const f=sr*.05|0;for(const d of [a,b])for(let i=0;i<f;i++){const k=i/f;d[len-f+i]=d[len-f+i]*(1-k)+d[i]*k;}}
function make(id){const x=X(),ctx=x.ctx();bufs(ctx);const out=ctx.createGain();out.gain.value=0;out.connect(x.abus());const stops=[],tim=[];
  const src=(buf)=>{const s=ctx.createBufferSource();s.buffer=buf;s.loop=true;s.start(ctx.currentTime,Math.random()*2);stops.push(()=>s.stop());return s;};
  const lfo=(hz,depth,param)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=hz;g.gain.value=depth;o.connect(g);g.connect(param);o.start();stops.push(()=>o.stop());};
  const biq=(type,f,q)=>{const n=ctx.createBiquadFilter();n.type=type;n.frequency.value=f;if(q)n.Q.value=q;return n;};
  if(id==='lluvia'){const s=src(bw),hp=biq('highpass',700),lp=biq('lowpass',7500),g=ctx.createGain();g.gain.value=.42;s.connect(hp);hp.connect(lp);lp.connect(g);g.connect(out);
    tim.push(setInterval(()=>{if(Math.random()<.55){const t=ctx.currentTime,d=ctx.createBufferSource();d.buffer=bw;const bp=biq('bandpass',1500+Math.random()*4500,3),dg=ctx.createGain();dg.gain.setValueAtTime(0,t);dg.gain.linearRampToValueAtTime(.35*Math.random()+.1,t+.004);dg.gain.exponentialRampToValueAtTime(.0001,t+.05);d.connect(bp);bp.connect(dg);dg.connect(out);d.start(t,Math.random()*3,.07);}},90));}
  else if(id==='mar'){const s=src(bb),lp=biq('lowpass',650),g=ctx.createGain();g.gain.value=.6;s.connect(lp);lp.connect(g);g.connect(out);lfo(.085,.38,g.gain);lfo(.12,260,lp.frequency);}
  else if(id==='viento'){const s=src(bw),bp=biq('bandpass',600,1.2),g=ctx.createGain();g.gain.value=.5;s.connect(bp);bp.connect(g);g.connect(out);lfo(.06,320,bp.frequency);lfo(.1,.3,g.gain);}
  else if(id==='bosque'){const s=src(bb),lp=biq('lowpass',320),g=ctx.createGain();g.gain.value=.3;s.connect(lp);lp.connect(g);g.connect(out);
    const chirp=()=>{const t0=ctx.currentTime,f=4200+Math.random()*700,n=2+(Math.random()*3|0);for(let i=0;i<n;i++){const o=ctx.createOscillator(),og=ctx.createGain(),t=t0+i*.075;o.type='sine';o.frequency.value=f;og.gain.setValueAtTime(0,t);og.gain.linearRampToValueAtTime(.045,t+.012);og.gain.linearRampToValueAtTime(0,t+.04);o.connect(og);og.connect(out);o.start(t);o.stop(t+.06);}};
    const loop=()=>{chirp();tim.push(setTimeout(loop,500+Math.random()*1800));};tim.push(setTimeout(loop,300));}
  else if(id==='blanco'){const s=src(bw),g=ctx.createGain();g.gain.value=.3;s.connect(g);g.connect(out);}
  else{const s=src(bb),lp=biq('lowpass',520),g=ctx.createGain();g.gain.value=1.5;s.connect(lp);lp.connect(g);g.connect(out);}
  return {out,stop(){tim.forEach(t=>{clearInterval(t);clearTimeout(t);});const t=ctx.currentTime;try{out.gain.cancelScheduledValues(t);out.gain.setValueAtTime(out.gain.value,t);out.gain.linearRampToValueAtTime(0,t+.5);}catch(e){}setTimeout(()=>stops.forEach(f=>{try{f();}catch(e){}}),650);}};}
const lvl=id=>(mix.amb[id]||0)*.8;
function startAmb(id){const x=X();if(!x||!x.init())return;if(!live[id])live[id]=make(id);const t=x.ctx().currentTime;live[id].out.gain.setTargetAtTime(lvl(id),t,.25);}
function stopAmb(id){if(live[id]){live[id].stop();delete live[id];}}
function stopAll(){Object.keys(live).forEach(stopAmb);}
function applyGuide(){const x=X();if(x&&x.gbus())x.gbus().gain.setTargetAtTime(mix.guide,x.ctx().currentTime,.1);}
function playSaved(){const ids=Object.keys(mix.amb).filter(k=>mix.amb[k]>0);if(!ids.length)return;const x=X();if(!x||!x.init())return;applyGuide();ids.forEach(startAmb);}
function panel(){const n=Object.keys(mix.amb).filter(k=>mix.amb[k]>0).length;
  return `<div class="bmx"><button class="bmxt" data-bmx="t">🎚️ Mezclador${n?` · ${n} ambiente${n>1?'s':''}`:''}<i>${open?'▴':'▾'}</i></button>${open?`<div class="bmxb">
   <div class="bmxr"><span>🫁 Guía de respiración</span><input type="range" min="0" max="100" value="${Math.round(mix.guide*100)}" data-bvol="guide"></div>
   <div class="bmxh">Ambientes (mezcla los que quieras)</div>
   ${AMB.map(([id,ic,n])=>{const v=mix.amb[id]||0;return `<div class="bmxr${v>0?' on':''}"><button data-bamb="${id}">${ic} ${n}</button><input type="range" min="0" max="100" value="${Math.round(v*100)}" data-bvol="${id}"></div>`;}).join('')}
  </div>`:''}</div>`;}
const dw=drawBreath;drawBreath=function(){dw.apply(this,arguments);try{const B=BR,e=document.getElementById('bre');if(!B||!e)return;
  if(B.st==='ready'){const ch=e.querySelector('[data-act=bdur]');if(ch){const par=ch.parentElement;par.style.flexWrap='wrap';[10,15,20].forEach(m=>par.insertAdjacentHTML('beforeend',`<button class="chip${B.dur===m*60?' on':''}" data-act="bdur" data-v="${m}">${m} min</button>`));}}
  if(!MIX_ARCHIVED){const sn=e.querySelector('.bsnd');if(sn&&B.st!=='done')sn.insertAdjacentHTML('afterend',panel());
  if(B.st==='done')stopAll();else playSaved();}
 }catch(x){console.warn('bmx',x);}};
const bc=breathClose;breathClose=function(){stopAll();return bc.apply(this,arguments);};
function refresh(){const e=document.querySelector('#bre .bmx');if(e)e.outerHTML=panel();}
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-bmx],[data-bamb]');if(!t)return;e.stopPropagation();
  if(t.dataset.bmx){open=!open;refresh();return;}
  const id=t.dataset.bamb;if(mix.amb[id]>0){mix.amb[id]=0;stopAmb(id);}else{mix.amb[id]=.5;startAmb(id);}save2();refresh();},true);
document.addEventListener('input',e=>{const t=e.target;if(!t.dataset||t.dataset.bvol==null)return;const id=t.dataset.bvol,v=t.value/100;
  if(id==='guide'){mix.guide=v;applyGuide();save2();return;}
  const was=mix.amb[id]>0;mix.amb[id]=v;save2();if(v>0){startAmb(id);const x=X();if(live[id])live[id].out.gain.setTargetAtTime(lvl(id),x.ctx().currentTime,.1);}else stopAmb(id);
  const r=t.closest('.bmxr');if(r)r.classList.toggle('on',v>0);});
const st=document.createElement('style');st.textContent=`#bre{overflow-y:auto;-webkit-overflow-scrolling:touch}
.bmx{width:100%;max-width:340px;margin-top:14px}.bmxt{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;border:1.5px solid var(--line,#DCD6CC);background:var(--card,#FBFAF8);color:var(--ink,#1C1B19);border-radius:14px;padding:11px;font:700 13px Archivo,sans-serif}.bmxt i{font-style:normal;opacity:.6}
.bmxb{margin-top:8px;background:var(--card,#FBFAF8);border:1px solid var(--line,#DCD6CC);border-radius:14px;padding:6px 12px 12px}.bmxh{font:700 10.5px Archivo,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--gray,#5A554E);margin:12px 0 2px}
.bmxr{display:flex;align-items:center;gap:10px;padding:7px 0}.bmxr>button,.bmxr>span{flex:0 0 140px;text-align:left;border:0;background:none;font:600 13.5px Archivo,sans-serif;color:var(--gray,#5A554E);padding:0}.bmxr.on>button{color:var(--ink,#1C1B19)}
.bmxr input[type=range]{flex:1;min-width:0;accent-color:var(--bc,#3F6B86);opacity:.55}.bmxr.on input[type=range],.bmxr>span+input[type=range]{opacity:1}`;
document.head.appendChild(st);
window.__bmix={mix,startAmb,stopAll};
})();


/* ===== Cronómetro de la sesión + duración al finalizar (22 nov) ===== */
(function(){
const fmt=ms=>{const s=Math.max(0,Math.floor(ms/1000)),h=Math.floor(s/3600),m=Math.floor(s%3600/60),r=s%60,p=n=>String(n).padStart(2,'0');return h?`${h}:${p(m)}:${p(r)}`:`${p(m)}:${p(r)}`;};
const ck=g=>S.sel+'|'+g;
const t0=g=>(S.tw===g&&S.tgD===today()&&S.tgAt)||((S.cst||{})[ck(g)])||(g==='g_fuerza'?((S.t0||{})[S.sel]||0):0);
const long=ms=>{const m=Math.round(ms/60000);if(m<1)return 'menos de 1 min';return m>=60?`${Math.floor(m/60)} h ${m%60?String(m%60).padStart(2,'0')+' min':''}`.trim():m+' min';};
function ensure(){
  const g=S.tg;if(!g||g==='g_calm')return null;
  const fe=S.fb&&S.fb[fbKey(g)];if(fe)return {done:true,dur:fe.dur};
  let t=t0(g);if(!t){S.cst=S.cst||{};S.cst[ck(g)]=t=Date.now();save();}
  return {t};}
function inject(){
  const r=document.querySelector('.sesh .sesr');if(!r||r.querySelector('.sesclk'))return;
  const st=ensure();if(!st)return;
  const el=document.createElement('div');el.className='sesclk';
  el.innerHTML=st.done?`<small>Duración</small><b>${st.dur?st.dur+' min':'—'}</b>`:`<small>Tiempo</small><b id="sesclk" data-t="${st.t}">${fmt(Date.now()-st.t)}</b>`;
  r.appendChild(el);
  const tb=r.querySelector('.sest b');if(tb){const sh={g_fuerza:'Fuerza',g_cardio:'Cardio'}[S.tg];if(sh)tb.textContent=sh;}}
const r0=render;render=function(){const x=r0.apply(this,arguments);try{inject();}catch(e){console.warn('clk',e);}return x;};
setInterval(()=>{const b=document.getElementById('sesclk');if(b)b.textContent=fmt(Date.now()-(+b.dataset.t||Date.now()));},1000);
/* al finalizar: duración en la hoja y en el aviso */
const of=openFinish;openFinish=function(g){of.apply(this,arguments);try{const t=t0(g);if(!t||g==='g_calm')return;
  const sub=document.querySelector('#sheet .celeb .sub');if(sub&&!document.querySelector('#sheet .fdur'))sub.insertAdjacentHTML('afterend',`<div class="fdur"><span>⏱</span><div><small>Duración de la sesión</small><b>${long(Date.now()-t)}</b></div></div>`);}catch(e){console.warn('fdur',e);}};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="fbsave"]');if(!t)return;try{const g=t.dataset.g,s=t0(g);window.__lastDur=(s&&g!=='g_calm')?long(Date.now()-s):null;if(window.__lastDur){const mn=Math.round((Date.now()-s)/60000);setTimeout(()=>{try{const f=S.fb[fbKey(g)];if(f&&!f.dur&&mn>=1&&mn<=300){f.dur=mn;save();}}catch(e){}},50);}}catch(x){window.__lastDur=null;}},true);
const ts=toast;toast=function(m){if(window.__lastDur&&typeof m==='string'&&m.indexOf('Sesión guardada')===0){m=m.replace(/ ✓$/,'')+' · '+window.__lastDur+' ✓';window.__lastDur=null;}return ts.call(this,m);};
const st=document.createElement('style');st.textContent=`.sesh .sest span{white-space:normal!important;display:-webkit-box!important;-webkit-line-clamp:2;-webkit-box-orient:vertical;line-height:1.2}.sesclk{flex:none;text-align:right;background:rgba(255,255,255,.18);border-radius:12px;padding:4px 10px;line-height:1.1}.sesclk small{display:block;font:700 9px Archivo,sans-serif;letter-spacing:.1em;text-transform:uppercase;opacity:.8}.sesclk b{font:700 16px Oswald,Archivo,sans-serif;font-variant-numeric:tabular-nums;letter-spacing:.02em}
.fdur{display:flex;align-items:center;justify-content:center;gap:10px;margin:10px auto 4px;background:var(--paper,#EFEDE8);border-radius:14px;padding:10px 16px;width:max-content;max-width:100%}.fdur span{font-size:24px}.fdur small{display:block;font:700 10px Archivo,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:var(--gray,#5A554E)}.fdur b{font:700 20px Oswald,Archivo,sans-serif}`;
document.head.appendChild(st);
})();

/* Android: agarres/posturas no se salen de la pantalla (22 nov) */
(function(){const st=document.createElement('style');st.textContent=`.grprow{flex-wrap:wrap!important;row-gap:4px}.grprow .chips{flex-wrap:wrap!important;flex:1 1 auto;min-width:0}.grp .chip{white-space:nowrap}`;document.head.appendChild(st);})();


/* ===== Más meriendas, universales y por cultura (22 nov) ===== */
(function(){
const add=(c,n,e,comp,r)=>{AL_O.m.push([n,e,comp,{r:r,e:undefined}]);if(c)AL_CUL[n]=c;};
/* universales: aparecen en todas las culturas */
add(null,'Manzana con mantequilla de maní','🍎🥜',{fr:'Manzana',f:'Mantequilla de maní'},'Corta la manzana en rodajas y acompáñala con 1 cucharada de mantequilla de maní.');
add(null,'Uvas con queso','🍇🧀',{p:'Queso campesino / requesón',fr:'Uvas / kiwi'},'Una porción de queso en cubos con un puñado de uvas. Listo en 1 minuto.');
add(null,'Tostada con requesón y fresas','🍞🧀🍓',{p:'Queso campesino / requesón',c:'Pan integral',fr:'Fresas'},'Tuesta el pan, unta el requesón y cubre con las fresas en rodajas.');
add(null,'Yogurt con chía y papaya','🥣🍈',{p:'Yogurt griego',f:'Semillas (chía, girasol)',fr:'Papaya'},'Mezcla el yogurt con las semillas y sirve con la papaya en cubos.');
add(null,'Fruta fresca picada','🍍🍊🍓',{fr:'Piña'},'Pica 2 o 3 frutas que te gusten (piña, naranja, fresas) y come con calma. Si quieres más proteína, súmale un yogurt.');
/* por cultura */
add('co','Arepa con queso','🫓🧀',{p:'Queso campesino / requesón',c:'Arepa'},'Asa la arepa en sartén y rellénala con el queso en láminas hasta que se derrita un poco.');
add('co','Plátano asado con queso','🍌🧀',{p:'Queso campesino / requesón',c:'Plátano'},'Asa el plátano maduro con su cáscara o en sartén sin aceite y acompáñalo con el queso.');
add('mx','Pepino con limón y requesón','🥒🍋🧀',{p:'Queso campesino / requesón',v:'Pepino'},'Corta el pepino en bastones, báñalo con limón, sal y una pizca de chile y come con el requesón.');
add('mx','Tostada con aguacate y huevo','🥑🍞🥚',{p:'Huevos',c:'Pan integral',f:'Aguacate (½)'},'Tuesta el pan, aplasta el aguacate con limón y sal, y corona con huevo duro en rodajas.');
add('es','Tostada con tomate y atún','🍞🍅🐟',{p:'Atún',c:'Pan integral',v:'Tomate',f:'Aceite de oliva'},'Tuesta el pan, frota tomate maduro, un chorrito de aceite de oliva y el atún por encima.');
add('es','Requesón con uvas y nueces','🧀🍇🥜',{p:'Queso campesino / requesón',f:'Almendras / maní / nueces',fr:'Uvas / kiwi'},'Sirve el requesón en un bowl con las uvas y unas nueces troceadas.');
add('es','Naranja con almendras','🍊🥜',{fr:'Naranja',f:'Almendras / maní / nueces'},'Una naranja pelada en gajos con un puñado pequeño de almendras.');
add('pe','Camote asado con queso','🍠🧀',{p:'Queso campesino / requesón',c:'Batata'},'Hornea o asa el camote hasta que esté suave y acompáñalo con el queso fresco.');
add('pe','Quinua con yogurt y fresas','🥣🌾🍓',{p:'Yogurt griego',c:'Quinua',fr:'Fresas'},'Mezcla un poco de quinua ya cocida con el yogurt y las fresas picadas.');
add('eu','Pan integral con requesón y tomate','🍞🧀🍅',{p:'Queso campesino / requesón',c:'Pan integral',v:'Tomate',f:'Aceite de oliva'},'Tuesta el pan, unta el requesón y añade tomate en rodajas con orégano y aceite de oliva.');
add('eu','Yogurt griego con nueces','🥣🥜🍯',{p:'Yogurt griego',f:'Almendras / maní / nueces',fr:'Uvas / kiwi'},'Yogurt griego con nueces troceadas y fruta fresca por encima.');
add('us','Cottage cheese con piña','🧀🍍',{p:'Queso campesino / requesón',fr:'Piña'},'Requesón (cottage cheese) con piña en cubos. Alto en proteína y muy fácil.');
add('us','Mix de frutos secos y uvas','🥜🍇',{f:'Almendras / maní / nueces',fr:'Uvas / kiwi'},'Un puñado pequeño de frutos secos con uvas. Mide la porción: los frutos secos son calóricos.');
add('au','Tostada con aguacate','🥑🍞',{c:'Pan integral',f:'Aguacate (½)',p:'Huevos'},'Aplasta el aguacate con limón sobre pan tostado y suma un huevo duro si quieres más proteína.');
add('au','Fruta con yogurt y coco','🥣🥭🥥',{p:'Yogurt griego',fr:'Mango'},'Yogurt con mango en cubos; si tienes coco rallado sin azúcar, una pizca encima.');
})();


/* ===== Más hitos con puntos + sistema de puntos revisado (22 nov) ===== */
(function(){
const P=(i,t,v,n,p,c)=>({i,t,v,n,p,c});
const CAT0=[['fu',0,6],['sw',6,9],['rg',9,15],['dp',15,18],['re',18,21],['ha',21,24],['al',24,27],['pe',27,30],['pa',30,33],['ca',33,36],['fo',36,38],['te',38,41]];
milestones=function(g){
  const wN=wlist().length,zN=Math.max(Object.values(S.cardio).filter(c=>c&&c.done).length,g.nC||0),pm=photoMonths().length;
  const L=[
   P('🏁','Primer entrenamiento',g.nT,1,10),P('💪','5 entrenamientos',g.nT,5,25),P('🔥','10 entrenamientos',g.nT,10,40),P('🏋️','25 entrenamientos',g.nT,25,75),P('🏆','50 entrenamientos',g.nT,50,150),P('🥇','100 entrenamientos',g.nT,100,300),
   P('🗓️','Primera semana completa',g.wkOk,1,30),P('📅','4 semanas completas',g.wkOk,4,100),P('🎯','12 semanas completas',g.wkOk,12,250),
   P('📆','Racha de 3 días',g.best,3,15),P('🔥','Racha de 7 días',g.best,7,30),P('⚡','Racha de 14 días',g.best,14,60),P('👑','Racha de 30 días',g.best,30,120),P('🚀','Racha de 60 días',g.best,60,150),P('💎','Racha de 100 días',g.best,100,250),
   P('⭐','Primer día perfecto',g.perf,1,20),P('🌟','7 días perfectos',g.perf,7,90),P('✨','21 días perfectos',g.perf,21,200),
   P('🫁','Primera respiración completa',g.rec,1,10),P('🌬️','7 días de respiración',g.rec,7,30),P('🧘','21 días de respiración',g.rec,21,70),
   P('🌅','Primer día de hábitos completos',g.hab,1,10),P('☀️','7 días de hábitos',g.hab,7,35),P('🌿','21 días de hábitos',g.hab,21,80),
   P('🥗','Primer día de alimentación completa',g.ali,1,10),P('🍎','7 días de alimentación',g.ali,7,35),P('🥑','21 días de alimentación',g.ali,21,80),
   P('⚖️','Primer peso registrado',wN,1,5),P('📈','7 pesajes',wN,7,20),P('📊','30 pesajes',wN,30,60),
   P('👟','Primer día con meta de pasos',g.stepsOk,1,10),P('🚶','7 días con meta de pasos',g.stepsOk,7,30),P('🏃','30 días con meta de pasos',g.stepsOk,30,90),
   P('❤️','Primer cardio completado',zN,1,15),P('🫀','10 cardios completados',zN,10,40),P('🔋','25 cardios completados',zN,25,80),
   P('📸','Fotos de inicio',pm,1,20),P('🖼️','3 meses de fotos',pm,3,40),
   P('🎂','Un mes con ERRE',g.ten,30,30),P('🎉','3 meses con ERRE',g.ten,90,100),P('🏅','6 meses con ERRE',g.ten,180,200)
  ];
  CAT0.forEach(([c,a,b])=>{for(let i=a;i<b;i++)L[i].c=c;});
  return L.concat([
   P('🏆','9 meses con ERRE',g.ten,270,250,'te'),P('🥇','1 año con ERRE',g.ten,365,400,'te'),P('💫','18 meses con ERRE',g.ten,540,500,'te'),P('🌟','2 años con ERRE',g.ten,730,700,'te'),P('👑','3 años con ERRE',g.ten,1095,1000,'te'),
   P('🔥','Racha de fuerza: 3 seguidos',g.bF,3,20,'fu'),P('⚡','Racha de fuerza: 7 seguidos',g.bF,7,50,'fu'),P('👑','Racha de fuerza: 15 seguidos',g.bF,15,120,'fu'),
   P('🔥','Racha de cardio: 3 seguidos',g.bC,3,15,'ca'),P('⚡','Racha de cardio: 7 seguidos',g.bC,7,40,'ca'),P('👑','Racha de cardio: 14 seguidos',g.bC,14,90,'ca'),
   P('🧘','Primera vuelta a la calma',g.nQ,1,10,'vc'),P('🌙','10 vueltas a la calma',g.nQ,10,40,'vc'),P('🕊️','25 vueltas a la calma',g.nQ,25,80,'vc'),
   P('🔥','Racha de respiración: 3 días',g.bR,3,15,'re'),P('⚡','Racha de respiración: 7 días',g.bR,7,40,'re'),P('👑','Racha de respiración: 21 días',g.bR,21,100,'re'),
   P('🔥','Racha de hábitos: 3 días',g.bH,3,15,'ha'),P('⚡','Racha de hábitos: 7 días',g.bH,7,40,'ha'),P('👑','Racha de hábitos: 21 días',g.bH,21,100,'ha'),
   P('🔥','Racha de alimentación: 3 días',g.bA,3,15,'al'),P('⚡','Racha de alimentación: 7 días',g.bA,7,40,'al'),P('👑','Racha de alimentación: 21 días',g.bA,21,100,'al'),
   P('📝','Primer chequeo quincenal',g.nK,1,15,'ck'),P('📋','3 chequeos quincenales',g.nK,3,40,'ck'),P('🗂️','6 chequeos quincenales',g.nK,6,80,'ck')
  ]);
};
gam=function(){
  const t=today(),from=(S.start&&S.start>addD(t,-180))?S.start:addD(t,-180);
  let xp=0,best=0,cur=0,nT=0,okDays=0,stepsOk=0,perf=0,rec=0,hab=0,ali=0,wkOk=0;const wk={};
  const fbD={g_cardio:new Set(),g_calm:new Set()};Object.keys(S.fb||{}).forEach(k=>{const q=k.split('|');if(fbD[q[2]])fbD[q[2]].add(q[0]);});Object.keys(S.cardio||{}).forEach(k=>{const c=S.cardio[k];if(c&&c.done)fbD.g_cardio.add(k.split('|')[0]);});
  let sF=0,bF=0,sC=0,bC=0,sR=0,bR=0,sH=0,bH=0,sA=0,bA=0;
  for(let d=from;d<=t;d=addD(d,1)){
    const pr=dayProgress(d),tr=trained(d),dd=ctxFor(d).d,hasD=!!dd;
    if(tr)nT++;
    xp+=Math.round(pr*20)+(tr?10:0);
    if(pr>=0.5){cur++;okDays++;best=Math.max(best,cur);}else if(d!==t&&hasD){cur=0;}
    if((S.steps[d]||0)>=S.stepGoal)stepsOk++;
    if(pr>=0.999)perf++;
    const c=withDate(d,()=>({r:tcount('recovery'),h:tcount('habitos'),a:tcount('alim')}));
    if(c.r.total&&c.r.done>=c.r.total)rec++;if(c.h.total&&c.h.done>=c.h.total)hab++;if(c.a.total&&c.a.done>=c.a.total)ali++;
    /* rachas por categoría: los días de descanso no rompen la racha */
    if(tr){sF++;bF=Math.max(bF,sF);}else if(d!==t&&hasD)sF=0;
    const hasC=!!(dd&&dd.blocks&&dd.blocks.some(b=>b.cardio));
    if(fbD.g_cardio.has(d)){sC++;bC=Math.max(bC,sC);}else if(d!==t&&hasC)sC=0;
    if(c.r.total){if(c.r.done>=c.r.total){sR++;bR=Math.max(bR,sR);}else if(d!==t)sR=0;}
    if(c.h.total){if(c.h.done>=c.h.total){sH++;bH=Math.max(bH,sH);}else if(d!==t)sH=0;}
    if(c.a.total){if(c.a.done>=c.a.total){sA++;bA=Math.max(bA,sA);}else if(d!==t)sA=0;}
    const wm=monOf(d);wk[wm]=wk[wm]||{s:0,t:0};if(hasD){wk[wm].s++;if(tr)wk[wm].t++;}
  }
  Object.values(wk).forEach(w=>{if(w.s>0&&w.t>=w.s)wkOk++;});
  let ten=0;try{const s0=fidSince();if(s0){const a=pd(s0),b=pd(t);ten=Math.max(0,Math.floor((b-a)/864e5));}}catch(e){}
  const mon=monOf(t);let wp=0,wt=0;
  for(let i=0;i<7;i++){const d=addD(mon,i);if(ctxFor(d).d){wp++;if(d<=t&&trained(d))wt++;}}
  const nC=fbD.g_cardio.size,nQ=fbD.g_calm.size,nK=(typeof CHK!=='undefined'&&CHK.done)?CHK.done.size:0;
  const EX={sF,bF,sC,bC,sR,bR,sH,bH,sA,bA,nC,nQ,nK};
  const g0=Object.assign({xp,best,nT,okDays,stepsOk,perf,rec,hab,ali,wkOk,ten},EX);
  let bonus=0;try{milestones(g0).forEach(m=>{if(m.v>=m.n)bonus+=m.p||0;});}catch(e){}
  const base=xp;xp+=bonus;
  let li=0;LEVELS.forEach((l,i)=>{if(xp>=l[0])li=i;});
  const nx=LEVELS[li+1]||null;
  return Object.assign({xp,base,bonus,li,name:LEVELS[li][1],nx,streak:cur,best,nT,okDays,stepsOk,wp,wt,perf,rec,hab,ali,wkOk,ten},EX);
};
const st=document.createElement('style');st.textContent=`.mspts{display:inline-block;margin:8px 0 2px;background:color-mix(in srgb,#1F8F53 16%,var(--card,#fff));color:#1F8F53;font:700 15px Archivo,sans-serif;border-radius:99px;padding:5px 14px}`;
document.head.appendChild(st);
})();


/* ---------- Congelar mesociclo con acceso vencido + bloques/niveles Basic (22 nov) ---------- */
(function(){
const lvNorm=l=>['Principiante','Intermedio','Avanzado'].includes(l)?l:'Principiante';
window.basicExpBlock=function(){try{const P=(PERIOD.basic&&PERIOD.basic.weeks)||5;if(!S.start)return 1;const raw=Math.floor(diffD(monOf(today()),S.start)/7)+1;if(raw<1)return 1;return (Math.floor((raw-1)/P)%3)+1;}catch(e){return 1;}};
/* 1) Si el acceso estuvo vencido, la semana del mesociclo no avanza: se corre el inicio en semanas completas */
function frzCheck(){try{
  if(!ME||!ACC||!ACC.row||!ACC.row.paid_until||!S.start)return;
  const K='erre_pu_'+ME.id,cur=ACC.row.paid_until,prev=localStorage.getItem(K);
  if(ACC.state==='expired'){return;}
  if(prev&&cur&&new Date(cur)>new Date(prev)){
    const expiry=new Date(prev).getTime()+GRACE_D*86400000,now=Date.now();
    if(now>expiry){const lapse=Math.round((now-expiry)/86400000),wks=Math.round(lapse/7);
      if(wks>=1){S.start=addD(S.start,7*wks);S.frzLog=(S.frzLog||[]).concat([{at:today(),days:lapse,wks}]).slice(-6);save();
        setTimeout(()=>{try{toast('Tu programa estuvo en pausa '+lapse+' días: retomas en la misma semana');}catch(e){}},900);}}}
  localStorage.setItem(K,cur);
}catch(e){console.warn('frz',e);}}
window.__frzCheck=frzCheck;
/* 2) Basic: al cumplirse 5 semanas pasa solo al siguiente bloque; si el coach cambia el nivel, se cambia la plantilla */
async function basicBlockSync(){try{
  if(S.program!=='basic'||!S.user||!S.assigned||!DB.assignBasic||!S.start||ACC.state==='expired')return;
  const eb=basicExpBlock(),lvl=lvNorm((PROFILE&&PROFILE.level)||S.user.level),a=S.assigned,cb=a.block||1,cl=lvNorm(a.level_used);
  if(cb===eb&&cl===lvl)return;
  const tag=today()+'|'+eb+'|'+lvl;if(S.bbTry===tag)return;S.bbTry=tag;
  const focus=(S.user.data&&S.user.data.focus)||FOCD(S.user.sex);
  const r=await DB.assignBasic(focus,S.user.days||4,lvl,eb);
  S.assigned=r;S.swaps={};await loadClientRoutine(ME.id);save();try{render();}catch(e){}
  setTimeout(()=>{try{toast(cl!==lvl?'Subiste a nivel '+lvl:'Empieza tu bloque '+eb+': ejercicios nuevos, misma progresión');}catch(e){}},900);
}catch(e){console.warn('bbSync',e);}}
window.__bbs=basicBlockSync;const sc0=startClient;startClient=async function(){const r=await sc0.apply(this,arguments);frzCheck();await basicBlockSync();return r;};
})();

/* ---------- MODO EMBARAZO (22 nov) ---------- */
(function(){
const pg=()=>{const u=S.user||{};return (u.preg&&u.preg.on)?u.preg:null;};
const pgWeek=()=>{const p=pg();if(!p)return 0;const d=Math.floor((new Date(today())-new Date(p.at))/864e5);return Math.min(42,Math.max(1,(+p.w0||1)+Math.floor(d/7)));};
const pgTri=w=>w<=13?1:w<=27?2:3;
window.pgChip=function(d){try{const pr=((d.data||{}).user||{}).preg;if(!pr||!pr.on)return '';const w=Math.min(42,(+pr.w0||1)+Math.floor((new Date(today())-new Date(pr.at))/864e5/7));return `<span class="${pr.ok?'':'red'}" style="background:#F6E4EE;border-color:#C77DA3">🤰 Embarazo · sem ${w} · T${w<=13?1:w<=27?2:3}${pr.ok?'':' · sin autorización médica'}</span>`;}catch(e){return '';}};
window.pregOn=()=>!!pg();
window.pregInfo=()=>{const p=pg();if(!p)return null;const w=pgWeek();return {w,t:pgTri(w),ok:!!p.ok};};
const CORE_OK=new Set(['h_plancha_lateral_en_rodillas_estabilida','h_abduccion_de_cadera_en_plancha_de_rodi']);
const SUP=new Set(['press_plano_barra','l_press_plano_con_mancuernas','h_press_plano_agarre_cerrado','h_press_plano_en_maquina_de_polea','l_press_horizontal_en_maquina_x']);
const FLOORBR=new Set(['h_puente_de_gluteos_con_peso','l_puente_de_gluteos','h_puente_de_gluteos_unilateral_con_peso','h_puente_a_una_pierna_sin_peso','h_hip_thrust_sin_peso','h_puente_de_gluteos_abduccion_de_cadera','h_puente_de_gluteos_puente_de_cadera','h_hip_thrust_unilateral_con_peso']);
const PRONE=new Set(['h_curl_isquios_en_maquina_acostado']);
const HEAVY={remo_barra:'h_remo_en_maquina_polea_pecho_apoyado',h_sentadilla_libre:'h_sentadilla_goblet_con_mancuerna',l_dominadas:'jalon',h_dominadas_agarre_prono:'jalon',h_dominadas_agarre_supino:'jalon',h_dominadas_agarre_neutro:'jalon',h_dominadas_lastradas_agarre_neutro:'jalon',h_dominadas_lastradas_agarre_prono:'jalon',h_dominadas_lastradas_agarre_supino:'jalon',fondos:'l_fondos_en_maquina',h_fondos_en_paralelas_lastrados:'l_fondos_en_maquina',press_plano_barra:'press_inc_maq',h_press_plano_agarre_cerrado:'press_inc_maq',h_press_inclinado_con_barra:'press_inc_maq',press_milit:'h_press_militar_con_mancuernas_sentado',l_flexiones_con_peso:'flexiones',h_flexiones_en_diamante:'flexiones',h_flexiones_en_pica:'h_press_militar_con_mancuernas_sentado'};
const BAL={h_sentadilla_bulgara_con_mancuernas:'h_prensa_de_piernas_horizontal',h_sentadilla_bulgara_sin_peso:'h_prensa_de_piernas_horizontal',h_peso_muerto_rumano_a_una_pierna:'h_peso_muerto_rumano_smith',h_zancada_smith:'h_prensa_de_piernas_horizontal',h_step_up_smith:'h_prensa_de_piernas_horizontal'};
window.pregSafe=function(ex,it){
  try{const p=pg();if(!p||!ex)return ex;const w=pgWeek(),e=E[ex]||{};
    if(e.g==='Core'||e.pat==='Core'){return CORE_OK.has(ex)?ex:'h_plancha_lateral_en_rodillas_estabilida';}
    if(HEAVY[ex])return HEAVY[ex];
    if(w>=16&&SUP.has(ex))return 'press_inc_maq';
    if(w>=16&&FLOORBR.has(ex))return 'h_patada_de_gluteos_trasera_en_polea';
    if(w>=14&&PRONE.has(ex))return 'h_curl_isquios_en_maquina_sentado';
    if(w>=20&&BAL[ex])return BAL[ex];
    return ex;}catch(x){return ex;}};
/* cardio: nunca intenso; en el 3.er trimestre solo suave */
const cx0=cxTier;cxTier=function(t){let r=cx0.apply(this,arguments);const i=pregInfo();if(!i||!r)return r;if(r==='Intenso')r='Moderado';if(i.t===3&&r==='Moderado')r='Base';return r;};
/* alimentación: sin déficit; calorías extra por trimestre; más agua */
const at0=alTargets;alTargets=function(raw){
  const i=pregInfo();if(!i||(!raw&&alP&&alP().tg))return at0.apply(this,arguments);
  const g0=S.goal;if(g0==='bajar')S.goal='complete';let T;try{T=at0.apply(this,arguments);}finally{S.goal=g0;}
  const add=[0,0,340,450][i.t];return Object.assign({},T,{kc:T.kc+add,C:T.C+Math.round(add/4),water:T.water+250});};
/* textos */
const TRI={1:'Primer trimestre',2:'Segundo trimestre',3:'Tercer trimestre'};
const TIP={1:'Cansancio y náuseas son normales: baja la carga, no la constancia. Más proteína y comidas pequeñas y frecuentes.',2:'Suele ser la etapa con más energía. Evita acostarte boca arriba por periodos largos y cuida la postura.',3:'Prioriza movilidad, piernas, espalda alta y respiración. Baja el volumen y escucha tu cuerpo cada día.'};
const STOP=['Sangrado vaginal o pérdida de líquido','Dolor de cabeza fuerte, visión borrosa o mareo','Dolor en el pecho o dificultad para respirar antes de hacer esfuerzo','Dolor o hinchazón en una pantorrilla','Contracciones regulares o dolor en el abdomen o la pelvis','Menos movimientos del bebé de lo normal'];
const AVOID=['Carne, pollo o huevo crudos o poco cocidos','Pescados altos en mercurio (pez espada, tiburón, caballa rey)','Lácteos y quesos sin pasteurizar','Embutidos fríos sin calentar bien','Alcohol','Más de 200 mg de cafeína al día (≈ 1–2 tintos)'];
const stopHtml=()=>`<details class="pgd"><summary>Señales para parar y llamar al médico</summary><ul>${STOP.map(x=>`<li>${x}</li>`).join('')}</ul></details>`;
const guide=()=>`<ul class="pgl"><li><b>Esfuerzo 5–6 de 10</b> (moderado, tipo RPE): siempre puedes hablar frases completas.</li><li>Calienta bien y respira: <b>sin aguantar el aire</b> al empujar.</li><li>Nada de saltos fuertes, golpes ni deportes de contacto. Evita el calor extremo y toma agua.</li><li>Cambia de postura despacio. Si algo molesta, para y avísale a tu coach.</li></ul>`;
function card(){const i=pregInfo();if(!i)return '';
  const ex=S.exp['pg.card'];
  return `<section class="pgc"><button class="pgh" data-act="pgx"><i>🤰</i><span><b>Tu embarazo · semana ${i.w}</b><small>${TRI[i.t]} · entrenamiento adaptado</small></span><em>${ex?'▴':'▾'}</em></button>
  ${i.ok?'':`<div class="pgw">Antes de seguir entrenando, confirma con tu médico/a que puedes hacerlo. Puedes marcarlo en Perfil → Embarazo.</div>`}
  ${ex?`<p class="pgt">${TIP[i.t]}</p>${guide()}<div class="pgn">Cambiamos algunos ejercicios por opciones más seguras (abdomen clásico, barra pesada, boca arriba después de la semana 16…). Suelo pélvico y respiración: ve a Respiración y haz «Dormir» o «Diafragmática».</div>${stopHtml()}`:''}</section>`;}
function nutCard(){const i=pregInfo();if(!i)return '';const add=[0,0,340,450][i.t];
  return `<section class="pgc"><div class="pgh" style="cursor:default"><i>🥗</i><span><b>Alimentación en embarazo</b><small>Sin déficit${add?' · +'+add+' kcal por trimestre':''}</small></span></div><p class="pgt">Tu plan no busca bajar de peso: busca nutrirte a ti y al bebé. Más proteína, hierro, calcio y agua.</p><details class="pgd"><summary>Alimentos a evitar</summary><ul>${AVOID.map(x=>`<li>${x}</li>`).join('')}</ul></details><div class="pgn">Consulta con tu médico/a suplementos (ácido fólico, hierro, vitamina D).</div></section>`;}
const hv=homeView;homeView=function(){const h=hv.apply(this,arguments);const c=card();return c?c+h:h;};
const pv=pillarView;pillarView=function(p){const h=pv.apply(this,arguments);if(p==='alim'){const c=nutCard();return c?c+h:h;}return h;};
/* ajustes */
function sec(){const u=S.user||{};if(u.sex==='Hombre')return '';const p=u.preg||{},on=!!p.on,w=on?pgWeek():null;
  return `<details class="sec acc" data-pk="Embarazo"${(S.pfOpen||{})['Embarazo']?' open':''}><summary><span>Embarazo<small>Entrenamiento adaptado y seguro</small></span></summary><div class="accbody">
  <p class="hint" style="margin-top:10px">Si estás embarazada, adaptamos tu entrenamiento, el cardio y la alimentación. No reemplaza a tu médico/a.</p>
  <button class="pcard sm${on?' on':''}" data-act="pgtoggle"><b>${on?'Estoy embarazada · semana '+w:'Estoy embarazada'}</b><small>${on?'Toca para desactivar':'Activa el modo embarazo'}</small></button>
  ${on?`<label class="pfl">Semanas de embarazo hoy</label><input class="pgin" id="pgw" type="number" inputmode="numeric" min="1" max="42" value="${w}"><button class="btn" data-act="pgweek" style="width:100%;margin-top:8px">Guardar semanas</button>
  <label class="pgck"><input type="checkbox" data-act="pgok" ${p.ok?'checked':''}> Mi médico/a me autorizó a hacer ejercicio</label>`:''}</div></details>`;}
const pf0=profileView;profileView=function(){let h=pf0.apply(this,arguments);const s=sec();if(s){const k='<details class="sec acc" data-pk="Entrenamiento"';h=h.includes(k)?h.replace(k,s+k):h;}return h;};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act^="pg"]');if(!t)return;const a=t.dataset.act;if(!['pgx','pgtoggle','pgweek','pgok'].includes(a))return;e.stopPropagation();
  S.user=S.user||{};const u=S.user;
  if(a==='pgx'){S.exp['pg.card']=!S.exp['pg.card'];save();render();return;}
  if(a==='pgtoggle'){if(u.preg&&u.preg.on){sheet(`<h3>¿Desactivar el modo embarazo?</h3><div class="sub">Tu programa vuelve a los ejercicios originales. Si acabas de dar a luz, espera la autorización de tu médico/a y habla con tu coach antes de retomar.</div><button class="btn solid" data-act="pgoff" style="width:100%;margin-top:10px">Sí, desactivar</button><button class="btn" data-act="close" style="width:100%;margin-top:8px">Cancelar</button>`);return;}
    u.preg={on:true,w0:12,at:today(),ok:false};save();render();toast('Modo embarazo activado. Indica tus semanas.');return;}
  if(a==='pgweek'){const v=parseInt((document.getElementById('pgw')||{}).value,10);if(!(v>=1&&v<=42)){toast('Escribe un número entre 1 y 42');return;}u.preg=Object.assign({},u.preg,{w0:v,at:today()});save();render();toast('Semanas guardadas');return;}
  if(a==='pgok'){u.preg=Object.assign({},u.preg,{ok:!!t.checked});save();render();return;}
},true);
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pgoff"]');if(!t)return;e.stopPropagation();const u=S.user||{};u.preg=Object.assign({},u.preg,{on:false,endedAt:today()});save();try{closeSheet&&closeSheet();}catch(x){}render();toast('Modo embarazo desactivado');},true);
const st=document.createElement('style');st.textContent=`.pgc{background:color-mix(in srgb,#C77DA3 12%,var(--card,#fff));border:1.5px solid color-mix(in srgb,#C77DA3 45%,var(--line,#ddd));border-radius:16px;padding:12px;margin:10px 0}
.pgh{display:flex;align-items:center;gap:10px;width:100%;background:none;border:0;text-align:left;padding:0;color:inherit;font:inherit}.pgh i{font-style:normal;font-size:24px}.pgh span{flex:1}.pgh b{display:block;font:700 15px Archivo,sans-serif}.pgh small{color:var(--gray,#5A554E);font-size:12.5px}.pgh em{font-style:normal;color:var(--gray)}
.pgw{margin-top:8px;background:#FFF3D6;color:#7A5200;border-radius:10px;padding:8px 10px;font-size:13px}.pgt{margin:10px 0 6px;font-size:13.5px}.pgl{margin:6px 0 8px;padding-left:18px;font-size:13px}.pgl li{margin:3px 0}.pgn{font-size:12.5px;color:var(--gray,#5A554E);margin:8px 0}
.pgd{margin-top:6px;font-size:13px}.pgd summary{font-weight:700;cursor:pointer}.pgd ul{margin:6px 0 0;padding-left:18px}.pgin{width:100%;box-sizing:border-box;padding:12px;border-radius:12px;border:1.5px solid var(--line,#ddd);font:600 16px Archivo,sans-serif;background:var(--card,#fff);color:inherit}.pgck{display:flex;gap:8px;align-items:center;margin-top:12px;font-size:14px}`;
document.head.appendChild(st);
})();

/* ---------- CARDIO VISUAL: pictograma animado, selector con iconos y videos guiados (22 nov) ---------- */
(function(){
const P=(extra)=>`<g class="cvp-fig"><circle cx="58" cy="20" r="6.5"/><path d="M58 28 L56 50"/>${extra}</g>`;
const LEGS=`<g class="cvl1"><path d="M56 50 L46 68"/></g><g class="cvl2"><path d="M56 50 L66 66"/></g>`;
const ARMS=`<g class="cva1"><path d="M58 33 L46 43"/></g><g class="cva2"><path d="M58 33 L70 42"/></g>`;
const ICON={
 tread:P(ARMS+LEGS)+`<path d="M14 76 H92"/><path class="cvbelt" d="M14 83 H92"/><path d="M96 78 V32 L108 32"/>`,
 walk:P(ARMS+LEGS)+`<path d="M12 78 H106"/><circle cx="100" cy="16" r="7" class="cvsun"/><path d="M86 62 l8 -14 l8 14 z" opacity=".5"/>`,
 bike:`<circle cx="30" cy="62" r="15"/><circle cx="92" cy="62" r="15"/><g class="cvw"><path d="M30 47 V77 M15 62 H45" /></g><g class="cvw2"><path d="M92 47 V77 M77 62 H107"/></g><path d="M30 62 L52 38 H80 L92 62 M52 38 L58 62 H30 M80 38 L76 30 H88"/><circle cx="62" cy="16" r="6"/><path d="M60 24 L54 36 M56 30 L76 32"/><g class="cvl1"><path d="M54 36 L62 52 L58 62"/></g>`,
 ellip:P(`<g class="cva1"><path d="M58 33 L76 38 L82 24"/></g><g class="cva2"><path d="M58 33 L40 38 L34 24"/></g><g class="cvl1"><path d="M56 50 L48 70"/></g><g class="cvl2"><path d="M56 50 L68 68"/></g>`)+`<path d="M30 74 H88 L96 56 V28"/>`,
 stair:P(ARMS+`<g class="cvl1"><path d="M56 50 L46 60 L52 70"/></g><g class="cvl2"><path d="M56 50 L68 58 L68 70"/></g>`)+`<path d="M14 82 H40 V74 H62 V66 H84 V58 H106"/>`,
 row:`<circle cx="46" cy="30" r="6.5"/><path d="M46 38 L62 58 L36 58"/><g class="cvoar"><path d="M60 46 L84 54 M84 50 V60"/></g><path d="M18 72 H100"/><path d="M30 64 H70" opacity=".5"/>`,
 swim:`<circle cx="76" cy="30" r="6.5"/><g class="cvsw"><path d="M70 34 Q52 22 36 38 M66 38 L28 48"/></g><path class="cvwave" d="M8 56 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0"/><path class="cvwave2" d="M8 68 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0"/>`,
 class:P(`<g class="cva1"><path d="M58 33 L44 18"/></g><g class="cva2"><path d="M58 33 L72 18"/></g><g class="cvl1"><path d="M56 50 L44 70"/></g><g class="cvl2"><path d="M56 50 L70 70"/></g>`)+`<path d="M20 24 l3 6 l-6 -2 z M98 30 l3 6 l-6 -2 z" opacity=".6"/>`
};
const MAP={camin_aire:'walk',camin_cam:'tread',bici_est:'bike',bici:'bike',trot_cam:'tread',trot_aire:'walk',eliptica:'ellip',escaladora:'stair',remo:'row',natacion:'swim',senderismo:'walk',clase:'class',hyrox:'row'};
const icon=(id,cls)=>`<svg class="cvsvg ${cls||''}" viewBox="0 0 120 90" fill="none" stroke="currentColor" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[MAP[id]||'tread']}</svg>`;
const TALK={1:'Podrías cantar',2:'Hablas fluido',3:'Frases cortas',4:'Palabras sueltas',5:'No puedes hablar'};
function vids(t){
  const pg=typeof pregOn==='function'&&pregOn(),out=[];
  Object.keys(E).forEach(k=>{const e=E[k];if(!e||e.g!=='Cardio'||!e.yt)return;const m=/^NIVEL (\d)/i.exec(e.n||'');if(!m)return;const lv=+m[1],mn=+((/\((\d+) ?min\)/.exec(e.n)||[])[1]||0);
    const ok=t==='Moderado'?(lv>=2&&lv<=3):(lv<=1);if(!ok)return;if(pg&&!(lv<=1&&/sin (impacto|saltos)/i.test(e.n)))return;
    const nm=e.n.replace(/^NIVEL \d\s*\|\s*/i,'').replace(/\|[^|]*(CASA|RESET)[^|]*/gi,'').replace(/\(\d+ ?min\)/i,'').replace(/\s+/g,' ').trim();
    out.push({k,nm,mn,lv});});
  out.sort((a,b)=>(a.mn||99)-(b.mn||99));return out.slice(0,6);}
function wrapC(h,d){
  try{const wk=Math.min(S.week,PERIOD[S.program].weeks),t=cxTier(cTier(d,wk)),c=S.cardio[cKey(d)]||{},mod=c.mod||d.cardioDefault||'camin_cam',m=CMODS[mod]||CMODS.camin_cam,z=t?TIERZONE[t]:2,Z=ZONES[z-1];
    const hero=`<div class="cvh" style="--zc:${ZC[z]}"><div class="cvi">${icon(mod)}</div><div class="cvx"><small>${t?'Hoy haces':'Movimiento suave'}</small><b>${m.n}</b><span>${t?cDur(d,t):'15–35 min'} · ${Z.s}</span><em>🗣 ${TALK[z]}</em></div><svg class="cvecg" viewBox="0 0 240 24" preserveAspectRatio="none"><path d="M0 12 H60 l6 -9 l8 20 l8 -16 l6 5 H130 l6 -9 l8 20 l8 -16 l6 5 H240"/></svg></div>`;
    const pick=`<div class="cvpl">¿Qué vas a hacer hoy?</div><div class="cvpk">${Object.keys(CMODS).filter(id=>!['trot_aire','bici','senderismo'].includes(id)).map(id=>`<button class="cvpb${id===mod?' on':''}" data-act="cmod" data-v="${id}" style="--zc:${ZC[z]}">${icon(id,'sm')}<span>${({camin_aire:'Caminar afuera',camin_cam:'Caminadora',bici_est:'Bici estática',trot_cam:'Trotar',eliptica:'Elíptica',escaladora:'Escaladora',remo:'Remo',natacion:'Natación',clase:'Clase grupal',hyrox:'Hyrox'})[id]||CMODS[id].n}</span></button>`).join('')}</div>`;
    const V=(t&&t!=='Intenso')?vids(t):[];
    const vid=V.length?`<div class="cvpl">Cardio guiado en video <small>(en casa, sin equipo)</small></div><div class="cvv">${V.map(v=>`<button class="cvvb" data-cvv="${v.k}">${typeof thumb==='function'?thumb(v.k):''}<span><b>${esc(v.nm)}</b><small>${v.mn?v.mn+' min · ':''}${v.lv<=1?'Sin impacto':'Moderado'}</small></span></button>`).join('')}</div>`:'';
    h=h.replace('</em></div></div>','</em></div></div>'+hero+cNoteHTML(d));
    h=h.includes('<button class="cdet"')?h.replace('<button class="cdet"',pick+vid+'<button class="cdet"'):h;
  }catch(e){console.warn('cardio vis',e);}
  return h;}
const cw0=cardioWrap;cardioWrap=function(h,d){return wrapC(cw0.apply(this,arguments),d);};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-cvv]');if(!t)return;e.stopPropagation();const x=E[t.dataset.cvv];if(!x||!x.yt)return;
  sheet(`<h3 style="font-size:16px">${esc(x.n.replace(/\|[^|]*(CASA|RESET)[^|]*/gi,''))}</h3><div class="video" style="padding:0;overflow:hidden;position:relative"><iframe src="https://www.youtube.com/embed/${x.yt}?rel=0&playsinline=1" style="position:absolute;inset:0;width:100%;height:100%;border:0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" title="${esc(x.n)}"></iframe></div><div class="note" style="margin-top:10px">Mantén un ritmo en el que puedas hablar. Si algo molesta, para.</div><button class="btn" data-act="close" style="width:100%;margin-top:8px">Cerrar</button>`);},true);
window.__cv={icon,TALK};
const st=document.createElement('style');st.textContent=`
.cvh{position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;margin:10px 0;padding:12px;border-radius:18px;background:color-mix(in srgb,var(--zc) 14%,var(--card,#fff));border:1.5px solid color-mix(in srgb,var(--zc) 45%,var(--line,#ddd))}
.cvi{flex:0 0 112px;color:var(--zc)}.cvsvg{width:100%;height:auto;display:block}.cvsvg.sm{width:56px}
.cvx{position:relative;z-index:1;display:flex;flex-direction:column;gap:2px;min-width:0}.cvx small{font-size:11.5px;color:var(--gray,#5A554E);text-transform:uppercase;letter-spacing:.06em}.cvx b{font:700 18px/1.15 Oswald,Archivo,sans-serif;text-transform:uppercase}.cvx span{font-size:13px}.cvx em{font-style:normal;font-size:13px;font-weight:600;color:var(--zc)}
.cvecg{position:absolute;left:0;right:0;bottom:2px;height:20px;width:100%;opacity:.35}.cvecg path{fill:none;stroke:var(--zc);stroke-width:2;stroke-dasharray:480;stroke-dashoffset:480;animation:cvecg 2.6s linear infinite}
@keyframes cvecg{to{stroke-dashoffset:0}}
.cvpl{margin:14px 0 6px;font:700 13px Archivo,sans-serif;text-transform:uppercase;letter-spacing:.05em;color:var(--gray,#5A554E)}.cvpl small{text-transform:none;letter-spacing:0;font-weight:500}
.cvpk{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 8px;scrollbar-width:none}.cvpk::-webkit-scrollbar{display:none}
.cvpb{flex:0 0 84px;display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:14px;border:1.5px solid var(--line,#ddd);background:var(--card,#fff);color:var(--gray,#5A554E);font:600 11.5px/1.15 Archivo,sans-serif;text-align:center}
.cvpb.on{border-color:var(--zc);background:color-mix(in srgb,var(--zc) 14%,var(--card,#fff));color:var(--ink,#1C1B19)}.cvpb.on .cvsvg{color:var(--zc)}
.cvv{display:flex;flex-direction:column;gap:8px}.cvvb{display:flex;align-items:center;gap:10px;padding:8px;border-radius:14px;border:1.5px solid var(--line,#ddd);background:var(--card,#fff);text-align:left;color:inherit;font:inherit}
.cvvb .thm{width:72px;height:48px;flex:0 0 72px}.cvvb span{display:flex;flex-direction:column;min-width:0}.cvvb b{font:600 13.5px/1.2 Archivo,sans-serif}.cvvb small{color:var(--gray,#5A554E);font-size:12px}
.cvl1,.cvl2,.cva1,.cva2{transform-box:fill-box;transform-origin:50% 0}.cvl1{animation:cvsw 1s ease-in-out infinite alternate}.cvl2{animation:cvsw 1s ease-in-out infinite alternate-reverse}.cva1{animation:cvsw 1s ease-in-out infinite alternate-reverse}.cva2{animation:cvsw 1s ease-in-out infinite alternate}
@keyframes cvsw{from{transform:rotate(-16deg)}to{transform:rotate(16deg)}}
.cvbelt{stroke-dasharray:6 8;animation:cvbelt .5s linear infinite}@keyframes cvbelt{to{stroke-dashoffset:-14}}
.cvw,.cvw2{transform-box:fill-box;transform-origin:center;animation:cvspin 1.2s linear infinite}@keyframes cvspin{to{transform:rotate(360deg)}}
.cvoar{animation:cvoar 1.6s ease-in-out infinite alternate}@keyframes cvoar{from{transform:translateX(-10px)}to{transform:translateX(6px)}}
.cvwave{animation:cvwv 1.6s linear infinite}.cvwave2{animation:cvwv 2.2s linear infinite reverse;opacity:.6}@keyframes cvwv{from{transform:translateX(0)}to{transform:translateX(-20px)}}
.cvsw{animation:cvoar 1.2s ease-in-out infinite alternate}.cvsun{animation:cvpls 2s ease-in-out infinite alternate;transform-box:fill-box;transform-origin:center}@keyframes cvpls{to{transform:scale(1.18)}}
@media (prefers-reduced-motion:reduce){.cvh *,.cvpb *{animation:none!important}}`;
document.head.appendChild(st);
})();

(function(){const os=obSubmit;obSubmit=function(){const f=(S.ob&&S.ob.form)||{};const r=os.apply(this,arguments);
  try{if(r!==false&&S.user&&f.sex==='Mujer'&&f.preg==='Sí'){const w=Math.min(42,Math.max(1,parseInt(f.pregW,10)||12));S.user.preg={on:true,w0:w,at:today(),ok:f.pregOk==='Sí'};save();}}catch(e){}
  return r;};})();

/* ---------- REGISTRO SIN FRICCIÓN: ojito, formulario antes de «pendiente», COP/USD, wizard más grande ---------- */
(function(){
  const st=document.createElement('style');st.textContent=`.pweye{position:relative}.pweye .fld{padding-right:52px;width:100%;box-sizing:border-box}.eyeb{position:absolute;right:4px;top:50%;transform:translateY(-50%);background:none;border:0;font-size:21px;padding:10px;line-height:1;opacity:.75}.eyeb.on{opacity:1}
.cursw{display:flex;gap:6px;margin:8px 0 10px}.cursw button{flex:1;border:2px solid #DCD6CC;background:#FBFAF8;border-radius:99px;padding:9px;font:700 14px Archivo,sans-serif;color:#1C1B19}.cursw button.on{background:#1C1B19;border-color:#1C1B19;color:#fff}.cursw small{display:block;font:500 11px Archivo,sans-serif;color:#5A554E;text-align:center;margin-top:-4px}
#app:has(.wzq) .wzq{font-size:28px;line-height:1.15;margin:8px 0 8px}#app:has(.wzq) .wzs{font-size:16px;line-height:1.4}#app:has(.wzq) .fld,#app:has(.wzq) select.fld{font-size:18px;padding:16px 14px;min-height:54px}#app:has(.wzq) .chip{font-size:17px;padding:14px 20px;min-height:50px}#app:has(.wzq) .pcard b{font-size:18px}#app:has(.wzq) .pcard small{font-size:14px}#app:has(.wzq) .wzn .btn{font-size:18px;padding:18px}#app:has(.wzq) .pfl,#app:has(.wzq) label{font-size:15px}`;
  document.head.appendChild(st);
  /* ojito: muestra/oculta todas las contraseñas de la pantalla */
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="lgeye"]');if(!t)return;e.stopPropagation();e.preventDefault();
    const ins=[...document.querySelectorAll('.pweye input')],show=ins.length&&ins[0].type==='password';ins.forEach(i=>i.type=show?'text':'password');document.querySelectorAll('.eyeb').forEach(b=>b.classList.toggle('on',show));},true);
  /* pendiente con formulario ya lleno: pantalla «registro listo» (sigue logueado) */
  const r0=render;render=function(){try{if(typeof PROFILE!=='undefined'&&PROFILE&&PROFILE.role==='client'&&false){}}catch(e){}return r0.apply(this,arguments);};
  const os=obSubmit;obSubmit=function(){const r=os.apply(this,arguments);try{if(r!==false&&S.user&&PROFILE&&PROFILE.status==='pending'){S.user.pendReg=true;save();}}catch(e){}return r;};
  /* al activarse: arma su programa Basic (la base lo exige activo) */
  const sc=startClient;startClient=async function(){const r=await sc.apply(this,arguments);
    try{if(PROFILE&&PROFILE.status==='active'&&S.user&&S.user.pendReg&&S.program==='basic'&&DB.assignBasic){
      const f=(S.user.data&&S.user.data.focus)||FOCD(S.user.sex);
      try{S.assigned=await DB.assignBasic(f,S.user.days||4,S.user.level||'Principiante');await loadClientRoutine(ME.id);}catch(e){console.warn('assignAfterActive',e);}
      delete S.user.pendReg;save();try{render();}catch(e){}}}catch(e){console.warn(e);}
    return r;};
  /* precios COP / USD (tasa fija) */
  const RATE=4000;
  const curOn=()=>{try{return localStorage.getItem('erre_cur')==='COP';}catch(e){return false;}};
  const fmt=n=>'$'+(Math.round(n*RATE/1000)*1000).toLocaleString('es-CO');
  const conv=h=>curOn()?h.replace(/\$([\d.,]+)(<em>)?( USD)?/g,(m,num,em,usd)=>{const n=num.indexOf(',')>=0?parseFloat(num.replace(/\./g,'').replace(',','.')):parseFloat(num.replace(/\./g,''));return isFinite(n)?fmt(n)+(em||'')+(usd?' COP':''):m;}):h;
  const sw=()=>`<div class="cursw"><button data-act="curset" data-v="USD" class="${curOn()?'':'on'}">USD · dólares</button><button data-act="curset" data-v="COP" class="${curOn()?'on':''}">COP · pesos</button></div>${curOn()?'<small>Valor aproximado en pesos. El cobro en la pasarela es en dólares.</small>':''}`;
  const pp=plansPublic;plansPublic=function(){let h=pp.apply(this,arguments);h=h.replace('<div class="sub2">Mira qué incluye cada plan.</div>','<div class="sub2">Mira qué incluye cada plan.</div>'+sw());return conv(h);};
  if(typeof plansView==='function'){const pv=plansView;plansView=function(){let h=pv.apply(this,arguments);return typeof h==='string'?conv(sw()+h):h;};}
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="curset"]');if(!t)return;e.stopPropagation();e.preventDefault();
    try{localStorage.setItem('erre_cur',t.dataset.v);}catch(x){}
    const y=window.scrollY;try{if(typeof ME!=='undefined'&&ME&&PROFILE&&PROFILE.role==='client')render();else showLogin();}catch(x){}window.scrollTo(0,y);},true);
})();

/* ---------- PANEL COACH · INICIO: cumpleaños, planes por vencer/cobrar, chats por responder, actividad ---------- */
(function(){
  const h1=cpHomeData;cpHomeData=function(){const r=h1.apply(this,arguments);try{
    if(!CP.acc&&!CP._accL){CP._accL=1;DB.accessAll().then(x=>{CP.acc=x;CP._accL=0;try{coachRender(true);}catch(e){}}).catch(()=>{CP.acc=[];CP._accL=0;});}
    const nm=r.nm,dis=cpDisGet(),tdy=today(),al=r.al.slice(),hid=(r.hid||[]).slice();let nh=r.nh;
    const add=A=>{if(dis[A.k]){nh++;hid.push(A);}else al.push(A);};
    const act=(CP.clients||[]).filter(c=>c.status==='active');
    act.forEach(c=>{if(!c.birth_date)return;const bd=String(c.birth_date).slice(5),y0=+tdy.slice(0,4);let nx=(y0)+'-'+bd;if(nx<tdy)nx=(y0+1)+'-'+bd;const n=diffD(nx,tdy);
      if(n>=0&&n<=7){const age=+nx.slice(0,4)-(+String(c.birth_date).slice(0,4));add({s:2,k:c.id+'|bday|'+nx.slice(0,4),cid:c.id,t:n===0?'🎂 ¡Hoy cumple '+age+' años!':'🎂 Cumple '+age+' años '+(n===1?'mañana':'en '+n+' días'),q:'Escríbele un mensaje para felicitarlo.'});}});
    (CP.acc||[]).forEach(a=>{const c=act.find(x=>x.id===a.client_id);if(!c)return;
      if(a.payment_failed_at){add({s:0,k:c.id+'|pfail|'+String(a.payment_failed_at).slice(0,10),cid:c.id,t:'💳 Falló su pago',q:'Escríbele para que actualice su método de pago.'});return;}
      if(!a.paid_until)return;const dl=Math.ceil((new Date(a.paid_until).getTime()-Date.now())/864e5),pk=String(a.paid_until).slice(0,10);
      if(a.period==='cortesia'){if(dl<0)add({s:1,k:c.id+'|cexp|'+pk,cid:c.id,t:'🎁 Su cortesía terminó hace '+(-dl)+' día'+(dl===-1?'':'s'),q:'Terminó el '+fdate(pk)+'. Decide si la extiendes o pasa a un plan.'});else if(dl<=3)add({s:1,k:c.id+'|csoon|'+pk,cid:c.id,t:'🎁 Su cortesía vence '+(dl===0?'hoy':dl===1?'mañana':'en '+dl+' días'),q:'Vence el '+fdate(pk)+'. ¿La extiendes o le ofreces un plan?'});return;}
      if(dl<0)add({s:0,k:c.id+'|exp|'+pk,cid:c.id,t:'💰 Plan vencido hace '+(-dl)+' día'+(dl===-1?'':'s')+' · por cobrar',q:'Venció el '+fdate(pk)+'. Confirma su renovación.'});
      else if(dl<=7)add({s:1,k:c.id+'|soon|'+pk,cid:c.id,t:'⏳ Su plan vence '+(dl===0?'hoy':dl===1?'mañana':'en '+dl+' días'),q:(a.cancel_at_period_end?'Ya canceló la renovación. ':'')+'Vence el '+fdate(pk)+'.'});});
    try{const Hh=CP.home||{},lg={};(Hh.cd||[]).forEach(x=>{if(x.key==='logs')lg[x.client_id]=Object.keys(x.value||{});});
      (Hh.fb||[]).forEach(f=>{if(f.grp!=='fuerza'||f.skip_reason||!lg[f.client_id]||!act.find(x=>x.id===f.client_id)||f.log_date<addD(tdy,-3))return;
        if(!lg[f.client_id].some(k=>k.indexOf(f.log_date+'|')===0))add({s:0,k:f.client_id+'|nolog|'+f.log_date,cid:f.client_id,t:'⚠ Entrenó el '+fdate(f.log_date)+' pero no se ve su registro de series',q:'Puede haberse perdido el registro. Pídele que lo revise o lo cargue de nuevo.'});});}catch(e){}
    al.sort((a,b)=>a.s-b.s);
    return Object.assign({},r,{al,nh,hid});}catch(e){return r;}};
  const p1=cpHomePage;cpHomePage=function(){let h=p1.apply(this,arguments);try{
    const last={};(CP.inbox||[]).forEach(m=>{if(m.client_id&&!last[m.client_id])last[m.client_id]=m;});
    const rd=id=>{try{return +localStorage.getItem('cpread_'+id)||0;}catch(e){return 0;}};
    const pend=(CP.clients||[]).filter(c=>c.status!=='archived').map(c=>({c,m:last[c.id]})).filter(x=>x.m&&x.m.sender_id===x.c.id&&x.m.kind!=='hito'&&new Date(x.m.created_at).getTime()>rd(x.c.id));
    const rows=pend.slice(0,4).map(({c,m})=>{const b=bogota(m.created_at);return `<button class="cpfi" data-act="cpchat" data-id="${c.id}"><i class="cpav">${esc(cpIni(c.full_name))}</i><span><b>${esc(c.full_name||'Cliente')}</b><small>${esc(String(m.body||'').replace(/\s+/g,' ').slice(0,60))}</small></span><em>${cpRel(b.date)}</em></button>`;}).join('');
    const sec=`<section class="sec"><div class="sec-h"><b>💬 Chats por responder</b><em>${pend.length}</em></div>${rows||'<div class="note">Estás al día con los chats ✓</div>'}${pend.length>4?`<div class="note">y ${pend.length-4} más en la pestaña Chat.</div>`:''}</section>`;
    const m='<section class="sec"><div class="sec-h"><b>Actividad reciente';const i=h.indexOf(m);if(i>=0)h=h.slice(0,i)+sec+h.slice(i);}catch(e){}return h;};
  /* mi actividad: también archivar, restaurar, eliminar y reiniciar */
  const nmOf=id=>{const c=(CP.clients||[]).find(x=>x.id===id);return (c&&c.full_name)||'un cliente';};
  if(DB.archiveClient){const ar=DB.archiveClient.bind(DB);DB.archiveClient=async(cid,on)=>{const r=await ar(cid,on);try{DB.logAct(cid,'cli',on?'Archivó al cliente':'Restauró al cliente');}catch(e){}return r;};}
  if(DB.deleteClient){const dc=DB.deleteClient.bind(DB);DB.deleteClient=async cid=>{const n=nmOf(cid);const r=await dc(cid);try{DB.logAct(null,'cli','Eliminó la cuenta de '+n);}catch(e){}return r;};}
  if(DB.resetProfile){const rp=DB.resetProfile.bind(DB);DB.resetProfile=async cid=>{const r=await rp(cid);try{DB.logAct(cid,'cli','Reinició el perfil del cliente');}catch(e){}return r;};}
})();


/* ---------- PREVISUAL CARDIO / VUELTA A LA CALMA + CHECK-IN SIN ENTRAR (22 nov) ---------- */
(function(){
const st=document.createElement('style');st.textContent=`
.pcv{padding:2px 0 4px}.pcv .cvh{margin:6px 0 12px;background:linear-gradient(135deg,color-mix(in srgb,var(--zc) 30%,var(--card,#fff)),color-mix(in srgb,var(--zc) 10%,var(--card,#fff)));border-color:var(--zc);box-shadow:0 6px 18px color-mix(in srgb,var(--zc) 28%,transparent)}.pcv .cvh .cvi{color:var(--zc)}.pcv .pcs{display:flex;gap:8px;margin:0 0 12px}.pcv .pcs div{flex:1;background:var(--card,#FBFAF8);border:1.5px solid var(--line,#DCD6CC);border-radius:14px;padding:9px 6px;text-align:center}.pcv .pcs small{display:block;font:500 11px Archivo,sans-serif;color:var(--gray,#5A554E)}.pcv .pcs b{display:block;font:700 15px Archivo,sans-serif;margin-top:2px}
.pcv .pcs .pcz{background:color-mix(in srgb,var(--zc) 18%,var(--card,#fff));border-color:var(--zc)}.pcv .pcs .pcz small{color:var(--zc);font-weight:700}.pcv .pcs .pcz b{color:var(--zc);filter:brightness(.8)}
.pcv .pct{font-size:13.5px;color:var(--gray,#5A554E);margin:0 0 12px;line-height:1.4}.pcv .pcb{width:100%;padding:15px;font-size:16px}.pcv .pcc{width:100%;margin-top:8px;padding:13px;border:2px solid #1F8F53;color:#1F7A52;background:#EAF6EF;border-radius:99px;font:700 15px Archivo,sans-serif}.pcv .pcl{display:block;width:100%;margin-top:6px;background:none;border:0;color:var(--gray,#5A554E);font:600 14px Archivo,sans-serif;padding:8px}
.cqh{position:relative;overflow:hidden;display:flex;align-items:center;gap:12px;margin:6px 0 12px;padding:12px;border-radius:18px;background:linear-gradient(135deg,#E8E4F4,#DDEBF2);color:#3B3A6B}
.cqh .cqi{flex:0 0 96px;color:#5B4B9A}.cqh svg{width:96px;height:80px;display:block}.cqx small{display:block;font:600 12px Archivo,sans-serif;opacity:.8;text-transform:uppercase;letter-spacing:.06em}.cqx b{display:block;font:700 20px/1.15 Archivo,sans-serif;margin:2px 0}.cqx span{display:block;font:500 13.5px Archivo,sans-serif}.cqx em{display:block;font-style:normal;font:600 13px Archivo,sans-serif;margin-top:4px}
.cqring{transform-origin:60px 46px;animation:cqb 5s ease-in-out infinite}.cqa1{transform-origin:58px 34px;animation:cqs 5s ease-in-out infinite}.cqa2{transform-origin:62px 34px;animation:cqs2 5s ease-in-out infinite}
@keyframes cqb{0%,100%{transform:scale(.78);opacity:.25}50%{transform:scale(1.05);opacity:.55}}@keyframes cqs{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}@keyframes cqs2{0%,100%{transform:rotate(12deg)}50%{transform:rotate(-12deg)}}
.pcv .cql{margin:0 0 10px}.pcv .cql .prerow{margin-bottom:6px}
@media (prefers-reduced-motion:reduce){.cqring,.cqa1,.cqa2{animation:none!important}}`;document.head.appendChild(st);
const early=k=>{if(S.fb&&S.fb[fbKey(k)])return true;if(ipActive()&&S.tw===k&&S.tgD===today())return true;return !DAYS[S.day];};
function actBtns(k,start){return `<button class="btn solid pcb" data-act="prestart" data-b="${k}">${start}</button><button class="pcc" data-act="precheck" data-b="${k}">✓ Ya lo hice · Hacer check-in</button>`;}
function cardioPrev(){
  const d=DAYS[S.day],P=PERIOD[S.program],wk=Math.min(S.week,P.weeks),t=cxTier(cTier(d,wk)),c=(S.cardio||{})[cKey(d)]||{},mod=c.mod||d.cardioDefault||'camin_cam',m=CMODS[mod]||CMODS.camin_cam,z=t?TIERZONE[t]:2,Z=ZONES[z-1];
  const hero=`<div class="cvh" style="--zc:${ZC[z]}"><div class="cvi">${__cv.icon(mod)}</div><div class="cvx"><small>${t?'Hoy haces':'Movimiento suave'}</small><b>${esc(m.n)}</b><span>${t?cDur(d,t):'15–35 min'}</span><em>🗣 ${__cv.TALK[z]}</em></div><svg class="cvecg" viewBox="0 0 240 24" preserveAspectRatio="none"><path d="M0 12 H60 l6 -9 l8 20 l8 -16 l6 5 H130 l6 -9 l8 20 l8 -16 l6 5 H240"/></svg></div>`;
  const zname=({1:'Muy suave',2:'Ligero',3:'Moderado',4:'Intenso',5:'Máximo'})[z];
  const meter=`<div class="zmt" style="--zc:${ZC[z]}"><div class="zmh"><b>ZONA ${z}</b><span>${zname}</span></div><div class="zmb">${[1,2,3,4,5].map(k=>`<i class="${k===z?'on':''}" style="--c:${ZC[k]}"></i>`).join('')}</div><div class="zml"><small>Suave</small><small>Máximo</small></div></div>`;
  const stats=`<div class="pcs"><div><small>Ritmo</small><b>${esc(String(Z.s).replace(/^Zona \d\s*[·-]?\s*/i,'')||Z.s)}</b></div><div><small>Semana</small><b>${wk}/${P.weeks}</b></div></div>`;
  const txt=t?`${t}. Un ritmo en el que puedas mantener el control de tu respiración.`:'Semana de movimiento suave: zonas 1–2, sin buscar intensidad.';
  sheet(`<div class="pcv"><div class="prehd"><small>Cardio de hoy</small></div>${hero}${cNoteHTML(d)}${meter}${stats}<p class="pct">${esc(txt)}</p>${actBtns('g_cardio','Comenzar cardio')}<button class="pcl" data-act="prelist" data-b="g_cardio">Ver opciones de cardio</button></div>`);}
const FIG=`<circle class="cqring" cx="60" cy="46" r="30" fill="currentColor" stroke="none"/><g stroke="currentColor" stroke-width="3.6" stroke-linecap="round" fill="none"><circle cx="60" cy="18" r="6.5"/><path d="M60 26 L60 54 M60 54 L50 72 M60 54 L70 72"/><g class="cqa1"><path d="M58 34 L44 16"/></g><g class="cqa2"><path d="M62 34 L76 16"/></g><path d="M20 76 H100" opacity=".4"/></g>`;
function calmPrev(){
  const d=DAYS[S.day],P=PERIOD[S.program],wk=Math.min(S.week,P.weeks),b=d.blocks.find(x=>x.k==='calm'),its=(b&&b.items)||[],n=its.length,mn=Math.max(3,Math.round((n||4)*0.75));
  const hero=`<div class="cqh"><div class="cqi"><svg viewBox="0 0 120 90" aria-hidden="true">${FIG}</svg></div><div class="cqx"><small>Vuelta a la calma</small><b>Bajamos revoluciones</b><span>${n?n+(n===1?' estiramiento':' estiramientos'):'Estiramientos'} · ~${mn} min</span><em>🫁 Respira profundo en cada posición</em></div></div>`;
  const rows=its.map((it,i)=>{const id=curEx(d,'calm',i,it),e=E[id]||{},mm=(it.fixed&&it.fixed.reps)||'';return `<div class="prerow">${typeof thumb==='function'?thumb(id):''}<span><b>${esc(e.n||id)}</b><small>${esc(mm)}</small></span></div>`;}).join('');
  sheet(`<div class="pcv">${hero}${rows?`<div class="cql">${rows}</div>`:'<p class="pct">Estiramientos suaves y respiración para empezar a recuperar. Sin prisa.</p>'}${actBtns('g_calm','Comenzar vuelta a la calma')}</div>`);}
const po=preOpen;preOpen=function(k){
  try{if(k==='g_cardio'||k==='g_calm'){if(early(k))return po.apply(this,arguments);if(k==='g_cardio')cardioPrev();else calmPrev();return true;}}catch(e){console.warn('prev',e);}
  return po.apply(this,arguments);};
/* check-in directo desde el previsual */
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('#sheet [data-act="precheck"]');if(!t)return;e.stopPropagation();e.preventDefault();const g=t.dataset.b;closeSheet();try{fbd={};}catch(x){}openFinish(g);
  setTimeout(()=>{try{if(g==='g_fuerza')return;const sb=document.querySelector('#sheet .celeb .sub');if(sb&&/^Te falta/.test(sb.textContent))sb.textContent=g==='g_calm'?'Cuéntanos cómo te sentiste.':'Cuéntanos cómo te fue en tu cardio.';}catch(x){}},30);},true);
})();

(function(){const st=document.createElement('style');st.textContent=`.mcat{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:14px 0 6px}.mcat b{font:700 13px Archivo,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--gray,#5A554E)}.mcat span{font:700 12px Archivo,sans-serif;color:#C0392B;background:color-mix(in srgb,#C0392B 10%,var(--card,#fff));border-radius:99px;padding:3px 10px;white-space:nowrap}`;document.head.appendChild(st);})();

(function(){const st=document.createElement('style');st.textContent=`.lescard.les-min{display:flex;align-items:center;gap:10px;padding:8px 12px;margin:8px 0;border-left-width:3px;border-radius:12px}.les-min .lesav,.lessig .lesav{flex:0 0 30px;width:30px;height:30px;border-radius:50%;background:#C0392B;color:#fff;font:700 15px Oswald,Archivo,sans-serif;display:flex;align-items:center;justify-content:center;font-style:normal}
.les-min .lesx{flex:1;min-width:0}.les-min .lesx small{font-size:10.5px;letter-spacing:.05em}.les-min .lesx b{font-size:14px;margin:1px 0 0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.les-min em{font-style:normal;color:var(--gray);font-size:20px;line-height:1}
.lessig{display:flex;align-items:center;gap:10px;margin:14px 0 4px;padding-top:12px;border-top:1px solid var(--line,#DCD6CC)}.lessig .lesav{flex:0 0 38px;width:38px;height:38px;font-size:18px}.lessig span b{display:block;font:700 15px Archivo,sans-serif}.lessig span small{display:block;color:var(--gray,#5A554E);font-size:12.5px}`;document.head.appendChild(st);})();

(function(){const st=document.createElement('style');st.textContent=`.lesav{object-fit:cover}
.zmt{margin:0 0 12px;padding:12px 14px;border-radius:16px;background:var(--card,#FBFAF8);border:1.5px solid color-mix(in srgb,var(--zc) 50%,var(--line,#DCD6CC))}
.zmh{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px}.zmh b{font:700 13px Archivo,sans-serif;letter-spacing:.1em;color:var(--zc)}.zmh span{font:800 20px Archivo,sans-serif;color:var(--zc);filter:brightness(.85)}
.zmb{display:flex;gap:5px;align-items:flex-end;height:34px}.zmb i{flex:1;height:14px;border-radius:6px;background:var(--c);opacity:.28}.zmb i.on{height:34px;opacity:1;box-shadow:0 0 0 3px color-mix(in srgb,var(--c) 30%,transparent)}
.zml{display:flex;justify-content:space-between;margin-top:5px}.zml small{font:500 10.5px Archivo,sans-serif;color:var(--gray,#5A554E)}
@media(min-width:1000px){.cpside{display:flex;flex-direction:column;max-height:calc(100vh - 24px);overflow-y:auto}.cpside .cpfoot{position:static;margin-top:auto;padding-top:16px}.cpside .cpnav{flex:0 0 auto}}`;document.head.appendChild(st);})();

(function(){const st=document.createElement('style');st.textContent=`.cpbadge.basic{background:#3B82C4!important;color:#fff!important}.cpbadge.complete{background:#1C1B19!important;color:#fff!important}.cpbadge.elite{background:linear-gradient(135deg,#F0CB5B,#C99A1E)!important;color:#2A2108!important;box-shadow:0 0 0 1.5px #E3B93C}`;document.head.appendChild(st);})();

/* Panel del coach en celular (≤ 699 px): menú en una fila deslizable, barra de cuenta ordenada, clientes como tarjetas.
   Solo afecta pantallas angostas; el computador queda igual. */
(function(){const st=document.createElement('style');st.id='cpMobileCss';st.textContent=`@media(max-width:699px){
.cpshell{display:block}
.cpside{display:block;position:static;border:0;padding:0;min-height:0}
.cpmain{min-width:0}
.cpnav{display:flex;flex-direction:row;flex-wrap:nowrap;gap:6px;overflow-x:auto;margin:8px 0 10px;padding:2px 0 6px;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.cpnav::-webkit-scrollbar{display:none}
.cpnav .cpn{flex:0 0 auto;white-space:nowrap;padding:9px 14px;font-size:13px;border-radius:99px}
.cpfoot{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin:4px 0 14px;padding:10px 12px;border:1px solid var(--line);border-radius:14px;background:var(--card)}
.cpfoot .coavb{order:1;margin:0;flex:0 0 auto}
.cpfoot .coavb b{display:none}
.cpfoot>small{order:2;flex:1 1 0;min-width:0;font-weight:600;font-size:14px;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cpfoot .thpk{order:3;flex:0 0 auto;margin:0}
.cpfoot .thpk b{display:none}
.cpfoot .thpk>div{display:flex;gap:6px}
.cpfoot .thc{display:flex;flex-direction:row;align-items:center;gap:5px;padding:6px 10px}
.cpfoot .thc span{font-size:14px}.cpfoot .thc i{font-size:12px}
.cpfoot .lblbtn{order:4;flex:1 1 auto;text-align:center;white-space:nowrap;padding:9px 6px;border:1px solid var(--line);border-radius:10px;background:var(--bg);font-size:10px;letter-spacing:.02em}
.cptabs:not(.cpnavx){scrollbar-width:none;gap:0}
.cptabs:not(.cpnavx) .cptab{flex:0 0 auto;padding:10px 6px;font-size:13px}
.cptable .cptr.head{display:none}
.cptable .cptr.cprow{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:12px 52px 12px 14px!important}
.cptable .cptr.cprow>span{min-width:0}
.cptable .cptr.cprow>span:nth-child(n+4){display:block}
.cptable .cptr.cprow>span:nth-child(5){display:none}
.cptable .cptr.cprow>.cpcl{flex:1 0 100%;display:flex;align-items:center;gap:10px}
.cptable .cptr.cprow .cpnm{min-width:0;flex:1}
.cptable .cptr.cprow .cpnm b{display:block;white-space:normal;overflow:visible;text-overflow:clip}
.cptable .cptr.cprow .cpem{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cptable .cptr.cprow>span:nth-child(2) small{display:none!important}
.cptable .cptr.cprow .cpkb{position:absolute;right:6px;top:12px}
}`;document.head.appendChild(st);})();

/* ===== Crear programa con IA (copiar y pegar) =====
   El coach escribe su rutina, copia un texto listo para ChatGPT/Claude (con el catálogo de ejercicios y el formato),
   pega la respuesta (JSON) y la app monta los días en el editor como borrador. No necesita clave de IA en la app. */
(function(){
const AI={rt:'',ans:'',step:'write',err:'',plan:null};
const aiCat=()=>{const L=[];Object.keys(E).forEach(k=>{const e=E[k];if(!e||!e.n||/\(ANTIGUO\)/i.test(e.n))return;if(e.yt||k.slice(0,2)==='x_'||/^(mov_|band_|est_|resp_)/.test(k))L.push([k,e.n,e.g||''].join('|'));});return L.join('\n');};
const aiCardio=()=>Object.keys(typeof CMODS!=='undefined'?CMODS:{}).filter(k=>!['trot_aire','bici','senderismo'].includes(k)).join(', ');
function aiPrompt(){
  const one=!!(RT.self||(RT.kind==='template'&&RT.tkind==='workout'));
  return `Eres el asistente de programación de ERRE Complete (Método Complete). Te voy a escribir mi rutina con mis palabras y quiero que la conviertas en un ${one?'workout de UN día':'programa'} para mi app.

REGLAS
- Cada día tiene 4 bloques, en este orden: "warm" (calentamiento específico, 2 a 3 ejercicios de movilidad o activación), "main" (rutina central: 2 a 3 ejercicios básicos multiarticulares), "acc" (accesorios, 3 a 5 ejercicios) y "calm" (vuelta a la calma: 2 a 3 estiramientos y, al final, una respiración si existe en el catálogo).
- Usa SOLO ids del CATÁLOGO que está al final. No inventes ids. Si un ejercicio mío no existe, elige el más parecido del catálogo.
- Respeta mi orden y mis ejercicios. Si no dije calentamiento o vuelta a la calma, complétalos tú de forma coherente con lo que trabajo ese día.
- No pongas series ni repeticiones si yo no las escribí: las define el mesociclo de la app. Si yo las escribí, ponlas en ese ejercicio.
- Responde SOLO con un bloque de código JSON, sin explicaciones.

FORMATO
{"name":"Nombre del programa","days":[{"name":"Día 1 · Pecho y tríceps","cardio":"camin_cam","warm":["id1","id2"],"main":["id3",{"id":"id4","sets":4,"reps":"6-8","rest":120,"note":"pausa abajo"}],"acc":["id5","id6","id7"],"calm":["id8","id9"]}]}
Cada ejercicio puede ser solo el id (texto) o un objeto con "id" y, si hace falta, "sets", "reps", "rest" (segundos), "rir" y "note". "cardio" es opcional; valores posibles: ${aiCardio()}.

MI RUTINA:
${AI.rt.trim()||'(escribe aquí tu rutina: días, ejercicios, series y repeticiones si las tienes)'}

CATÁLOGO (id | nombre | grupo):
${aiCat()}`;
}
const aiNrm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
let _byName=null;
function aiFind(x){
  if(typeof x!=='string'||!x)return null;if(E[x]&&E[x].n)return x;
  if(!_byName){_byName={};Object.keys(E).forEach(k=>{const e=E[k];if(e&&e.n&&!/\(ANTIGUO\)/i.test(e.n))_byName[aiNrm(e.n)]=_byName[aiNrm(e.n)]||k;});}
  const n=aiNrm(x);if(_byName[n])return _byName[n];
  const ks=Object.keys(_byName).filter(q=>q.includes(n)||n.includes(q));if(ks.length){ks.sort((a,b)=>Math.abs(a.length-n.length)-Math.abs(b.length-n.length));return _byName[ks[0]];}
  return null;}
function aiParse(txt){
  let t=String(txt||'').trim();if(!t)throw new Error('Pega primero la respuesta de la IA.');
  t=t.replace(/```(?:json)?/gi,'');
  const a=t.search(/[\{\[]/),z=Math.max(t.lastIndexOf('}'),t.lastIndexOf(']'));
  if(a<0||z<a)throw new Error('No encontré el bloque de código en lo que pegaste. Copia la respuesta completa de la IA.');
  let o;try{o=JSON.parse(t.slice(a,z+1));}catch(e){throw new Error('El texto pegado está cortado o tiene un error. Pídele a la IA: «Repite solo el JSON completo».');}
  const days=Array.isArray(o)?o:(o.days||o.dias||[]);
  if(!Array.isArray(days)||!days.length)throw new Error('No vi ningún día en la respuesta.');
  const one=!!(RT.self||(RT.kind==='template'&&RT.tkind==='workout')),miss=[],out=[];let n=0;
  days.slice(0,one?1:7).forEach((dd,i)=>{
    const d=cpBlankDay(String(dd.name||dd.nombre||('Día '+(i+1))).slice(0,60)),seen={},B=k=>d.blocks.find(b=>b.k===k);
    const cm=dd.cardio;if(typeof CMODS!=='undefined'&&cm&&CMODS[cm])d.cardioDefault=cm;
    ['warm','main','acc','calm'].forEach(k=>{
      (Array.isArray(dd[k])?dd[k]:[]).forEach(it=>{
        const raw=(it&&typeof it==='object')?(it.id||it.ex||it.name||it.nombre):it,id=aiFind(String(raw||''));
        if(!id){if(raw)miss.push(String(raw));return;}
        if(seen[id])return;seen[id]=1;const o2=(it&&typeof it==='object')?it:{},sets=+o2.sets||0,reps=o2.reps!=null&&o2.reps!==''?String(o2.reps).slice(0,14):'';
        if(k==='warm'||k==='calm'){B(k).items.push({ex:id,kind:k,fixed:{sets:String(sets||2),reps:reps||(k==='calm'?(/^resp_/.test(id)?'2 min':'30 s'):'10-12')},note:String(o2.note||'').slice(0,160)});}
        else{const it2={ex:id,kind:k==='main'?'basic':'acc',ref:0,tempo:String(o2.tempo||(k==='main'?'3-0-1-0':RDEF.tempo)).slice(0,10),rir:String(o2.rir!=null?o2.rir:RDEF.rir).slice(0,4),rest:+o2.rest||(k==='main'?120:RDEF.rest),note:String(o2.note||'').slice(0,160)};
          if(sets||reps){it2.ov={};if(sets)it2.ov.sets=sets;if(reps)it2.ov.reps=reps;}B(k).items.push(it2);}
        n++;});});
    out.push(d);});
  if(!n)throw new Error('Ninguno de los ejercicios coincide con tu biblioteca. Usa el texto que copia la app, que trae el catálogo.');
  return {name:String((Array.isArray(o)?'':(o.name||o.nombre))||'').slice(0,80),days:out,miss:[...new Set(miss)],n,cut:!one?false:days.length>1};
}
function aiClip(txt){
  const ok=()=>toast('Copiado ✓ Pégalo en ChatGPT o Claude');
  const fb=()=>{const t=document.createElement('textarea');t.value=txt;t.style.cssText='position:fixed;opacity:0;top:0';document.body.appendChild(t);t.focus();t.select();try{document.execCommand('copy');ok();}catch(e){toast('No se pudo copiar. Mantén presionado y copia.');}t.remove();};
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(ok).catch(fb);else fb();}
function aiModal(open){
  let o=document.getElementById('cpaiprog');if(!open){if(o)o.remove();return;}
  if(!o){o=document.createElement('div');o.id='cpaiprog';o.className='cpdv';document.body.appendChild(o);}
  const P=AI.plan,one=!!(RT.self||(RT.kind==='template'&&RT.tkind==='workout'));
  const step=(n,t)=>`<div style="display:flex;align-items:center;gap:8px;margin:14px 0 6px"><i style="flex:none;width:24px;height:24px;border-radius:50%;background:var(--btn,#1C1B19);color:#fff;font:700 12px Archivo,sans-serif;display:flex;align-items:center;justify-content:center;font-style:normal">${n}</i><b style="flex:1;min-width:0;font-size:14px">${t}</b></div>`;
  const body=P?`<div class="note" style="margin-top:4px"><b style="display:inline">${esc(P.name||'Programa')}</b> · ${P.days.length} ${P.days.length===1?'día':'días'} · ${P.n} ejercicios</div>
     ${P.days.map(d=>`<div class="pfrow" style="margin:6px 0"><span><b>${esc(d.name)}</b><small>${d.blocks.filter(b=>!b.cardio).map(b=>b.items.length).join(' · ')} <span style="opacity:.7">(calent. · central · acces. · calma)</span></small></span></div>`).join('')}
     ${P.cut?'<div class="note" style="margin-top:6px">Este editor es de un solo día: usé el primer día de la respuesta.</div>':''}
     ${P.miss.length?`<div class="note" style="margin-top:6px;border-color:var(--red);color:var(--red-strong)"><b style="display:inline">No encontré en tu biblioteca:</b> ${P.miss.map(esc).join(', ')}.<br>Se dejaron fuera. Puedes agregarlos en «Ejercicios propios» y sumarlos a mano.</div>`:''}
     <div class="note" style="margin-top:6px">Se monta como <b style="display:inline">borrador</b> en el editor: lo revisas y tú lo guardas.</div>
     <button class="cpmvbt pri" data-act="aiapply" style="width:100%;margin-top:10px">Montar en el editor</button>
     <button class="cpmvbt" data-act="aiback" style="width:100%;margin-top:8px">‹ Volver</button>`
  :`${step(1,'Cuéntale tu rutina')}
     <textarea class="fld" id="aiRt" rows="5" placeholder="Ej. 4 días. Día 1: pecho y tríceps: press banca 4x6-8, press inclinado con mancuernas, aperturas, fondos. Día 2: espalda y bíceps…">${esc(AI.rt)}</textarea>
     <div class="note" style="margin-top:4px;font-size:12px">Puedes dictarla por voz. Si prefieres, déjalo en blanco y la escribes directo en ChatGPT o Claude.</div>
     ${step(2,'Copia el texto y pégalo en ChatGPT o Claude')}
     <button class="cpmvbt pri" data-act="aicopy" style="width:100%">📋 Copiar para la IA</button>
     <div class="note" style="margin-top:4px;font-size:12px">Trae tu rutina, las reglas del Método Complete y tu biblioteca de ejercicios. La IA te responde con un bloque de código.</div>
     ${step(3,'Pega aquí lo que te respondió')}
     <textarea class="fld" id="aiAns" rows="5" placeholder="Pega aquí la respuesta de la IA">${esc(AI.ans)}</textarea>
     <button class="lblbtn" data-act="aipaste" style="margin-top:6px">📥 Pegar del portapapeles</button>
     ${AI.err?`<div class="note" style="border-color:var(--red);color:var(--red-strong);margin-top:8px">${esc(AI.err)}</div>`:''}
     <button class="cpmvbt pri" data-act="aibuild" style="width:100%;margin-top:10px">Armar programa</button>`;
  o.innerHTML=`<div class="cpdc" style="max-width:560px"><div class="cpdhd"><div><b>✨ Crear con IA</b><small>Copia, pega en ChatGPT o Claude y trae la respuesta</small></div><button class="cpdx" data-act="aipx" aria-label="Cerrar">✕</button></div><div class="cpmvb">${body}</div></div>`;}
const sync=()=>{const a=document.getElementById('aiRt'),b=document.getElementById('aiAns');if(a)AI.rt=a.value;if(b)AI.ans=b.value;};
document.addEventListener('input',e=>{if(e.target&&(e.target.id==='aiRt'||e.target.id==='aiAns'))sync();},true);
document.addEventListener('click',async e=>{
  const t=e.target.closest&&e.target.closest('[data-act^="ai"]');if(!t)return;const a=t.dataset.act;
  if(!/^(aipo|aipx|aicopy|aipaste|aibuild|aiapply|aiback|aiprognew|aicli)$/.test(a))return;
  e.stopPropagation();e.preventDefault();sync();
  if(a==='aiprognew'){rtOpen('template',{name:'',tkind:RT.lb.kind,folder:RT.lb.folder,days:[RD.torsoC(1)]});AI.plan=null;AI.err='';AI.step='write';aiModal(true);return;}
  if(a==='aicli'){const has=CP.routine&&CP.routine.days&&CP.routine.days.length;rtOpen('client',{cid:CP.cid,name:has?CP.routine.name:'Rutina de '+((CP.d&&CP.d.profile&&CP.d.profile.full_name||'cliente').split(' ')[0]),days:has?CP.routine.days:[RD.torsoC(1)]});AI.plan=null;AI.err='';aiModal(true);return;}
  if(a==='aipo'){AI.plan=null;AI.err='';aiModal(true);return;}
  if(a==='aipx'){aiModal(false);return;}
  if(a==='aiback'){AI.plan=null;aiModal(true);return;}
  if(a==='aicopy'){aiClip(aiPrompt());return;}
  if(a==='aipaste'){try{const s=await navigator.clipboard.readText();if(s){AI.ans=s;AI.err='';aiModal(true);}else toast('El portapapeles está vacío');}catch(x){toast('Mantén presionado en el cuadro y elige Pegar');}return;}
  if(a==='aibuild'){try{AI.plan=aiParse(AI.ans);AI.err='';}catch(x){AI.plan=null;AI.err=x.message||'No se pudo leer la respuesta.';}aiModal(true);return;}
  if(a==='aiapply'){const P=AI.plan;if(!P)return;
    const has=RT.days.some(d=>(d.blocks||[]).some(b=>!b.cardio&&b.items&&b.items.length));
    if(has&&!confirm('Esto reemplaza los días que hay ahora en el editor (todavía no están guardados). ¿Continuar?'))return;
    if(P.name&&!(RT.name||'').trim())RT.name=P.name;RT.days=P.days;RT.sel=0;RT.dirty=true;rtFixIds();rtShow();AI.plan=null;AI.ans='';aiModal(false);toast('Borrador montado. Revísalo y guárdalo ✓');window.scrollTo(0,0);}
},true);
/* botones de entrada */
const re=rtEditorHTML;rtEditorHTML=function(){let h=re.apply(this,arguments);const m='<div class="note">Series y repeticiones de básicos';const i=h.indexOf(m);return i<0?h:h.slice(0,i)+'<button class="btn" data-act="aipo" style="width:100%;margin:10px 0 0">✨ Crear con IA (copiar y pegar)</button>'+h.slice(i);};
const rl=rtTplList;rtTplList=function(){let h=rl.apply(this,arguments);const m='<div style="display:flex;gap:8px;margin-top:10px"><button class="btn" data-act="rtlbnewf"';const i=h.indexOf(m);return i<0?h:h.slice(0,i)+'<button class="btn" data-act="aiprognew" style="width:100%;margin-top:10px">✨ Crear '+(RT.lb&&RT.lb.kind==='workout'?'workout':'programa')+' con IA</button>'+h.slice(i);};
const ce=cpEntSeg;cpEntSeg=function(){return ce.apply(this,arguments)+'<button class="btn" data-act="aicli" style="width:100%;margin:0 0 10px">✨ Crear programa con IA</button>';};
})();

/* ===== Inicio del cliente: invitar a activar los avisos con un toque (sin ir a Perfil) ===== */
(function(){
const NOK='pushNo',DAYS=2;
const dismissed=()=>{try{return Date.now()-(+localStorage.getItem(NOK)||0)<DAYS*864e5;}catch(e){return false;}};
let ready=false;
const check=()=>{try{pushRefresh().then(()=>{ready=true;try{if(S&&S.tab==='inicio'&&PROFILE&&PROFILE.role!=='coach'&&!document.getElementById('lgEmail'))render();}catch(e){}});}catch(e){ready=true;}};
setTimeout(check,2500);
function card(){
  try{
    if(!ready||PUSH.on||dismissed()||!pushSupported()||Notification.permission==='denied')return '';
    if(PROFILE&&PROFILE.role==='coach')return '';
    return `<div class="pwab pushnud" style="margin-bottom:12px"><span style="font-size:26px;flex:none">🔔</span><span><b>Activa tus avisos</b>Te avisamos cuando tu coach te escriba o cambie tu plan, y cuando te toque entrenar. Es un toque.</span><button class="pwai" data-act="pushtg">Activar</button><button class="pwax" data-act="pushno" aria-label="Ahora no">✕</button></div>`;
  }catch(e){return '';}
}
const hv=homeView;homeView=function(){const h=hv.apply(this,arguments),c=card();return c?c+h:h;};
document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pushno"]');if(!t)return;e.stopPropagation();try{localStorage.setItem(NOK,String(Date.now()));}catch(x){}try{render();}catch(x){}},true);
})();

/* Nota libre del coach en el cardio del día (se escribe en el editor › Cardio › «Notas para el cliente») */
function cNoteHTML(d){try{return d&&d.cardioNote?`<div class="note cnote" style="margin:10px 0;white-space:pre-wrap;border-left:3px solid #D03A68"><b style="display:inline">📝 Nota de tu coach</b><br>${esc(d.cardioNote)}</div>`:'';}catch(e){return '';}}

/* ===== Inicio: estado del entreno por partes (fuerza / cardio / calma) ===== */
var OTROPEN=false;document.addEventListener('toggle',e=>{if(e.target&&e.target.classList&&e.target.classList.contains('otr'))OTROPEN=e.target.open;},true);
function trainGroups(){
  const d=DAYS[S.day];if(!d)return {gs:[],done:0,total:0,part:false};
  const gs=[];
  ['g_fuerza','g_cardio','g_calm'].forEach(g=>{
    try{const c=gCount(g);if(!(c.t>0))return;
      const fin=!!(S.fb&&S.fb[fbKey(g)]);
      const ok=fin||c.ok;
      gs.push({g,ok,part:!ok&&(c.x>0||gRstHas(g))});
    }catch(e){}
  });
  return {gs,done:gs.filter(x=>x.ok).length,total:gs.length,part:gs.some(x=>x.part||x.ok)};
}

/* ---------- BIENVENIDA VISUAL tras el registro: explica por qué el plan se ajusta a ti ---------- */
(function(){
  const st=document.createElement('style');st.textContent=`
.wl{animation:wlIn .35s ease}@keyframes wlIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.wldots{display:flex;gap:6px;justify-content:center;margin:10px 0 4px}.wldots i{width:7px;height:7px;border-radius:99px;background:var(--line);transition:all .2s}.wldots i.on{width:22px;background:var(--red-strong,#C0392B)}
.wlh{text-transform:uppercase;font-size:24px;line-height:1.15;margin:10px 0 6px;padding-right:36px}
.wlp{color:var(--gray);font-size:15px;line-height:1.4;margin:0 0 14px}
.wlk{display:flex;gap:8px;margin:0 0 12px;flex-wrap:wrap}.wlk span{background:var(--ink,#1C1B19);color:#fff;font-size:12px;font-weight:600;padding:5px 11px;border-radius:99px}
.wlpil{display:grid;grid-template-columns:1fr 1fr;gap:10px}.wlpil div{border:1px solid var(--line);background:var(--card);border-radius:16px;padding:14px 10px;text-align:center;font-weight:700;font-size:14px}.wlpil em{display:block;font-style:normal;font-size:26px;margin-bottom:4px}
.wlrow{display:flex;gap:12px;align-items:flex-start;border:1px solid var(--line);background:var(--card);border-radius:16px;padding:12px;margin-bottom:9px}
.wlrow .wi{flex:none;width:38px;height:38px;border-radius:12px;background:var(--red-tint,#FBEDEA);display:flex;align-items:center;justify-content:center;font-size:19px}
.wlrow small{display:block;color:var(--gray);font-size:11px;text-transform:uppercase;letter-spacing:.06em}.wlrow b{display:block;font-size:15px;margin:1px 0 2px}.wlrow p{margin:0;font-size:13px;color:var(--gray);line-height:1.35}
.wlwk{display:grid;grid-template-columns:repeat(7,1fr);gap:5px;margin:4px 0 12px}.wlwk span{aspect-ratio:1;border-radius:50%;border:2px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:var(--gray);background:var(--card)}.wlwk span.on{background:var(--red-strong,#C0392B);border-color:var(--red-strong,#C0392B);color:#fff}
.wlbars{display:flex;align-items:flex-end;gap:8px;height:92px;margin:8px 0 4px;padding:0 4px}.wlbars div{flex:1;border-radius:8px 8px 3px 3px;background:var(--red-strong,#C0392B);position:relative;transition:height .5s}.wlbars div.dl{background:#B9B3AA}
.wlbl{display:flex;gap:8px;padding:0 4px;font-size:11px;color:var(--gray);text-align:center}.wlbl span{flex:1}
.wlfig{display:flex;gap:14px;align-items:center;margin:4px 0 12px}.wlfig svg{width:64px;height:122px;flex:none}
.wlcard{border:1px solid var(--line);background:var(--card);border-radius:16px;padding:14px;margin-bottom:10px}
.wldn{display:flex;gap:16px;align-items:center}.wldn svg.dn{width:130px;height:130px;flex:none;transform:rotate(-90deg)}.wldl{flex:1;font-size:14px}.wldl div{display:flex;align-items:center;gap:8px;margin:5px 0}.wldl i{width:12px;height:12px;border-radius:4px;flex:none}.wldl b{margin-left:auto}
.wlhero{position:relative;overflow:hidden;border-radius:22px;padding:22px 18px 18px;background:linear-gradient(135deg,#1C1B19 0%,#3A1612 100%);margin:6px 0 14px;animation:wlIn .5s ease}
.wlr{position:absolute;right:-14px;top:-10px;width:120px;opacity:.12}.wlr svg{width:100%;height:auto}
.wlbadge{display:inline-block;background:var(--red-strong,#C0392B);color:#fff;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border-radius:99px}
.wlst{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:16px}.wlst div{background:rgba(255,255,255,.08);border-radius:14px;padding:10px 6px;text-align:center;animation:wlPop .5s ease both}.wlst div:nth-child(2){animation-delay:.1s}.wlst div:nth-child(3){animation-delay:.2s}
.wlst b{display:block;color:#fff;font-size:24px;font-weight:800}.wlst small{color:#D9D3CA;font-size:11px}
@keyframes wlPop{from{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}
.wlpil div{animation:wlPop .5s ease both;animation-delay:var(--d,0s)}
.wlmap{display:flex;gap:10px;justify-content:center;background:var(--card);border:1px solid var(--line);border-radius:20px;padding:14px 8px 8px}.wlmap figure{margin:0;text-align:center;flex:1}.wlmap figcaption{font-size:12px;color:var(--gray);font-weight:600;margin-top:4px}
.bm{width:100%;max-width:130px;height:auto}.zn{fill:#D3CEC6}.zn.mid{fill:#E4A59C}.zn.on{fill:var(--red-strong,#C0392B);animation:znP 2s ease-in-out infinite}
@keyframes znP{0%,100%{opacity:1}50%{opacity:.72}}
.wldy{display:flex;gap:12px;align-items:center;border:1px solid var(--line);background:var(--card);border-radius:16px;padding:10px 12px;margin-bottom:8px;animation:wlIn .4s ease both;animation-delay:var(--d,0s)}
.wldy .wdn{flex:none;width:46px;height:46px;border-radius:50%;background:var(--red-strong,#C0392B);color:#fff;font-weight:800;font-size:13px;display:flex;align-items:center;justify-content:center}.wldy b{display:block;font-size:15px}.wldy small{color:var(--gray);font-size:12px}
.wlbars div{animation:wlGrow .6s ease both;animation-delay:var(--d,0s);transform-origin:bottom}@keyframes wlGrow{from{transform:scaleY(0)}to{transform:none}}
.wlcel{text-align:center}.wlcf{position:absolute;inset:0;pointer-events:none;overflow:hidden}.wlcf i{position:absolute;top:-10px;width:8px;height:14px;border-radius:2px;animation:wlFall 2.4s ease-in infinite}
@keyframes wlFall{to{transform:translateY(260px) rotate(360deg);opacity:0}}
.pvbar{position:fixed;left:50%;transform:translateX(-50%);bottom:calc(84px + env(safe-area-inset-bottom,0px));width:calc(100% - 24px);max-width:456px;z-index:80;background:var(--ink,#1C1B19);color:#fff;border-radius:16px;padding:10px 10px 10px 14px;display:flex;align-items:center;gap:10px;box-shadow:0 8px 24px rgba(0,0,0,.3)}
.pvbar span{flex:1;font-size:12px;line-height:1.25}.pvbar b{display:block;font-size:13px}.pvbar button{background:var(--red-strong,#C0392B);color:#fff;border:0;border-radius:12px;padding:10px 14px;font-weight:700;font-size:13px;cursor:pointer}
.pvl{display:flex;align-items:center;gap:12px;width:100%;text-align:left;border:1px solid var(--line);background:var(--card);border-radius:16px;padding:12px;margin-bottom:9px;font-family:inherit;color:inherit;cursor:pointer}
.pvl .pvi{flex:none;width:40px;height:40px;border-radius:12px;background:var(--red-tint,#FBEDEA);display:flex;align-items:center;justify-content:center;font-size:20px}.pvl .pvt{flex:1}.pvl b{display:block;font-size:15px}.pvl small{display:block;color:var(--gray);font-size:12px;margin-top:1px}.pvl .pvk{flex:none;font-size:18px;opacity:.7}
.pvsp{height:92px}.pvh{font-size:13px;text-transform:uppercase;letter-spacing:.08em;color:var(--gray);margin:16px 2px 8px;font-weight:700}
.wlbg{position:fixed;inset:0;background:rgba(28,27,25,.55);z-index:300}
.wlsh{position:fixed;left:0;right:0;bottom:0;top:54px;z-index:301;background:var(--bg,#F7F5F0);border-radius:22px 22px 0 0;overflow:auto;padding:14px 16px calc(22px + env(safe-area-inset-bottom,0px));max-width:480px;margin:0 auto;animation:wlUp .4s ease;box-shadow:0 -10px 40px rgba(0,0,0,.25)}
@keyframes wlUp{from{transform:translateY(40px);opacity:0}to{transform:none;opacity:1}}
.wlx{position:absolute;top:10px;right:12px;width:32px;height:32px;border-radius:50%;border:0;background:var(--line);color:var(--ink,#1C1B19);font-size:14px;cursor:pointer}
.wlnav{display:flex;gap:10px;margin-top:14px}.wlnav .btn{flex:1;padding:14px}.wlskip{display:block;margin:10px auto 0;color:var(--gray)}
`;document.head.appendChild(st);
  const FS={bajar:['Bajar peso','Fuerza para proteger tu músculo mientras bajas grasa. Cardio suave que suma gasto sin agotarte.','Más proteína y vegetales: te llenan y cuidan tu músculo.'],
    complete:['Complete','Fuerza progresiva para ganar músculo y bajar grasa a la vez. Cardio de base para sostener tu capacidad.','Equilibrio: carbo, proteína y vegetales parejos.'],
    aumentar:['Aumentar','Más volumen y subida de carga para construir músculo. Cardio suave y poco, para no gastar lo que necesitas para crecer.','Más carbo: la energía para entrenar fuerte y crecer.'],
    salud:['Salud','Movilidad y fuerza para moverte mejor y tener energía. Cardio suave para cuidar tu corazón.','Equilibrio: comida real, sin extremos.']};
  const PLATE={aumentar:[['Carbo',35,'#B98A3C'],['Proteína',30,'#C0392B'],['Vegetales',25,'#4E7D63'],['Grasa',10,'#5A554E']],complete:[['Carbo',30,'#B98A3C'],['Proteína',30,'#C0392B'],['Vegetales',30,'#4E7D63'],['Grasa',10,'#5A554E']],bajar:[['Proteína',35,'#C0392B'],['Vegetales',35,'#4E7D63'],['Carbo',15,'#B98A3C'],['Grasa',15,'#5A554E']]};
  const LVT={Principiante:'máquinas y poleas, para aprender el movimiento con seguridad',Intermedio:'mancuernas, Smith y ejercicios unilaterales',Avanzado:'barra libre, dominadas y trabajo con lastre'};
  function donut(k){let off=0;const P=PLATE[k]||PLATE.complete;
    return `<svg class="dn" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9155" fill="none" stroke="#EDE8E0" stroke-width="6"/>${P.map(a=>{const c=`<circle cx="18" cy="18" r="15.9155" fill="none" stroke="${a[2]}" stroke-width="6" stroke-dasharray="${a[1]-.8} ${100-a[1]+.8}" stroke-dashoffset="${-off}"/>`;off+=a[1];return c;}).join('')}</svg>`;}
  const ZN={sh:'Hombros',ch:'Pecho',bk:'Espalda',ar:'Brazos',co:'Core',gl:'Glúteo',th:'Muslos',ca:'Pantorrillas'};
  const ZF={torso:{on:['sh','ch','ar'],mid:['co']},gluteo:{on:['gl','th','ca'],mid:['co']},balanceado:{on:['sh','ch','ar','co','gl','th','ca'],mid:[]}};
  function bodyMap(view,fk,zs){const z=zs||ZF[fk]||ZF.balanceado,c=k=>z.on.includes(k)?' on':z.mid.includes(k)?' mid':'';
    const mir=d=>`<path class="zn${'${C}'}" d="${d}"/><path class="zn${'${C}'}" d="${d}" transform="translate(100 0) scale(-1 1)"/>`;
    const two=(k,d)=>mir(d).split('${C}').join(c(k));
    return `<svg class="bm" viewBox="0 0 100 192" aria-hidden="true"><circle class="zn" cx="50" cy="15" r="10.5"/>
      <circle class="zn${c('sh')}" cx="24" cy="40" r="9"/><circle class="zn${c('sh')}" cx="76" cy="40" r="9"/>
      <path class="zn${c(view==='back'?'bk':'ch')}" d="M31 36L69 36L66 63L34 63Z"/>
      <path class="zn${c('co')}" d="M34 65L66 65L64 96L36 96Z"/>
      ${two('ar','M14 47Q10 51 11 62L13 90Q14 94 19 94Q23 94 23 90L24 54Z')}
      <path class="zn${c('gl')}" d="M35 98L65 98L70 118L30 118Z"/>
      ${two('th','M30 120L49 120L46 152L33 152Z')}
      ${two('ca','M33.5 154L46 154L44 183Q44 187 40 187Q36 187 35 183Z')}</svg>`;}
  const ZO=['sh','ch','bk','ar','co','gl','th','ca'];
  function zoneOfMus(m){m=String(m||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
    if(/pecho|pectoral|empuje horizontal|aperturas/.test(m))return 'ch';
    if(/espalda|dorsal|traccion|trapecio|escapula/.test(m))return 'bk';
    if(/hombro|deltoide|elevacion lateral|empuje vertical|manguito/.test(m))return 'sh';
    if(/biceps|triceps|codo|antebrazo/.test(m))return 'ar';
    if(/core|abdomen|oblicuo/.test(m))return 'co';
    if(/gemelo|tobillo|pantorrilla/.test(m))return 'ca';
    if(/gluteo|puente|abduccion|patada|cadera|bisagra/.test(m))return 'gl';
    if(/cuadriceps|rodilla|sentadilla|zancada|femoral|isquio|pierna|aduccion/.test(m))return 'th';
    return '';}
  function zoneKeysOf(d){const c={};try{(d.blocks||[]).forEach(b=>{if(b.k!=='main'&&b.k!=='acc'&&String(b.k).indexOf('x_')!==0)return;(b.items||[]).forEach(it=>{const e=E[it.ex];if(!e)return;const k=zoneOfMus(e.mus);if(k)c[k]=(c[k]||0)+1;});});}catch(e){}return ZO.filter(k=>c[k]).map(k=>({k:k,n:c[k]}));}
  function zoneNames(keys){return keys.map(x=>x.k==='ch'?'Pecho':ZN[x.k]);}
  function dayZones(d){return zoneNames(zoneKeysOf(d)).slice(0,4);}
  /* zonas de la semana (Progreso) */
  window.weekZonesCard=function(){try{
    if(typeof S==='undefined'||S.role==='coach'||!DAYS||!DAYS.length)return null;
    const t=today(),dw=(pd(t).getDay()+6)%7,mon=addD(t,-dw),done={},plan={};let nDone=0;
    for(let i=0;i<7;i++){const dt=addD(mon,i);if(dt>t&&i>0&&false)break;
      let info=null;try{info=withDate(dt,()=>{const d=DAYS[S.day];return d&&!d.x?{d,st:sessStats(dt)}:null;});}catch(e){}
      if(!info)continue;const ks=zoneKeysOf(info.d);ks.forEach(x=>{plan[x.k]=(plan[x.k]||0)+x.n;});
      if(info.st&&info.st.sets>0){nDone++;ks.forEach(x=>{done[x.k]=(done[x.k]||0)+x.n;});}}
    const pk=ZO.filter(k=>plan[k]);if(!pk.length)return null;
    const dk=pk.filter(k=>done[k]),mk=pk.filter(k=>!done[k]),zs={on:dk,mid:mk};
    const nm=k=>k==='ch'?'Pecho':ZN[k];
    const chips=dk.map(k=>`<span>${nm(k)}</span>`).join('')+mk.map(k=>`<span style="background:#EFEAE2;color:#5A554E">${nm(k)} · falta</span>`).join('');
    return {badge:nDone?`${dk.length} de ${pk.length} zonas`:'Aún sin sesiones',html:`<div class="wlmap"><figure>${bodyMap('front','',zs)}<figcaption>Frente</figcaption></figure><figure>${bodyMap('back','',zs)}<figcaption>Espalda</figcaption></figure></div><div class="wlk" style="margin-top:12px">${chips}</div><p class="hint">En rojo, lo que ya trabajaste esta semana. En claro, lo que tu plan todavía tiene pendiente.</p>`};
  }catch(e){console.warn('zw',e);return null;}};
  /* cierre de sesión: zonas trabajadas */
  window.sessZonesHTML=function(){try{const d=DAYS[S.day];if(!d)return '';const ks=zoneKeysOf(d);if(!ks.length)return '';const zs={on:ks.map(x=>x.k),mid:[]};
    return `<div class="wlmap" style="margin:12px 0 8px"><figure>${bodyMap('front','',zs)}</figure><figure>${bodyMap('back','',zs)}</figure></div><div class="wlk" style="justify-content:center">${zoneNames(ks).map(n=>`<span>${n}</span>`).join('')}</div>`;}catch(e){return '';}};
  /* texto del aviso diario: «Hoy toca Tracción · hombros, espalda» para los próximos 8 días */
  window.remMsgMap=function(){const o={},t=today();for(let i=0;i<8;i++){const dt=addD(t,i);try{const d=withDate(dt,()=>{const x=DAYS[S.day];return x&&!x.x&&S.raw>=1?x:null;});if(d){const z=zoneNames(zoneKeysOf(d)).slice(0,3).map(q=>q.toLowerCase());o[dt]=String(d.name||'tu sesión')+(z.length?' · '+z.join(', '):'');}}catch(e){}}return o;};
  window.trainZonesCard=function(){try{if(typeof S==='undefined'||S.raw<1||S.day<0)return '';const d=DAYS[S.day];if(!d)return '';const keys=zoneKeysOf(d);if(!keys.length)return '';
    const zs={on:keys.map(x=>x.k),mid:[]};
    return `<div class="grp">Zonas que trabajas hoy</div><div class="wlmap"><figure>${bodyMap('front','',zs)}<figcaption>Frente</figcaption></figure><figure>${bodyMap('back','',zs)}<figcaption>Espalda</figcaption></figure></div><div class="wlk" style="justify-content:center;margin:10px 0 4px">${keys.map(x=>`<span>${x.k==='ch'?'Pecho':ZN[x.k]}${x.n>1?' ·'+x.n:''}</span>`).join('')}</div><p class="hint" style="text-align:center;margin:0 0 12px">El número es cuántos ejercicios trabajan esa zona hoy.</p>`;}catch(e){return '';}};
  function slides(){
    const u=S.user||{},f=u.data||{},nm=String(u.name||'').trim().split(/\s+/)[0]||'',cx=u.plan==='complete'||S.program==='complete',fem=u.sex==='Mujer';
    const main=u.main||'complete',gk=FS[main]?main:'complete',pk=main==='bajar'?'bajar':main==='aumentar'?'aumentar':'complete',wd=(u.sched||[]).slice().sort((a,b)=>a-b),days=wd.length||u.days||3;
    const fk=f.focus||(fem?'gluteo':'balanceado'),lv=u.level||'Principiante';
    const ff=FS[gk],row=(ic,a,b,c)=>`<div class="wlrow"><div class="wi">${ic}</div><div><small>${a}</small><b>${b}</b><p>${c}</p></div></div>`;
    const gW=(main==='bajar'||main==='aumentar')&&f.goalW&&f.weight?`<div class="wlk"><span>${String(f.weight).replace('.',',')} kg → ${String(f.goalW).replace('.',',')} kg</span></div>`:'';
    const sets=cx?[2,3,3,3,2,2]:[2,3,3,3,2],nw=sets.length;
    const zl=(ZF[fk]||ZF.balanceado).on.map(k=>k==='ch'?'Pecho y espalda':ZN[k]);
    const S1=`<div class="wlhero"><div class="wlr">${logo('#C0392B')}</div><span class="wlbadge">Tu plan está listo</span><h2 class="h2 wlh" style="color:#fff;margin:12px 0 6px">${esc(nm?nm+', ':'')}bienvenid${fem?'a':'o'} a ERRE</h2><p style="color:#D9D3CA;margin:0;font-size:15px;line-height:1.4">Esto no es una rutina cualquiera. Salió de lo que nos contaste. En 1 minuto te mostramos cómo se ajusta a ti.</p>
        <div class="wlst"><div><b>${days}</b><small>días por semana</small></div><div><b>${nw}</b><small>semanas por bloque</small></div><div><b style="font-size:15px;line-height:30px">${lv}</b><small>tu nivel</small></div></div></div>
      <div class="wlpil"><div style="--d:.1s"><em>🧘</em>Movilidad</div><div style="--d:.2s"><em>🏋️</em>Fuerza</div><div style="--d:.3s"><em>🫀</em>Resistencia</div><div style="--d:.4s"><em>🎯</em>Dominio corporal</div></div>
      <p class="wlp" style="margin-top:12px">Las cuatro capacidades del <b>Método Complete</b>.</p>`;
    const S2=`<h2 class="h2 wlh">Tu plan se ajusta a ti</h2><p class="wlp">Cada dato que nos diste cambió algo de tu programa.</p>${gW}
      ${row('🎯','Tu objetivo · '+ff[0],'Por eso entrenas así',ff[1])}
      ${row('📅','Tus días · '+days+' por semana',days+' sesiones de fuerza',(cx?'Tu coach arma las sesiones para esos días.':'Armamos las sesiones para esos días; los demás son descanso activo.'))}
      ${row('📈','Tu nivel · '+lv,cx?'Tu coach ajusta los ejercicios':'Ejercicios de nivel '+lv.toLowerCase(),cx?'Según tu experiencia, tus lesiones y cómo respondes.':'Hoy: '+LVT[lv]+'.')}
      ${u.pain==='Sí'?row('🩹','Tu molestia o lesión','La tenemos en cuenta','Tu coach la revisa antes de asignarte ejercicios.'):''}`;
    const S3=`<h2 class="h2 wlh">Dónde vas a trabajar</h2><p class="wlp">Siempre entrenas todo el cuerpo. Tu énfasis recibe más volumen.</p>
      <div class="wlmap"><figure>${bodyMap('front',fk)}<figcaption>Frente</figcaption></figure><figure>${bodyMap('back',fk)}<figcaption>Espalda</figcaption></figure></div>
      <div class="wlk" style="justify-content:center;margin-top:12px">${zl.map(z=>`<span>${z}</span>`).join('')}</div>
      <div class="wlcard"><b>Énfasis: ${FOCN[fk]||'Cuerpo balanceado'}</b><p class="wlp" style="margin:4px 0 0;font-size:13px">Lo puedes cambiar después en tu perfil sin perder tu semana.</p></div>`;
    const dl=(typeof DAYS!=='undefined'&&DAYS&&DAYS.length)?DAYS:[];
    const dcards=wd.map((di,i)=>{const d=dl[i%Math.max(1,dl.length)],z=d?dayZones(d):[];return `<div class="wldy" style="--d:${.08*i}s"><span class="wdn">${DNL[di]}</span><div><b>${d?esc(d.name||d.label||'Sesión'):'Sesión '+(i+1)}</b><small>${z.length?z.map(esc).join(' · '):'Fuerza de cuerpo completo'}</small></div></div>`;}).join('');
    const S4=`<h2 class="h2 wlh">Tu semana</h2><p class="wlp">${days} días de fuerza. Esto es lo que trabajas cada día.</p>
      <div class="wlwk">${DNL.map((n,i)=>`<span class="${wd.includes(i)?'on':''}">${n}</span>`).join('')}</div>${dcards}
      <div class="wlcard" style="margin-top:12px"><b>Así sube cada semana</b><div class="wlbars">${sets.map((s,i)=>`<div class="${i===nw-1?'dl':''}" style="height:${s*26}px;--d:${.08*i}s"></div>`).join('')}</div><div class="wlbl">${sets.map((s,i)=>`<span>${i===nw-1?'Descarga':'Sem '+(i+1)}</span>`).join('')}</div>
      <p class="wlp" style="margin:10px 0 0;font-size:13px">Series de tus ejercicios principales. Subes de a poco y la última semana baja para que subas más fuerte.</p></div>`;
    const P=PLATE[pk];
    const S5=`<h2 class="h2 wlh">Tu alimentación</h2><p class="wlp">Comida real, por porciones. ${ff[2]} Los números de calorías son una referencia, no una obligación.</p>
      <div class="wlcard wldn">${donut(pk)}<div class="wldl">${P.map(a=>`<div><i style="background:${a[2]}"></i>${a[0]}<b>${a[1]}%</b></div>`).join('')}</div></div>
      <div class="wlcard"><b>Tu plato, en porciones de tu mano</b><p class="wlp" style="margin:6px 0 0;font-size:13px">🍗 Proteína: una palma · 🍚 Carbo: un pocillo · 🥑 Grasa: una cucharada · 🥦 Vegetales: libres. Agua todo el día. En la app tienes tu plan con opciones y lista de compras.</p></div>`;
    const S6=`<h2 class="h2 wlh">Los hábitos que lo hacen posible</h2><p class="wlp">El plan funciona cuando lo sostienes. Estos son tus apoyos.</p>
      ${row('😴','Sueño','Duerme tus horas','Es cuando recuperas y te adaptas. También es parte del entrenamiento.')}
      ${row('🚶','Movimiento diario','Tu meta de pasos','Caminar más suma gasto y energía sin desgastarte.')}
      ${row('🌬️','Respiración','Mañana y antes de dormir','Regula tu sistema nervioso y te ayuda a descansar mejor.')}
      ${row('📊','Constancia','La tendencia, no un día perfecto','Una o dos conductas a la vez: proteína en tus comidas y agua durante el día.')}`;
    const act=typeof PROFILE==='undefined'||!PROFILE||PROFILE.status!=='pending';
    const CEL=`<div class="wlhero wlcel"><div class="wlcf">${Array.from({length:18},(x,i)=>`<i style="left:${(i*37)%100}%;animation-delay:${(i%6)*.15}s;background:${['#C0392B','#F6C85F','#fff','#4E7D63'][i%4]}"></i>`).join('')}</div><span class="wlbadge">Plan desbloqueado</span><h2 class="h2 wlh" style="color:#fff;margin:12px 0 6px">¡${esc(nm?nm+', ':'')}ya eres parte de ERRE!</h2><p style="color:#D9D3CA;margin:0;font-size:15px;line-height:1.4">Todo tu plan está listo para empezar. Tu primer entreno te espera en la pestaña Entrenar.</p></div>`;
    const base=[S1,S2,S3,S4,S5,S6];
    if(S.user&&S.user.pvWas&&act&&!S.user.wlPend)return [CEL];
    if(S.user&&S.user.pvWas&&act)return [CEL].concat(base.slice(1));
    return base;
  }
  function wlRender(){
    const o=S.wl||(S.wl={ws:0}),L=slides();o.ws=Math.max(0,Math.min(o.ws||0,L.length-1));const last=o.ws===L.length-1;
    const el=document.getElementById('wlin');if(!el)return;
    el.innerHTML=`<button class="wlx" data-act="wldone" aria-label="Cerrar">✕</button><div class="wldots">${L.map((x,i)=>`<i class="${i===o.ws?'on':''}"></i>`).join('')}</div><div class="wl" key="${o.ws}">${L[o.ws]}</div>
      <div class="wlnav">${o.ws>0?'<button class="btn" data-act="wlprev">Atrás</button>':''}<button class="btn solid" data-act="${last?'wldone':'wlnext'}">${last?'Continuar':'Siguiente'}</button></div>
      ${last?'':'<button class="lblbtn wlskip" data-act="wldone">Saltar</button>'}`;
    const sh=document.querySelector('#wlov .wlsh');if(sh)sh.scrollTop=0;
  }
  const os=obSubmit;obSubmit=function(){const r=os.apply(this,arguments);try{if(r!==false&&S.user&&S.ob&&S.ob.step==='done'){S.user.wlPend=true;}}catch(e){}return r;};
  const r1=render;render=function(){const x=r1.apply(this,arguments);try{wlCheck();}catch(e){console.warn(e);}return x;};
  function wlCheck(){
    const act=typeof PROFILE==='undefined'||!PROFILE||PROFILE.status!=='pending';
    const nor=S&&S.user&&S.program==='complete'&&!(typeof DAYS!=='undefined'&&DAYS&&DAYS.length);
    const ok=!nor&&S&&S.user&&!S.ob&&!S.profile&&S.role!=='coach'&&(typeof PROFILE==='undefined'||!PROFILE||PROFILE.role!=='coach')&&(S.user.wlPend||(S.user.pvWas&&act));
    if(ok&&!document.getElementById('wlov')){S.wl=S.wl||{ws:0};wlOpen();}
  }
  function wlOpen(){const d=document.createElement('div');d.id='wlov';d.innerHTML='<div class="wlbg"></div><div class="wlsh"><div id="wlin"></div></div>';document.body.appendChild(d);wlRender();}
  function wlClose(){const d=document.getElementById('wlov');if(d)d.remove();if(S.user){delete S.user.wlPend;if(!(typeof PROFILE!=='undefined'&&PROFILE&&PROFILE.status==='pending'))delete S.user.pvWas;}S.wl=null;save();try{SYNC.dirty();}catch(e){}}
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="wlnext"],[data-act="wlprev"],[data-act="wldone"]');if(!t)return;e.stopPropagation();e.preventDefault();
    const a=t.dataset.act,o=S.wl||(S.wl={ws:0});if(a==='wlnext'){o.ws=(o.ws||0)+1;wlRender();}else if(a==='wlprev'){o.ws=Math.max(0,(o.ws||0)-1);wlRender();}else wlClose();},true);
  /* ===== VISTA PREVIA: quien aún no paga ve la app con candados ===== */
  const pvExp=()=>{try{return ACC&&ACC.state==='expired'&&PROFILE&&PROFILE.role==='client'&&PROFILE.status==='active';}catch(e){return false;}};
  const pvOn=()=>typeof PROFILE!=='undefined'&&PROFILE&&PROFILE.role==='client'&&(PROFILE.status==='pending'||pvExp())&&S.user&&S.role!=='coach';
  function pvInfo(){const u=S.user||{},f=u.data||{},fem=u.sex==='Mujer',fk=f.focus||(fem?'gluteo':'balanceado'),wd=(u.sched||[]).slice().sort((a,b)=>a-b),days=wd.length||u.days||3;
    const zl=(ZF[fk]||ZF.balanceado).on.map(k=>k==='ch'?'Pecho y espalda':ZN[k]);return {u,f,fk,wd,days,zl,main:u.main||'complete',lv:u.level||'Principiante'};}
  function pvDay(i){if(pvExp()&&DAYS&&DAYS.length){const d=DAYS[i%DAYS.length];return {name:d.name||d.label,zones:dayZones(d)};}const d=S.pvDays&&S.pvDays[i%Math.max(1,S.pvDays.length)];if(!d)return null;const dd={blocks:[{k:'main',items:(d.ex||[]).map(id=>({ex:id}))}]};return {name:d.name||d.label,zones:dayZones(dd)};}
  const lk=(ic,t,sub)=>`<button class="pvl" data-act="pvunlock"><span class="pvi">${ic}</span><span class="pvt"><b>${t}</b><small>${sub}</small></span><span class="pvk">🔒</span></button>`;
  function pvView(t){const I=pvInfo(),nm=String(I.u.name||'').trim().split(/\s+/)[0],fem=I.u.sex==='Mujer',cx=I.u.plan==='complete',nw=cx?6:5,pk=I.main==='bajar'?'bajar':I.main==='aumentar'?'aumentar':'complete';
    const dayRows=I.wd.map((di,i)=>{const d=pvDay(i);return `<button class="wldy pvl" data-act="pvunlock" style="--d:${.08*i}s"><span class="wdn">${DNL[di]}</span><div style="flex:1;text-align:left"><b>${d?esc(d.name):'Sesión '+(i+1)}</b><small>${d&&d.zones.length?d.zones.map(esc).join(' · '):I.zl.join(' · ')}</small></div><span class="pvk">🔒</span></button>`;}).join('');
    const hero=`<div class="wlhero" style="margin-top:2px"><div class="wlr">${logo('#C0392B')}</div><span class="wlbadge">${pvExp()?'Plan en pausa':'Vista previa'}</span><h2 class="h2 wlh" style="color:#fff;margin:10px 0 6px">${pvExp()?'Tu programa te espera'+(nm?', '+esc(nm):''):'Tu plan está listo'+(nm?', '+esc(nm):'')}</h2><p style="color:#D9D3CA;margin:0;font-size:14px;line-height:1.4">${pvExp()?'Tu historial y tus cargas están guardados. Renueva y retomas donde lo dejaste.':'Explora cómo quedó. Para empezar a entrenar, desbloquéalo.'}</p><div class="wlst"><div><b>${I.days}</b><small>días por semana</small></div><div><b>${nw}</b><small>semanas por bloque</small></div><div><b style="font-size:15px;line-height:30px">${I.lv}</b><small>tu nivel</small></div></div></div>`;
    if(t==='entrenar')return `<div class="pvh">Tu semana</div><div class="wlwk">${DNL.map((n,i)=>`<span class="${I.wd.includes(i)?'on':''}">${n}</span>`).join('')}</div>${dayRows}<div class="wlmap" style="margin-top:6px"><figure>${bodyMap('front',I.fk)}<figcaption>Frente</figcaption></figure><figure>${bodyMap('back',I.fk)}<figcaption>Espalda</figcaption></figure></div><div class="wlk" style="justify-content:center;margin-top:10px">${I.zl.map(z=>`<span>${z}</span>`).join('')}</div><div class="pvsp"></div>`;
    if(t==='alim'){const P=PLATE[pk];return `<div class="pvh">Tu plato</div><div class="wlcard wldn">${donut(pk)}<div class="wldl">${P.map(a=>`<div><i style="background:${a[2]}"></i>${a[0]}<b>${a[1]}%</b></div>`).join('')}</div></div>${lk('🍽️','Tu plan de comidas','Opciones de desayuno, almuerzo, merienda y cena')}${lk('🛒','Lista de compras automática','De todo tu plan, con casillas y PDF')}${lk('🌎','Recetario por cultura','Colombia, México, España, Perú y más')}<div class="pvsp"></div>`;}
    if(t==='habitos')return `<div class="pvh">Pequeñas conductas, gran efecto</div>${((TASKS.habitos||{}).items||[]).map(x=>lk('🌱',esc(x.t),esc(x.s||''))).join('')}${lk('➕','15 hábitos en Mañana, Tarde y Noche','Con cómo hacerlos y qué dice la ciencia')}<div class="pvsp"></div>`;
    if(t==='recovery')return `<div class="pvh">Regula tu sistema nervioso</div>${((TASKS.recovery||{}).items||[]).map(x=>lk('🌬️',esc(x.t),esc(x.s||''))).join('')}${lk('🫧','Respirar guiado','Con esfera, sonidos y de 1 a 20 minutos')}<div class="pvsp"></div>`;
    if(t==='progreso'){const f=I.f;return `${(I.main==='bajar'||I.main==='aumentar')&&f.goalW&&f.weight?`<div class="wlcard" style="text-align:center"><small style="color:var(--gray)">TU META</small><div style="font-size:30px;font-weight:800;margin:4px 0">${String(f.weight).replace('.',',')} → ${String(f.goalW).replace('.',',')} kg</div><div style="color:var(--gray);font-size:13px">${goalDiff(f)}</div></div>`:''}${lk('⚖️','Tu peso y tus pasos','Gráficas de cómo avanzas')}${lk('🏆','62 hitos y 6 niveles','De Arranque a Élite')}${lk('📸','Fotos y medidas','Compara tu antes y después')}<div class="pvsp"></div>`;}
    const first=pvDay(0);
    return hero+`<div class="pvh">Tu primer entreno</div>${lk('🏋️',first?esc(first.name):'Sesión 1',(first&&first.zones.length?first.zones.join(' · '):I.zl.join(' · ')))}<div class="pvh">Otras tareas</div>${lk('🌬️','Respiración','Mañana y antes de dormir')}${lk('🌱','Hábitos','Pequeñas conductas diarias')}${lk('🍽️','Alimentación','Tu plato y tu lista de compras')}<div class="pvsp"></div>`;}
  const pvBar=()=>pvExp()?`<div class="pvbar"><span>🔒 ${((ACC.row||{}).period==='cortesia')?'Tu cortesía terminó':'Tu plan venció'}<b>Renueva para seguir entrenando</b></span><button data-act="pvunlock">Renovar</button></div>`:`<div class="pvbar"><span>🔒 Vista previa<b>Basic $24/mes · 7 días gratis</b></span><button data-act="pvunlock">Desbloquear</button></div>`;
  function pvSheet(){if(document.getElementById('pvsh'))return;const d=document.createElement('div');d.id='pvsh';
    if(pvExp()){const r=ACC.row||{},cz=r.period==='cortesia',msg=encodeURIComponent('Hola Juanjo, quiero renovar mi plan ('+(ME.email||'')+').');
      const href=(!cz&&RENEW_URL)?RENEW_URL:`https://wa.me/${COACH_WA}?text=${msg}`;
      d.innerHTML=`<div class="wlbg" data-act="pvclose"></div><div class="wlsh" style="top:auto;bottom:0;max-height:75vh;padding-bottom:28px"><button class="wlx" data-act="pvclose">✕</button><h2 class="h2 wlh">${cz?'Tu cortesía terminó':'Tu plan venció'}</h2><p class="wlp">Tu acceso terminó el ${accFmt(r.paid_until)}. Tu historial, tus cargas y tu programa se quedan guardados y retomas donde lo dejaste.</p><a class="btn solid" style="display:block;text-align:center;padding:14px;margin-top:6px;text-decoration:none" href="${href}" target="_blank" rel="noopener">${cz?'Escribirle a mi coach':'Renovar mi plan'}</a><button class="btn" data-act="accchk" style="width:100%;padding:14px;margin-top:10px">✅ Ya renové: revisar</button></div>`;document.body.appendChild(d);return;}
    d.innerHTML=`<div class="wlbg" data-act="pvclose"></div><div class="wlsh" style="top:70px"><button class="wlx" data-act="pvclose">✕</button><h2 class="h2 wlh">Desbloquea tu plan</h2><p class="wlp">Tu programa ya está armado. Con Basic lo empiezas hoy.</p>${plansPublic('pend')}<button class="btn solid" data-act="pendchk" style="width:100%;padding:14px;margin-top:12px">✅ Ya invertí en mi plan · activar</button></div>`;document.body.appendChild(d);}
  async function pvLoadDays(){try{if(pvExp()||S.pvDays||S.pvTry||!DB.previewBasic)return;S.pvTry=1;const I=pvInfo();const r=await DB.previewBasic(I.fk,I.days,I.lv);if(Array.isArray(r)&&r.length){S.pvDays=r;render();}}catch(e){console.warn('preview',e);}}
  const r2=render;render=function(){
    if(pvOn()){
      if(S.ob&&S.ob.step==='done')S.ob=null;
      if(S.user&&!S.user.pvWas&&PROFILE.status==='pending')S.user.pvWas=true;
      if(!S.ob&&!S.profile&&!S.chatOpen){try{S.tab=S.tab||'inicio';$('#app').innerHTML=shellHeader()+pvView(S.tab)+pvBar()+tabbar();}catch(e){console.warn(e);return r2.apply(this,arguments);}wlCheck();pvLoadDays();return;}
      const x=r2.apply(this,arguments);try{if(!S.ob){const a=document.getElementById('app');if(a&&!a.querySelector('.pvbar'))a.insertAdjacentHTML('beforeend',pvBar());}}catch(e){}return x;}
    return r2.apply(this,arguments);};
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="pvunlock"],[data-act="pvclose"]');if(!t)return;e.stopPropagation();e.preventDefault();
    if(t.dataset.act==='pvclose'){const d=document.getElementById('pvsh');if(d)d.remove();}else pvSheet();},true);
  /* al pagar, se desbloquea solo */
  async function pvPoll(){try{if(!pvOn()||document.visibilityState!=='visible'||!ME)return;if(pvExp()){ACC.row=await accessFetch();ACC.state=accState(ACC.row);if(ACC.state!=='expired'){const d=document.getElementById('pvsh');if(d)d.remove();await startClient();}return;}const p=await DB.profile(ME.id);if(p&&p.status!=='pending'){const d=document.getElementById('pvsh');if(d)d.remove();await enter({user:ME});}}catch(e){}}
  setInterval(pvPoll,15000);['visibilitychange','focus'].forEach(ev=>window.addEventListener(ev,()=>setTimeout(pvPoll,600)));
})();


/* --- Complete: esperando que el coach cargue la rutina --- */
(function(){
  const st=document.createElement('style');st.textContent=`.invbn{margin:12px 0 0;padding:12px 14px;border-radius:14px;background:#1a1a1a;color:#fff}.invbn span{display:inline-block;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#E0A99F}.invbn b{display:block;font-size:16px;margin:4px 0 2px}.invbn small{color:#cfcac2;font-size:12.5px}
  .cxw{margin:14px 0;padding:20px 16px;border-radius:18px;background:var(--card,#fff);border:1px solid var(--line,#E7E2DA);text-align:center}.cxw .cxk{width:58px;height:58px;border-radius:50%;margin:0 auto 12px;background:#1a1a1a;color:#fff;display:flex;align-items:center;justify-content:center;font-size:26px}.cxw h3{margin:0 0 6px;font-size:20px}.cxw p{margin:0 0 14px;color:#5A554E;font-size:14px;line-height:1.45}
  .cxs{text-align:left;display:flex;flex-direction:column;gap:12px;border-top:1px solid var(--line,#E7E2DA);padding-top:14px}.cxs div{display:flex;gap:10px;align-items:center;font-size:14px}.cxs i{font-style:normal;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;background:#EFEAE2;color:#5A554E;flex:none}.cxs .ok i{background:#2E9D6B;color:#fff}.cxs .now i{background:#C0392B;color:#fff}.cxs .off{color:#9a948a}`;
  document.head.appendChild(st);
  const waiting=()=>{try{return typeof S!=='undefined'&&S.role==='client'&&S.user&&S.program==='complete'&&!(typeof DAYS!=='undefined'&&DAYS&&DAYS.length)&&!(typeof PROFILE!=='undefined'&&PROFILE&&PROFILE.status==='pending');}catch(e){return false;}};
  window.cxWaitCard=function(){
    const nm=String((S.user&&S.user.name)||'').trim().split(/\s+/)[0]||'';
    const msg=encodeURIComponent('Hola Juanjo, ya llené mi registro en la app.');
    return `<div class="cxw"><div class="cxk">🏋</div><h3>${nm?esc(nm)+', t':'T'}u coach está preparando tu rutina</h3><p>Juanjo revisa tu registro y diseña tu plan a tu medida: ejercicios, series y cargas. Te avisamos apenas esté listo.</p>
    <div class="cxs"><div class="ok"><i>✓</i>Registro enviado</div><div class="now"><i>2</i>Tu coach diseña tu plan</div><div class="off"><i>3</i>Tu primer entrenamiento</div></div>
    <a class="btn" style="display:block;text-align:center;padding:13px;margin-top:16px;text-decoration:none;color:inherit" href="https://wa.me/${COACH_WA}?text=${msg}" target="_blank" rel="noopener">Escribirle a Juanjo</a></div>`;};
  const tv=trainView;trainView=function(){return waiting()?window.cxWaitCard():tv.apply(this,arguments);};
  const hv=homeView;homeView=function(){const h=hv.apply(this,arguments);return waiting()?window.cxWaitCard()+h:h;};
})();


/* --- Progreso: zonas de la semana; cierre de sesión con confeti y zonas --- */
(function(){
  const st=document.createElement('style');st.textContent=`.cfx{position:relative;height:0;overflow:visible;pointer-events:none}.cfx i{position:absolute;top:-6px;width:8px;height:12px;border-radius:2px;opacity:0;animation:cfx 1.6s ease-out forwards}#sumz .wlmap svg{max-height:120px}@keyframes cfx{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(190px) rotate(420deg)}}`;document.head.appendChild(st);
  window.metaRingCard=function(){try{
    if(S.role==='coach'||!S.user)return '';const f=S.user.data||{},gw=parseFloat(String(f.goalW||'').replace(',','.')),main=f.main||S.user.main;
    if(!(gw>0)||!(main==='bajar'||main==='aumentar'))return '';
    const ws=Object.keys(S.weights||{}).sort(),first=ws.length?S.weights[ws[0]]:null,sw=parseFloat(String(f.weight||'').replace(',','.'))||first;
    if(!(sw>0)||sw===gw)return '';const cur=ws.length?S.weights[ws[ws.length-1]]:sw;
    const pr=Math.max(0,Math.min(1,(sw-cur)/(sw-gw))),pct=Math.round(pr*100),left=Math.abs(cur-gw),moved=Math.abs(sw-cur),done=pr>=1;
    const fm=n=>(Math.round(n*10)/10).toFixed(1).replace('.',',');const C=2*Math.PI*54;
    const msg=done?'¡Llegaste a tu meta! Eso es disciplina.':pct===0?'Tu meta empieza hoy. Cada registro de peso la acerca.':pct<50?`Vas bien: ${fm(moved)} kg ${main==='bajar'?'menos':'más'} desde que empezaste.`:`Ya pasaste la mitad: ${fm(moved)} kg ${main==='bajar'?'menos':'más'}. Sigue así.`;
    return `<div class="wlcard mring"><small>TU META</small><div class="mrw"><svg width="124" height="124" viewBox="0 0 130 130" role="img" aria-label="${pct}% de tu meta"><circle cx="65" cy="65" r="54" fill="none" stroke="#EFEAE2" stroke-width="12"/><circle cx="65" cy="65" r="54" fill="none" stroke="#C0392B" stroke-width="12" stroke-linecap="round" stroke-dasharray="${(C*pr).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 65 65)"/><text x="65" y="63" text-anchor="middle" font-size="28" font-weight="700" fill="#1C1B19">${pct}%</text><text x="65" y="83" text-anchor="middle" font-size="12" fill="#6b655d">de tu meta</text></svg><div><b>${fm(cur)} kg</b><small>hoy · empezaste en ${fm(sw)}</small><div class="mrl">${done?'Meta cumplida':`Te faltan <b>${fm(left)} kg</b> para ${fm(gw)}`}</div></div></div><p>${msg}</p></div>`;}catch(e){return '';}};
  const _st=document.createElement('style');_st.textContent='.mring{margin:12px 0}.mring>small{color:var(--gray);letter-spacing:.06em;font-size:12px}.mrw{display:flex;align-items:center;gap:16px;margin-top:8px}.mrw>div>b{font-size:26px;display:block}.mrw>div>small{color:var(--gray);display:block;margin:2px 0 10px;font-size:13px}.mrl{background:#F1EDE6;border-radius:10px;padding:8px 10px;font-size:13px}.mring>p{margin:12px 0 0;padding-top:10px;border-top:1px solid var(--line,#E7E2DA);color:#5A554E;font-size:13px}';document.head.appendChild(_st);
  const pb=progBody;progBody=function(g,ms,nxt){const h=pb.apply(this,arguments);try{const z=window.weekZonesCard(),r=window.metaRingCard();return r+(z?pgSec('pg.zw','Zonas de la semana',z.badge,z.html,true):'')+h;}catch(e){return h;}};
  const os=openSummary;openSummary=function(){os.apply(this,arguments);try{
    const c=document.querySelector('#sheet .celeb');if(!c||document.getElementById('sumz'))return;
    const g=(typeof gam==='function')?gam():null,cols=['#C0392B','#1C1B19','#E8A317','#2E9E5B','#E0A99F'];
    const conf=`<div class="cfx">${Array.from({length:26},(_,i)=>`<i style="left:${Math.round(Math.random()*96)}%;background:${cols[i%5]};animation-delay:${(Math.random()*.5).toFixed(2)}s"></i>`).join('')}</div>`;
    const sk=g&&g.streak>=2?`<div class="streak">Racha de ${g.streak} días</div>`:'';
    c.insertAdjacentHTML('afterbegin',conf);
    c.insertAdjacentHTML('beforeend',`<div id="sumz">${sk}<div class="sub2" style="margin-top:10px">Zonas que trabajaste hoy</div>${window.sessZonesHTML()}</div>`);
  }catch(e){console.warn('sumz',e);}};
})();

/* --- Inicio: saludo con vida y «Tu primera semana» --- */
(function(){
  const st=document.createElement('style');st.textContent=`.pw1{margin:12px 0;padding:16px;border-radius:18px;background:#1a1a1a;color:#fff}.pw1 h3{margin:0 0 2px;font-size:17px;color:#fff}.pw1 small{display:block;color:#cfcac2;font-size:12.5px;margin-bottom:12px}.pw1 button{display:flex;width:100%;gap:12px;align-items:center;text-align:left;background:rgba(255,255,255,.08);color:#fff;border:0;border-radius:12px;padding:12px;margin-top:8px;font:inherit;font-size:14px}.pw1 button i{font-style:normal;flex:none;width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.18);font-size:13px}.pw1 button.ok{opacity:.65}.pw1 button.ok i{background:#2E9D6B}.pw1 button.ok b{text-decoration:line-through;font-weight:500}.pw1 .pwb{height:5px;border-radius:3px;background:rgba(255,255,255,.18);margin:0 0 4px}.pw1 .pwb em{display:block;height:5px;border-radius:3px;background:#E0A99F}`;document.head.appendChild(st);
  const hr=()=>{try{return +new Intl.DateTimeFormat('en-US',{hour:'numeric',hour12:false,timeZone:'America/Bogota'}).format(new Date())%24;}catch(e){return new Date().getHours();}};
  const sh=shellHeader;shellHeader=function(){const h=sh.apply(this,arguments);
    try{if(S.tab!=='inicio'||S.sel!==today()||S.role==='coach'||!S.user||!S.user.name)return h;
      const nm=esc(String(S.user.name).trim().split(/\s+/)[0]),x=hr(),sal=x<5?'Buenas noches':x<12?'Buenos días':x<19?'Buenas tardes':'Buenas noches';
      let sub='';
      if(S.raw>=1){const d=DAYS[S.day];if(d){const z=(typeof dayZones==='function'?dayZones(d):[]);sub='Hoy: '+esc(d.name||'tu sesión')+(z.length?' · '+z.slice(0,3).map(esc).join(', ').toLowerCase():'');}else sub='Hoy descansas. Muévete suave y duerme bien.';}
      else sub=fmtL(S.sel);
      return h.replace(/<h1 style="font-size:16px">[^<]*<\/h1><small>[^<]*<\/small>/,`<h1 style="font-size:16px">${sal}, ${nm}</h1><small>${sub}</small>`);}catch(e){return h;}};
  document.addEventListener('click',e=>{const t=e.target.closest&&e.target.closest('[data-act="tab"][data-v="alim"]');if(t&&S.user&&!S.user.seenAlim){S.user.seenAlim=true;try{save();SYNC.dirty();}catch(x){}}},true);
  window.primeraSemana=function(){try{
    if(S.tab!=='inicio'||S.role==='coach'||!S.user||!S.user.name||(typeof PROFILE!=='undefined'&&PROFILE&&PROFILE.status==='pending'))return '';
    const t=today(),a=S.start&&S.start<=t?S.start:t;if(addD(a,7)<t)return '';
    if(!(typeof DAYS!=='undefined'&&DAYS&&DAYS.length))return '';
    const g=gam(),tr=(g.nT||0)>=1,pe=Object.keys(S.weights||{}).length>0,pl=!!S.user.seenAlim,n=[tr,pe,pl].filter(Boolean).length;
    const it=(ok,tx,act,v)=>`<button class="${ok?'ok':''}" data-act="${act}"${v?` data-v="${v}"`:''}><i>${ok?'✓':'›'}</i><b>${tx}</b></button>`;
    return `<div class="pw1"><h3>${n===3?'Primera semana lista':'Tu primera semana'}</h3><small>${n===3?'Ya diste los tres pasos que más importan.':'Tres pasos para arrancar con el pie derecho.'}</small><div class="pwb"><em style="width:${Math.round(n/3*100)}%"></em></div>${it(tr,'Haz tu primer entrenamiento','tab','entrenar')}${it(pe,'Registra tu peso','wopen')}${it(pl,'Mira tu plato de alimentación','tab','alim')}</div>`;}catch(e){return '';}};
  const hv=homeView;homeView=function(){const h=hv.apply(this,arguments);const c=window.primeraSemana();return c?c+h:h;};
})();
