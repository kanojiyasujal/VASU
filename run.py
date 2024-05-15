#to run jarvis foreground running
import multiprocessing


def startvasu():
    #code for process 1
    print('process 1 is running')
    from main import start
    start()


    

#start both processs
if __name__ == '__main__':
    p1 =multiprocessing.Process(target=startvasu)
    
    p1.start()
    
    p1.join()
    
    print("system stop")
    