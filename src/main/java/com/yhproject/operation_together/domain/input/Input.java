package com.yhproject.operation_together.domain.input;

import com.yhproject.operation_together.domain.BaseTimeEntity;
import com.yhproject.operation_together.domain.operation.Operation;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Input extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    public String name;

    public int position;

    public String content;

    // Foreign key (Operation ID)
    @ManyToOne
    @JoinColumn(name = "operation_id")
    private Operation operation;

}
