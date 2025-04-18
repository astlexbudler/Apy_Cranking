from apscheduler.schedulers.background import BackgroundScheduler

def startScheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(empty_schedule_job, 'interval', hours=2) # 2시간마다 실행
    scheduler.start()

def empty_schedule_job():
    return