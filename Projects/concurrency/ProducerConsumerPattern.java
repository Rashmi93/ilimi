import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.io.*;

public class ProducerConsumerPattern {
	public static void main(String args[]) throws IOException {

		// Creating shared object
		BlockingQueue<String> sharedQueue = new LinkedBlockingQueue<String>();
		ExecutorService pool, pool1;

		// Creating Producer and Consumer Thread
		pool = Executors.newFixedThreadPool(10);
		pool1 = Executors.newFixedThreadPool(10);

		for (int i = 0; i < 10; i++) {
			pool.execute(new Consumer(sharedQueue));
			pool1.execute(new Producer(sharedQueue));
			i++;
		}
	}
}

// Producer Class in java
class Producer implements Runnable {

	private final BlockingQueue<String> sharedQueue;
	public Producer(BlockingQueue<String> sharedQueue2) {
		this.sharedQueue = sharedQueue2;
	}

	@Override
	public void run() {
		try {
			File f = new File("files/testData");
			FileReader in = new FileReader(f);
			BufferedReader br = new BufferedReader(in);
			String strLine;

			while ((strLine = br.readLine()) != null) {
				System.out.println("Produced: " + strLine);
				sharedQueue.put(strLine);
			}
			// System.out.println(strLine);
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}

// Consumer Class in Java
class Consumer implements Runnable {

	private final BlockingQueue<String> sharedQueue;
	public Consumer(BlockingQueue<String> sharedQueue2) {
		this.sharedQueue = sharedQueue2;
	}

	@Override
	public void run() {
		while (true) {
			try {
				System.out.println("Consumed: " + sharedQueue.take());
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
