# random_gamer
## 问题
1. 随机玩家名称
  > 见代码
2. 代码测试
  > 见代码
3. 估算10000名用户所需要的时间        
  > 这个结果取决与目前用户池中已有多少用户，因为随着用户量的增多，冲突的概率就会变大。        
  > 假设生成第n个用户的时间为t，那么下一名用户的生成时间的期望值为t * (26 * 26 * 10000 - n) / 26 * 26 * 10000 + 2t * n / 26 * 26 * 10000 = 1 + (tn / 26 * 26 * 10000)；依次类推计算出10000名用户的生成时间。但是，由于内部算法的透明性，实际的结果并不能按此依据做简单的推算。        
  > 实际的结果应该取决于具体的测试，可以将26 * 26 * 10000以一万为单位分档，在每一档中进行x次测试，计算平均值作为用户生成时间的依据。
4. 多进程的情况        
  > 多进程无法直接得知其他进程的数据情况，所以使用master-worker模型来处理数据共享的问题。        
  > 我们在master进程中来储存和管理用户的map，实际生成的操作放在worker进程中，worker进程完成用户的生成操作之后，将结果(HX3456)作为data发送给master进程，master收到message之后，判断是否冲突，给worker特性的发送特定的信息，worker收到master的message之后，如果冲突，则worker需要重新生成，如果不冲突，则成功返回；如果我们事先知道一共有多少个worker在工作，更简单的办法是将用户名的第一位带上我们分配的worker的含义(通过更改worker的算法实现)，例如：假设我们知道一共有两个worker，1号worker只能使用A-N，2号worker只能使用H-Z，这样就避免了因为进程数据不通而导致的冲突问题。        
  > 其实更通用的方法是借助外界(redis或者db)来完成这件事情，将用户的名称储存在外界，不管是多个进程还是多个实例，只要“外界”可以为我们保持原子性写操作(现在大部分“外界都支持这样的操作”)，那么既可以降低编码难度，也更贴合实际。
5. git
  > git@github.com:lixw1994/random_gamer.git